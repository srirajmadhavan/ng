import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../core/notification/notification.service';
import { SignalRService } from '../core/signalR.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit, OnDestroy {
  private signalData: Subscription;

  constructor(private notificationService: NotificationService, private _signalRService: SignalRService) { }

  ngOnInit() {
    this.signalData = this._signalRService.data.subscribe((s) => {
      console.log('Invitation component recieved a data change: ' + JSON.stringify(s));
    });
  }

  ngOnDestroy(): void {
    this.signalData.unsubscribe();
  }

  showAlert(message: string, persist: boolean = false) {
    this.notificationService.success(message, persist);
  }
}
