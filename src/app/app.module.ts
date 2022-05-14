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
    providers: [{
        provide: APP_INITIALIZER,
        useFactory: appConfigFactory,
        deps: [AppConfigService],
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
