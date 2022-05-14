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
