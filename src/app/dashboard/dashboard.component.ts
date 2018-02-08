import { Component, OnInit } from '@angular/core';
import { staggerTransition } from '../core/router-transition';
import { Http } from '@angular/http';
import { ModalService } from '../core/modal/modal.service';
import { HttpService } from '../core/http.service';

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
export class DashboardComponent implements OnInit {
  public somedata: string[];
  public otherdata: string[];

  constructor(private modalService: ModalService, private http: HttpService) {
    http.get('http://localhost:81/api/values', { throbbing: true })
      .subscribe(response => this.somedata = response.json());
    http.get('http://localhost:81/api/values', { throbbing: true })
      .subscribe(response => this.otherdata = response.json());
  }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
