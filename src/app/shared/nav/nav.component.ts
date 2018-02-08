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
  private temperature = 'cold';

  constructor(private startupService: StartupService, private translateService: TranslateService,
    private _signalRService: SignalRService) { }

  ngOnInit() {
    this.user = this.startupService.startupData;
    this._signalRService.connectionStatus.subscribe((s) => console.log(s));
    this.signalData = this._signalRService.data.subscribe((s) => {
      this.makeHot();
    });
  }

  makeHot() {
    this.temperature = 'hot';
    setTimeout(() => {
      this.temperature = 'cold';
    }, 3000);
  }

  onLanguage(language: string) {
    this.translateService.setDefaultLang(language);
  }
}
