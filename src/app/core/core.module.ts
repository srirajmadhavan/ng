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

import { SelectComponent } from './md-control/select.component';
import { ToggleComponent } from './md-control/toggle.component';
import { DatePickerComponent } from './md-control/datepicker.component';

import { VsForDirective } from './directive/vsFor';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
    ],
    exports: [PipesPipe, ModalComponent, NotificationComponent, SelectComponent, ToggleComponent, DatePickerComponent, VsForDirective],
    declarations: [ModalComponent, NotificationComponent, PipesPipe, SelectComponent, ToggleComponent, DatePickerComponent, VsForDirective],
    providers: [AppMenuService, ModalService, NotificationService, SignalRService]
})
export class CoreModule { }
