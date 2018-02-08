import { Component } from '@angular/core';
import { AppMenuService, MenuItem } from './core/app-menu.service';
import { routerTransition } from './core/router-transition';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
