import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { StartupService } from '../core/startup.service';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        RouterModule
    ],
    exports: [SidebarComponent, HeaderComponent, NavComponent],
    declarations: [SidebarComponent, HeaderComponent, NavComponent, DynamicComponent],
    providers: [StartupService]
})
export class SharedModule { }
