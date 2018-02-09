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

    // setInterval(() => {
    //   this.value += 124;
    //   // this.od.update(this.value);
    // }, 3000);
  }

  ngOnChanges(changes: SimpleChanges) {
    const value: SimpleChange = changes.value;
    if (value && !value.firstChange) {
      console.log('prev value: ', value.previousValue);
      console.log('got name: ', value.currentValue);
      this.od.update(value.currentValue);
    }
  }
}
