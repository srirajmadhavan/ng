import { Component, OnInit, OnDestroy } from '@angular/core';
import { staggerTransition } from '../core/router-transition';
import { Http } from '@angular/http';
import { ModalService } from '../core/modal/modal.service';
import { HttpService } from '../core/http.service';
import { Subscription } from 'rxjs/Subscription';
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

  private signalData = new Subject();

  public cardViewModel: CardViewModel[] = [];

  public inspectingCards: CardViewModel[] = [];

  public switch = false;

  constructor(private modalService: ModalService, private http: HttpService, private _signalRService: SignalRService) {
    const cardEvents = ['leadCountCard', 'applicationLaunchCountCard'];
    this._signalRService.listener.subscribe((s: SignalRConnection) => {
      this.cardViewModel = [];
      cardEvents.forEach(card => {
        this.cardViewModel.push(new CardViewModel(s.listenFor(card)));
      });
      s.invoke('dashboardpoke').then((p) => { });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.signalData.unsubscribe();
  }

  onInspect(card: CardViewModel) {
    this.inspectingCards = [];
    this.inspectingCards.push(card);
    this.switch = !this.switch;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}


