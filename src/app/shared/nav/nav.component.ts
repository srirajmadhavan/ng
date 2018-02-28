import { Component, OnInit } from '@angular/core';
import { StartupService } from '../../core/startup.service';
import { User } from '../../core/models';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { SignalRService } from '../../core/signalR.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User;
  private signalData: ISubscription;
  public temperature = 'cold';

  constructor(private startupService: StartupService, private translateService: TranslateService,
    private _signalRService: SignalRService) { }

  ngOnInit() {
    this.user = this.startupService.startupData.data;
    this._signalRService.connectionStatus.subscribe((s) => {
      if (s === 'disconnected') {
        this.temperature = 'dead';
      } else {
        this.temperature = 'cold';
      }
    });
    // this.signalData = this._signalRService.data.subscribe((s) => {
    //   this.makeHot();
    // });
  }

  makeHot() {
    this.temperature = 'hot';
    setTimeout(() => {
      this.temperature = 'cold';
    }, 3000);
  }

  makeDead() {
    this.temperature = 'dead';
  }

  onLanguage(language: string) {
    this.translateService.setDefaultLang(language);
  }
}
