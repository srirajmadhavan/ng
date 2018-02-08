import { Component, OnInit } from '@angular/core';
import { StartupService } from '../../core/startup.service';
import { User } from '../../core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User;
  constructor(private startupService: StartupService, private translateService: TranslateService) { }

  ngOnInit() {
    this.user = this.startupService.startupData;
  }

  onLanguage(language: string) {
    this.translateService.setDefaultLang(language);
  }
}
