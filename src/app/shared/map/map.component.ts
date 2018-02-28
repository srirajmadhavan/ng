import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { SignalRService } from '../../core/signalR.service';
import { SignalRConnection } from 'ng2-signalr/src/services/connection/signalr.connection';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { Location } from './map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private signalData: ISubscription;
  private map: any;
  private google: any;

  @Output() mapReady = new EventEmitter<any>();
  @Output() mapIdle = new EventEmitter<any>();

  locations: Location[] = [];

  private locationEvent = 'randomLocations';

  public defaultlatitude = 38.904078;
  public defaultlongitude = -77.03087800000003;

  constructor(private _signalRService: SignalRService) {
    if (this._signalRService.connected) {
      this.setupSignalSubscription();
    } else {
      this.signalData = this._signalRService.listener.subscribe((s: SignalRConnection) => {
        this.setupSignalSubscription();
      });
    }
  }

  setupSignalSubscription() {
    this._signalRService.connection.listenFor(this.locationEvent).subscribe((s: any[]) => {
      this.locations = [];
      s.forEach((v, i) => {
        this.locations.push(new Location(v.lat, v.lon));
      });
    });
  }

  ngOnInit() {
  }

  onReady(map) {
    this.map = map;
    this.mapReady.emit(map);
  }

  onIdle(map) {
    this.mapIdle.emit();
  }

}
