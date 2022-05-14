import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfigService } from './app/core/services/app-config/app-config.service';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

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

document.addEventListener('keydown', function(event) {
    if((event.ctrlKey || event.metaKey) && (
        event.key === '=' ||
        event.key === '+' ||
        event.key === '-' ||
        event.key === 'AudioVolumeMute'
    )) {
        if(document.body.classList.contains('app-disable-zoom')) {
            event.preventDefault();
        }
    }
}, {
    passive: false
});

document.addEventListener('wheel', function(event) {
    if(event.ctrlKey) {
        if(document.body.classList.contains('app-disable-zoom')) {
            event.preventDefault();
        }
    }
}, {
    passive: false
});

/*
    Disable contextmenu
*/
document.addEventListener('contextmenu', function(event) {
    if(document.body.classList.contains('app-disable-contextmenu')) {
        event.preventDefault();
    }
}, {
    passive: false
});