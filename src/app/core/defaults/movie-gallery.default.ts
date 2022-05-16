import { MovieGalleryConfig } from '../models/movie-gallery.model';

export const MovieGalleryConfigDefault = <MovieGalleryConfig> {
    meta: {
        about: 'Initial JSON-file controls the Movie Gallery configuration for the application',
        version: '1.0.0',
        date: '2022-05-14 12:00:00',
        author: 'Qulle'
    },
    api: '//cdn.my-domain.com/api/v1/movies',
    type: 'grid'
}