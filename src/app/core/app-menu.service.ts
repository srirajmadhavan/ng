import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


export class MenuItem {
  path: string;
  title: string;
  icon?: string;
}


@Injectable()
export class AppMenuService {

  public activeMenu: Observable<MenuItem>;

  constructor(private router: Router, private titleService: Title) {

  }

  getMenuItems(): MenuItem[] {
    return this.router.config
      .filter(r => r.data && r.data.title)
      .map(r => {
        return {
          path: r.path,
          title: r.data.title,
          icon: r.data.icon
        };
      });
  }
}
