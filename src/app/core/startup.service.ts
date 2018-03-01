import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { User } from './models';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';


@Injectable()
export class StartupService {
    private _startupData;

    constructor(private http: HttpService) { }

    load(): Promise<any> {
        this._startupData = null;

        return this.http
            .get('default/init', { throbbing: false })
            .map((res: Response) => res.json())
            .toPromise()
            .then((data: any) => {
                this._startupData = data;
                if (!environment.production) { console.log(data); }
            })
            .catch((err: any) => Promise.resolve());
    }

    get startupData(): any {
        return this._startupData;
    }
}
