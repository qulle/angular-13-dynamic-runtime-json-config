import { Component, OnInit } from '@angular/core';
import { Movies } from '../../mock/movies.data';
import { Movie } from '../../models/movie.model';
import { AppConfigService } from 'src/app/core/services/app-config/app-config.service';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: [
        './gallery-list.component.scss',
        './gallery-grid.component.scss'
    ]
})
export class GalleryComponent implements OnInit {
    public movies: Array<Movie>;

    constructor(private appConfigService: AppConfigService) { 
        this.movies = Movies;
    }

    ngOnInit(): void { }

    isListLayout(): boolean {
        return this.appConfigService.getMovieGalleryConfig().type === 'list';
    }

    isGridLayout(): boolean {
        return this.appConfigService.getMovieGalleryConfig().type === 'grid';
    }
}
