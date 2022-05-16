import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'movies',
        loadChildren: () => import('./movie-gallery/movie-gallery.module')
            .then(module => module.MovieGalleryModule)
            .catch(error => console.error(error))
    },
    {
        path: 'administration',
        loadChildren: () => import('./movie-administration/movie-administration.module')
            .then(module => module.MovieAdministrationModule)
            .catch(error => console.error(error))
    },
    {
        path: '**',
        redirectTo: '/movies'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { 
        useHash: true 
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
