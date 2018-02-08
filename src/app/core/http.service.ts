import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { ModalService } from './modal/modal.service';
import { RequestArgsCustom } from './models';

@Injectable()
export class HttpService extends Http {
  public pendingRequests = 0;
  public showLoading = false;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private modalService: ModalService) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestArgsCustom): Observable<Response> {
    return this.intercept(super.get(url, options), options);
  }

  post(url: string, body: string, options?: RequestArgsCustom): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestArgsCustom): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestArgsCustom): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  getRequestOptionArgs(options?: RequestArgsCustom): RequestOptionsArgs {
    return options as RequestOptionsArgs;
  }

  private handleError(err: any) {
    return Observable.throw(err.statusText);
  }

  intercept(observable: Observable<Response>, options?: RequestArgsCustom): Observable<Response> {
    console.log('In the intercept routine..');
    if (options.throbbing) {
      this.modalService.open('throbber');
      this.pendingRequests++;
    }
    return observable
      .catch(this.handleError)
      .do((res: Response) => {
        console.log('Response: ' + res);
      }, (err: any) => {
        console.log('Caught error: ' + err);
      })
      .finally(() => {
        console.log('finally');
        if (options.throbbing) {
          this.pendingRequests--;
          if (this.pendingRequests === 0) { this.modalService.close('throbber'); }
        }
      });
  }
}
