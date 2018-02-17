import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import {
//   NgxHttpBatcherModule,
//   HttpBatchConfiguration,
//   HttpBatchConfigurationCollection,
//   HttpBatcher
// } from 'ngx-http-batcher';

import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

import { ModalService } from './core/modal/modal.service';

import { CoreModule } from './core/core.module';
import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvitationModule } from './invitation/invitation.module';
import { SharedModule } from './shared/shared.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { HttpService } from './core/http.service';
import { StartupService } from './core/startup.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true, enableTracing: false }),
    SignalRModule.forRoot(createSignalRConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    CoreModule,
    DashboardModule,
    InvitationModule,
    SubscriptionModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    // {
    //   provide: HttpBatchConfigurationCollection,
    //   useFactory: httpBatchConfigurationFactory
    // },
    // {
    //   provide: Http,
    //   useFactory: HttpBatcher
    // }
    // ,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, options: RequestOptions, modalService: ModalService) => {
        return new HttpService(backend, options, modalService);
      },
      deps: [XHRBackend, RequestOptions, ModalService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService, ModalService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



// export function httpBatchConfigurationFactory() {
//   return new HttpBatchConfigurationCollection([
//     new HttpBatchConfiguration({
//       rootEndpointUrl: 'http://localhost:81/',
//       batchEndpointUrl: 'http://localhost:81/api/batch/'
//     })]);
// }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function startupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export function createSignalRConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'usageLogTicker';
  // c.qs = { user: 'donald' };
  c.url = 'http://localhost:81/';
  c.logging = false;
  return c;
}
