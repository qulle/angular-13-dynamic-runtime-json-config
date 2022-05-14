import { Component } from '@angular/core';
import { AppConfigService } from './core/services/app-config/app-config.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-13-dynamic-runtime-json-config';

    constructor(private appConfigService: AppConfigService) { }

    isMenuVisible(): boolean {
        return this.appConfigService.getBaseConfig().showMenu;
    }
}
