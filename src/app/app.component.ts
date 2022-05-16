import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AppConfigService } from './core/services/app-config/app-config.service';
import { ToastService } from './shared/services/toast/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    title = 'angular-13-dynamic-runtime-json-config';
    
    @ViewChild('appToastContainer', {
        read: ViewContainerRef
    }) viewContainerRef!: ViewContainerRef;

    constructor(
        private appConfigService: AppConfigService,
        private toastService: ToastService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit(): void {
        // Add the element reference to the service
        this.toastService.setViewContainerRef(this.viewContainerRef);

        // Empty toast-queue that was generated during application initialization
        this.toastService.handleQueue();

        // Important to re-evaluate the component change-detection
        // This is done because of Error: NG100: ExpressionChangedAfterItHasBeenCheckedError
        this.changeDetectorRef.detectChanges();
    }

    isMenuVisible(): boolean {
        return this.appConfigService.getBaseConfig().showMenu;
    }
}
