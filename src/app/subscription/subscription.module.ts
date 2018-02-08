import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { subscriptionRoutes } from './subscription.routes';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicComponent } from '../shared/dynamic/dynamic.component';


@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    TranslateModule,
    RouterModule.forChild(subscriptionRoutes)
  ],
  entryComponents: [DynamicComponent],
  declarations: [SubscriptionComponent]
})
export class SubscriptionModule { }
