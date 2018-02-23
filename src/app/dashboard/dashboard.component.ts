import { Component, OnInit, OnDestroy } from '@angular/core';
import { staggerTransition } from '../core/router-transition';
import { Http } from '@angular/http';
import { ModalService } from '../core/modal/modal.service';
import { HttpService } from '../core/http.service';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { SignalRService } from '../core/signalR.service';
import { LogCount, CardViewModel } from './dashboard.model';
import { Subject, SubjectSubscriber } from 'rxjs/Subject';
import { SignalRConnection } from 'ng2-signalr/src/services/connection/signalr.connection';

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

  private signalData: ISubscription;

  public cardViewModel: CardViewModel[] = [];

  public inspectingCardId: number[] = [];
  private cardEvents = ['leadCountCard', 'applicationLaunchCountCard', 'locationLogCountCard', 'ctiCountCard'];

  constructor(private modalService: ModalService, private http: HttpService, private _signalRService: SignalRService) {
    if (this._signalRService.connected) {
      this.setupSignalSubscription();
    } else {
      this.signalData = this._signalRService.listener.subscribe((s: SignalRConnection) => {
        this.setupSignalSubscription();
      });
    }
  }

  setupSignalSubscription() {
    this.cardViewModel = [];
    this.cardEvents.forEach(card => {
      this.cardViewModel.push(new CardViewModel(this._signalRService.connection.listenFor(card)));
      this._signalRService.connection.invoke('dashboardpoke').then((p) => { });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.signalData.unsubscribe();
  }

  onInspect(cardId: number) {
    this.inspectingCardId = [];
    this.inspectingCardId.push(cardId);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}


