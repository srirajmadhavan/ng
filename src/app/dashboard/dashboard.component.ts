import { Component, OnInit, OnDestroy } from '@angular/core';
import { staggerTransition } from '../core/router-transition';
import { Http } from '@angular/http';
import { ModalService } from '../core/modal/modal.service';
import { HttpService } from '../core/http.service';
import { Subscription } from 'rxjs/Subscription';
import { SignalRService } from '../core/signalR.service';
import { LogCount } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [staggerTransition],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@staggerTransition]': ''
  }
})
export class DashboardComponent implements OnInit, OnDestroy {

  private signalData: Subscription;

  public somedata: string[];
  public otherdata: string[];

  public logCount: LogCount = {
    Addendum: 0,
    ApplicationLaunch: 0,
    ContactActivity: 0,
    ExportData: 0,
    InsideSales: 0,
    LocationLog: 0,
    PhoneCall: 0,
    Pipeline: 0,
    Proposal: 0
  };

  constructor(private modalService: ModalService, private http: HttpService, private _signalRService: SignalRService) {
    http.get('http://dcsmadhaven.azurewebsites.net/api/count', { throbbing: true })
      .subscribe((response) => {
        this.logCount = response.json();
      });
    // http.get('http://localhost:81/api/values', { throbbing: true })
    //   .subscribe(response => this.otherdata = response.json());

    this.signalData = this._signalRService.data.subscribe((s: LogCount) => {
      this.logCount = s;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.signalData.unsubscribe();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
