import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './layout/index/index.component';
import { MovieGalleryRoutingModule } from './movie-gallery-routing.module';

@NgModule({
    declarations: [
        IndexComponent
    ],
    imports: [
        CommonModule,
        MovieGalleryRoutingModule
    ]
})
export class MovieGalleryModule { }
