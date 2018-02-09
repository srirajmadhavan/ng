import { Component, OnInit, ElementRef, Input } from '@angular/core';

declare var Odometer: any;

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  constructor(private element: ElementRef) { }
  private od: any;
  @Input() value = 333555;

  ngOnInit() {
    const el = this.element.nativeElement.querySelector('.the-element');
    this.od = new Odometer({
      el: el,
      value: this.value,
      format: '',
      theme: 'default'
    });
    this.od.update();

    setInterval(() => {
      this.value += 124;
      // this.od.update(this.value);
    }, 3000);
  }
}
