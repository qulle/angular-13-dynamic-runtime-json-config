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
        const timestamp = Date.now().toString();

        return forkJoin([
            this.http.get(`${this.BASE_URI}/base.config.json?cache=${timestamp}`).pipe(
                tap((baseConfig) => {
                    this.baseConfig = { ...this.baseConfig, ...(<BaseConfig>baseConfig || {}) };
                }),
                catchError((error) => {
                    console.warn('Error in app-config.service http.get base.config.json');
                    return of(error)
                })
            ),
            this.http.get(`${this.BASE_URI}/movie-gallery.config.json?cache=${timestamp}`).pipe(
                tap((movieGalleryConfig) => {
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
