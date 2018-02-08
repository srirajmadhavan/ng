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

@Injectable()
export class StartupService {
    private _startupData;

    constructor(private http: HttpService) { }

    load(): Promise<any> {
        this._startupData = null;

        return this.http
            .get('https://reqres.in/api/users/2', { throbbing: false })
            .map((res: Response) => res.json())
            .toPromise()
            .then((data: any) => {
                this._startupData = data.data;
                this._startupData.avatar = 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-1/c53.53.662.662/s40x40/1011983_3231565603813_369455700_n.jpg?oh=a158ce708d6c3b9a6731da435582d6ec&oe=5AD8B467';
            })
            .catch((err: any) => Promise.resolve());
    }

    get startupData(): any {
        return this._startupData;
    }
}
