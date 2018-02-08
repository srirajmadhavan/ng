import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'subscription', loadChildren: 'app/subscription/subscription.module#SubscriptionModule' },
    { path: 'invitation', loadChildren: 'app/invitation/invitation.module#InvitationModule' },
    { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' }
];
