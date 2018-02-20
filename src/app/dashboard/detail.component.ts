import { Component, OnInit, Input } from '@angular/core';
import { CardViewModel } from './dashboard.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor() { }

  @Input() cards: CardViewModel[];

  ngOnInit() {
  }

}
