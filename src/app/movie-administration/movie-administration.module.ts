import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './layout/index/index.component';
import { MovieAdministrationRoutingModule } from './movie-administration-routing.module';

@NgModule({
    declarations: [
    IndexComponent
  ],
    imports: [
        CommonModule,
        MovieAdministrationRoutingModule
    ]
})
export class MovieAdministrationModule { }
