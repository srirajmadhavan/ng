import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SignalR, ISignalRConnection, SignalRConnection } from 'ng2-signalr';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SignalRService {
    connection: ISignalRConnection;
    public listener = new Subject();
    public connectionStatus = new Subject();
    connected = false;

    constructor(private _signalR: SignalR) { }
    init() {
        this.connection = this._signalR.createConnection();
        this.connection.status.subscribe((s) => {
            this.connectionStatus.next(s.name);
            this.connected = s.name === 'connected';
        });
        this.connection.start().then((c: SignalRConnection) => {
            this.listener.next(c);
        });

        this.connection.errors.subscribe((error: any) => {
            this.connectionStatus.next('disconnected');
            this.init();
        });
    }
}
