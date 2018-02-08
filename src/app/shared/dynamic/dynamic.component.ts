import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {

  @Input('someProperty')
  public someProperty = 'default value';

  constructor() { }

  ngOnInit() {
  }

}
