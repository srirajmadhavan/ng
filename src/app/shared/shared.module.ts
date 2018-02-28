import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { StartupService } from '../core/startup.service';
import { DynamicComponent } from './dynamic/dynamic.component';
import { CounterComponent } from './counter/counter.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        RouterModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCafL0A1QoDa3TBQpotPF5WX8Y-XgqcxMk'
        })
    ],
    exports: [SidebarComponent, HeaderComponent, NavComponent, CounterComponent, MapComponent],
    declarations: [SidebarComponent, HeaderComponent, NavComponent, DynamicComponent, CounterComponent, MapComponent],
    providers: [StartupService]
})
export class SharedModule { }
