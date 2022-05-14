import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        loadChildren: () => import('./movie-gallery/movie-gallery.module').then(module => module.MovieGalleryModule)
    },
    {
        path: 'administration',
        loadChildren: () => import('./movie-administration/movie-administration.module').then(module => module.MovieAdministrationModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { 
        useHash: true 
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
