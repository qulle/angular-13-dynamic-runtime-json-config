import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastTypes } from '../../services/toast/toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
    message: string;
    type: string;
    ref!: ViewContainerRef;

    constructor() {
        this.message = 'Default toast message';
        this.type = ToastTypes.Info;
    }

    ngOnInit(): void { }

    deleteToast(): void {
        this.ref.detach();
    }
}
