import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { ModalService } from './modal/modal.service';
import { RequestArgsCustom } from './models';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService extends Http {
  public pendingRequests = 0;
  public showLoading = false;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private modalService: ModalService) {
    super(backend, defaultOptions);
  }

  createUrl(url) {
    return environment.api + url;
  }

  get(url: string, options?: RequestArgsCustom): Observable<Response> {
    return this.intercept(super.get(this.createUrl(url), options), options);
  }

  post(url: string, body: string, options?: RequestArgsCustom): Observable<Response> {
    return this.intercept(super.post(this.createUrl(url), body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestArgsCustom): Observable<Response> {
    return this.intercept(super.put(this.createUrl(url), body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestArgsCustom): Observable<Response> {
    return this.intercept(super.delete(this.createUrl(url), options));
  }

  getRequestOptionArgs(options?: RequestArgsCustom): RequestOptionsArgs {
    return options as RequestOptionsArgs;
  }

  private handleError(err: any) {
    return Observable.throw(err.statusText);
  }

  intercept(observable: Observable<Response>, options?: RequestArgsCustom): Observable<Response> {
    if (!environment.production) { console.log('In the intercept routine..'); }
    if (options.throbbing) {
      this.modalService.open('throbber');
      this.pendingRequests++;
    }
    return observable
      .catch(this.handleError)
      .do((res: Response) => {
        if (!environment.production) { console.log('Response: ' + res); }
      }, (err: any) => {
        if (!environment.production) { console.log('Caught error: ' + err); }
      })
      .finally(() => {
        if (!environment.production) { console.log('finally'); }
        if (options.throbbing) {
          this.pendingRequests--;
          if (this.pendingRequests === 0) { this.modalService.close('throbber'); }
        }
      });
  }
}
