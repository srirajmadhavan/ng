import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesPipe } from './pipes.pipe';
import { ModalComponent } from './modal/modal.component';
import { HttpModule } from '@angular/http';
import { AppMenuService } from './app-menu.service';
import { ModalService } from './modal/modal.service';
import { NotificationService } from './notification/notification.service';
import { NotificationComponent } from './notification/notification.component';
import { SignalRService } from './signalR.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
    ],
    exports: [PipesPipe, ModalComponent, NotificationComponent],
    declarations: [ModalComponent, NotificationComponent, PipesPipe],
    providers: [AppMenuService, ModalService, NotificationService, SignalRService]
})
export class CoreModule { }
