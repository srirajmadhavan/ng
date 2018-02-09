import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CoreModule } from '../core/core.module';
import { DashboardRoutes } from './dashboard.routes';
import { RouterModule } from '@angular/router';
import { HttpService } from '../core/http.service';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  providers: [HttpService],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
