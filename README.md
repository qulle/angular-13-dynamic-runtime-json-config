# Angular 13 Dynamic Runtime JSON Config

## About
In this repository i describe how to: 

1. create a small application that uses lazy-loaded-modules in the router. 

2. load application-settings from JSON/API endpoints without the need for re-deployment of the application. 

3. create a Toast Service that with one line of code dynamically can create toast messages at any state of the application.

## 1. ROUTING
Follow this list to properly set up routing with lazy-loading.

1.1 Configure main router
```typescript
// File: app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        loadChildren: () => import('./movie-gallery/movie-gallery.module').then(module => module.MovieGalleryModule)
    },
    {
        path: 'administration',
        loadChildren: () => import('./movie-administration/movie-administration.module').then(module => module.MovieAdministrationModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { 
        // UseHash will enable a '#' in the url
        // This prevents the server from trying to load
        // server resources souch as directories or files with the rout name. ex. http://localhost:4200/#/movies
        useHash: true 
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

1.2 Configure child routers
```typescript
// File: movie-gallery-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';

// I like to route to different layouts that then have different combinations of individual re-usable components. 
// The IndexComponent is the default route in any of my routable-modules.
const routes: Routes = [
    { path: '', component: IndexComponent }
];

@NgModule({
    // Note that forChild is used here and not forRoot
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovieGalleryRoutingModule { }
```

1.3 Register each route-module in its sibling module.
```typescript
// File: app-routing.module.ts
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        AppRoutingModule,
    ]
})
export class AppModule { }

// File: movie-gallery-routing.module.ts
import { MovieGalleryRoutingModule } from './movie-gallery-routing.module';

