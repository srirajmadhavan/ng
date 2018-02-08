import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
    { path: '', redirectTo: 'dashboard/index', pathMatch: 'full' },
    { path: 'dashboard/index', component: DashboardComponent, data: { state: 'dashboard', title: 'Dashboard', icon: 'object-group' } }
];
