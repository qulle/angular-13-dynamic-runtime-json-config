import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './layout/index/index.component';
import { MovieGalleryRoutingModule } from './movie-gallery-routing.module';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
    declarations: [
        IndexComponent,
        GalleryComponent
    ],
    imports: [
        CommonModule,
        MovieGalleryRoutingModule
    ]
})
export class MovieGalleryModule { }
