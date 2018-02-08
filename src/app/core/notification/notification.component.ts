import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from './notification.model';
import { NotificationService } from './notification.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'notification',
    templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
    alerts: Alert[] = [];

    constructor(private alertService: NotificationService) { }

    ngOnInit(): void {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                this.alerts = [];
                return;
            }
            this.alerts.push(alert);
        });
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(a => a !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }
}
