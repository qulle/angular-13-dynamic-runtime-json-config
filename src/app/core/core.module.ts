import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        HeaderComponent,
        MenuComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        MenuComponent
    ]
})
export class CoreModule { }
