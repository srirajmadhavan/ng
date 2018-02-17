import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

declare var Odometer: any;

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnChanges {
  constructor(private element: ElementRef) { }
  private od: any;
  @Input() value = 0;

  ngOnInit() {
    const el = this.element.nativeElement.querySelector('.the-element');
    this.od = new Odometer({
      el: el,
      value: this.value,
      format: '',
      theme: 'default'
    });
    this.od.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    const value: SimpleChange = changes.value;
    if (value && !value.firstChange) {
      this.od.update(value.currentValue);
    }
  }
}
