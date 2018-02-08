import { Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';

export const subscriptionRoutes: Routes = [
    {
        path: 'subscription/index', component: SubscriptionComponent,
        data: { state: 'subscription', title: 'Subscription', icon: 'retweet' }
    }
];