@NgModule({
    imports: [
        MovieGalleryRoutingModule,
    ]
})
export class MovieGalleryModule { }
```

1.4 Lastly add routerLink to the menu
```html
<!-- File: app-routing.module.ts -->
<a routerLink="/administration" routerLinkActive="app-menu__link--active" class="app-menu__link">Administration</a>
```

Don't forget to import the main AppRoutingModule in module where the routerLink is placed or the link won't work, it will not generate any error so this can be tricky to find.
```typescript
// File: core.module.ts
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    imports: [
        AppRoutingModule
    ]
})
export class CoreModule { }
```

## 2. APP_INITIALIZER
Follow this list to configure loading of JSON data using APP_INITIALIZER.

2.1 Configure main module
```typescript
// File: app.module.ts
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { appConfigFactory } from './core/services/app-config/app-config-factory';
import { AppConfigService } from './core/services/app-config/app-config.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule
    ],
    // This providers sections is the key configuration
    providers: [{
        provide: APP_INITIALIZER,
        useFactory: appConfigFactory,
        deps: [AppConfigService],
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

2.2 Define models and default instances
```typescript
// File: base.config.model.ts
import { MetaConfig } from './meta.model';

export interface BaseConfig {
    "meta": Array<MetaConfig>,
    "showMenu": boolean,
    "headerBackgroundColor": string,
    "disableSelections": boolean,
    "disableZoom": boolean,
    "disableContextmenu": boolean
}

// File: base.default.ts
import { BaseConfig } from '../models/base.config.model';

export const BaseConfigDefault = <BaseConfig> {
    meta: [],
    showMenu: true,
    headerBackgroundColor: '#333852',
    disableSelections: false,
    disableZoom: false,
    disableContextmenu: false
}
```

2.3 Add the appConfigFactory function
```typescript
// File: app-config-factory.ts
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

export const appConfigFactory = (appConfigService: AppConfigService): (() => Observable<any>) => {
    return () => appConfigService.init();
};
```

2.4 Create the AppConfigService
```typescript
// File: app-config-service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { BaseConfigDefault } from '../../defaults/base.default';
import { MovieGalleryConfigDefault } from '../../defaults/movie-gallery.default';
import { BaseConfig } from '../../models/base.config.model';
import { MovieGalleryConfig } from '../../models/movie-gallery.model';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    // This could be a separate storage server ex. //cdn.my-domain.com/assets/app-config
    private readonly BASE_URI: string = './assets/app-config';

    private baseConfig: BaseConfig;
    private movieGalleryConfig: MovieGalleryConfig

    constructor(private http: HttpClient) {
        this.baseConfig = BaseConfigDefault;
        this.movieGalleryConfig = MovieGalleryConfigDefault
    }

    /*
        When the application is Bootstrapped in app.module.ts
        The APP_INITIALIZER token makes requests to this init method and loads all JSON config-files before the application is rendered.
    */

    init(): Observable<any> {
        // The ?cache parameter is only used to force the browser to always send the request and not return [HTTP/1.1 304 Not Modified]
        const timestamp = Date.now().toString();

        return forkJoin([
            this.http.get(`${this.BASE_URI}/base.config.json?cache=${timestamp}`).pipe(
                tap((baseConfig) => {
                    // The spread operator is used to merge in changes in the config, otherwise it will use the default values. 
                    // This makes it possible to just specify the wanted parameters in the JSON-files and not the entire object.
                    this.baseConfig = { ...this.baseConfig, ...(<BaseConfig>baseConfig || {}) };
                }),
                catchError((error) => {
                    console.warn('Error in app-config.service http.get base.config.json');
                    return of(error)
                })
            ),
            this.http.get(`${this.BASE_URI}/movie-gallery.config.json?cache=${timestamp}`).pipe(
                tap((movieGalleryConfig) => {
                    // The spread operator is used to merge in changes in the config, otherwise it will use the default values. 
                    // This makes it possible to just specify the wanted parameters in the JSON-files and not the entire object.
                    this.movieGalleryConfig = { ...this.movieGalleryConfig, ...(<MovieGalleryConfig>movieGalleryConfig || {}) };
                }),
                catchError((error) => {
                    console.warn('Error in app-config.service http.get movie-gallery.config.json');
                    return of(error)
                })
            )
        ]);
    }

    getBaseConfig(): BaseConfig {
        return this.baseConfig;
    }

    getMovieGalleryConfig(): MovieGalleryConfig {
        return this.movieGalleryConfig;
    }
}
```

Don't forget to import the HttpClientModule in the closest module where the `AppConfigService` is placed or the dependency injected httpClient won't work.
```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule
    ]
})
export class CoreModule { }
```

2.5 Inject the AppConfigService in the components
```typescript
// File: header.component.ts
import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/app-config/app-config.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private appConfigService: AppConfigService) { }

    ngOnInit(): void { }

    getHeaderBackgroundColor(): string {
        return this.appConfigService.getBaseConfig().headerBackgroundColor;
    }
}
```

The data from the JSON-file can now be used in the HTML-template.
```html
<!-- File: header.component.html -->
<div class="app-header" [style.background-color]="getHeaderBackgroundColor()">
    <h1 class="app-header__brand">Movies</h1>
    <ng-content></ng-content>
</div>

<!-- File: app.component.html -->
<app-header>
    <ng-template [ngIf]="isMenuVisible()">
        <app-menu></app-menu>
    </ng-template>
</app-header>
<div class="app-wrapper">
    <router-outlet></router-outlet>
</div>
```

2.6 Inject the AppConfigService in main.ts
```typescript
// File: main.ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfigService } from './app/core/services/app-config/app-config.service';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

// For some functionality the AppConfigService needs to apply classes to the body.
// The main.ts file is a excelent place to achive this. 
platformBrowserDynamic().bootstrapModule(AppModule)
    .then(app => {
        const appConfigService = app.injector.get(AppConfigService);
        
        if(appConfigService.getBaseConfig().disableSelections) {
            document.body.classList.add('app-disable-selections');
        }

        if(appConfigService.getBaseConfig().disableZoom) {
            document.body.classList.add('app-disable-zoom');
        }

        if(appConfigService.getBaseConfig().disableContextmenu) {
            document.body.classList.add('app-disable-contextmenu');
        }
    })
    .catch(err => console.error(err));

/*
    Disable zoom
*/
document.addEventListener('touchstart', function(event) {
    if(event.touches.length > 1) {
        if(document.body.classList.contains('app-disable-zoom')) {
            event.preventDefault();
        }
    }
}, {
    passive: false
});

// For the full example see main.ts
```

## 3. TOAST SERVICE
