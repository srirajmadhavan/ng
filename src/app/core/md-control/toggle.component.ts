import { ElementRef, Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'md-toggle',
  template: '<ng-content></ng-content>'
})
export class ToggleComponent implements OnInit {

  @Input() id: string;
  private element: any;
  @Output() toggle = new EventEmitter<any>();

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.element = $(this.el.nativeElement).find('input[type="checkbox"]');
    if (!this.id) {
      return;
    }
    const that = this;
    this.element.change(function () {
      that.toggle.emit($(this).val());
    });
  }
}
