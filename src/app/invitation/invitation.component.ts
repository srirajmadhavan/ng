import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/notification/notification.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  showAlert(message: string, persist: boolean = false) {
    this.notificationService.success(message, persist);
  }

}
