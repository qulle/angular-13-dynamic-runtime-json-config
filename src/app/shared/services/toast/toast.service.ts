import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastComponent } from '../../components/toast/toast.component';

export enum ToastTypes {
    Success = 'app-toast--success',
    Info = 'app-toast--info',
    Warning = 'app-toast--warning',
    Error = 'app-toast--error'
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastViewContainerRef!: ViewContainerRef;
    private toastQueue: Array<{
        message: string,
        type: ToastTypes
    }> = [];

    constructor() { }

    setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.toastViewContainerRef = viewContainerRef;
    }

    handleQueue(): void {
        this.toastQueue.forEach(toast => {
            this.createToast(toast.message, toast.type);
        });
    }

    createToast(message: string, type: ToastTypes = ToastTypes.Info): void {
        if(!this.toastViewContainerRef) {
            this.toastQueue.push({message, type});
            return;
        }

        const componentRef = this.toastViewContainerRef.createComponent(ToastComponent);
        componentRef.instance.message = message;
        componentRef.instance.type = type;
        componentRef.instance.ref = this.toastViewContainerRef;
    }
}
