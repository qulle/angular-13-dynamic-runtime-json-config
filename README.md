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
@NgModule({
    imports: [
        AppRoutingModule,
    ]
})
export class AppModule { }

// File: movie-gallery-routing.module.ts
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
@NgModule({
    imports: [
        AppRoutingModule
    ]
})
export class CoreModule { }
```

## 2. APP_INITIALIZER

## 3. TOAST SERVICE
