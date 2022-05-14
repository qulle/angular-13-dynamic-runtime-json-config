import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

export const appConfigFactory = (appConfigService: AppConfigService): (() => Observable<any>) => {
    return () => appConfigService.init();
};