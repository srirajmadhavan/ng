import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { HttpService } from '../core/http.service';


@Injectable()
export class InvitationDataService {
    constructor(private http: HttpService) { }

    getLargeData(): Promise<any> {
        return this.http
            .get('default/largedata', { throbbing: false })
            .map((res: Response) => res.json())
            .toPromise();
    }
}
