import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationComponent } from './invitation.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { InvitationRoutes } from './invitation.routes';
import { SharedModule } from '../shared/shared.module';
import { InvitationDataService } from './invitation.data.service';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(InvitationRoutes)
  ],
  declarations: [InvitationComponent],
  providers:[
    InvitationDataService
  ]
})
export class InvitationModule { }
