import { Component, ViewEncapsulation } from '@angular/core';
import { AppMenuService, MenuItem } from './core/app-menu.service';
import { routerTransition } from './core/router-transition';
import { TranslateService } from '@ngx-translate/core';
import { SignalR } from 'ng2-signalr';
import { SignalRService } from './core/signalR.service';

@Component({
  selector: 'app-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';

  constructor(private _signalRService: SignalRService, private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    _signalRService.init();
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
