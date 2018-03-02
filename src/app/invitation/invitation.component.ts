import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/notification/notification.service';
import { SignalRService } from '../core/signalR.service';
import { Subscription } from 'rxjs/Subscription';
import { staggerTransition } from '../core/router-transition';
import { InvitationDataService } from './invitation.data.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
  animations: [staggerTransition],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@staggerTransition]': ''
  }
})
export class InvitationComponent implements OnInit {
  public largeData: any[];

  constructor(private notificationService: NotificationService, private _signalRService: SignalRService,
    private _data: InvitationDataService) { }

  ngOnInit() {
    this._data.getLargeData()
      .then((data) => {
        this.largeData = data;
      });
  }

  showAlert(message: string, persist: boolean = false) {
    this.notificationService.success(message, persist);
  }
}
