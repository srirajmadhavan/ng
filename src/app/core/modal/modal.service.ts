import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
    private modals: any[] = [];

    add(modal: any) {
        this.modals.push(modal);
    }

    remove(id: string) {
        const modalToRemove = this.modals.findIndex((m) => m.id === id);
        this.modals.splice(modalToRemove, 1);
    }

    open(id: string) {
        const modal = this.modals.find((m) => m.id === id);
        modal.open();
    }

    close(id: string) {
        const modal = this.modals.find((m) => m.id === id);
        modal.close();
    }
}
