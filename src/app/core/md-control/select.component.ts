import { ElementRef, Component, OnDestroy, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'md-select',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit {

  @Input() id: string;
  private element: any;
  @Output() change = new EventEmitter<any>();

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.element = $(this.el.nativeElement).find('select');
    if (!this.id) {
      return;
    }
    this.element.material_select({});
    const that = this;
    this.element.change(function () {
      that.change.emit($(this).val());
    });
  }
}
