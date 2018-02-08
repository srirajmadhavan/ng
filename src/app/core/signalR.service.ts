import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SignalR, ISignalRConnection, SignalRConnection } from 'ng2-signalr';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SignalRService {
    connection: ISignalRConnection;
    private addLogListener: any;
    public data = new Subject();
    public connectionStatus = new Subject();

    constructor(private _signalR: SignalR) { }
    init() {
        this.connection = this._signalR.createConnection();
        // this.connection.status.subscribe((s) => console.warn(s.name));
        this.connection.status.subscribe((s) => {
            this.connectionStatus.next(s.name);
        });
        this.connection.start().then((c) => {
            this.addLogListener = c.listenFor('addUsageLog');
            this.addLogListener.subscribe((d) => {
                this.data.next(d);
            });
        });
    }
}
