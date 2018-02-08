import { Component, OnInit } from '@angular/core';
import { MenuItem, AppMenuService } from '../../core/app-menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems: MenuItem[];

  constructor(private appMenuService: AppMenuService) {
    this.menuItems = appMenuService.getMenuItems();
  }

  ngOnInit() {
  }
}
