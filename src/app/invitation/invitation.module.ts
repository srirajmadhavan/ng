import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationComponent } from './invitation.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { InvitationRoutes } from './invitation.routes';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild(InvitationRoutes)
  ],
  declarations: [InvitationComponent]
})
export class InvitationModule { }
