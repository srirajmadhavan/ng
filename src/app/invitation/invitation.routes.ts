import { Routes } from '@angular/router';
import { InvitationComponent } from './invitation.component';

export const InvitationRoutes: Routes = [
    { path: 'invitation/index', component: InvitationComponent,
     data: { state: 'invitations', title: 'Invitations', icon: 'paper-plane-o' } }
];
