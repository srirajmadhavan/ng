import { ElementRef, Component, OnDestroy, OnInit, Input, AfterViewInit, transition } from '@angular/core';
import { ModalService } from './modal.service';
declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal',
  template: '<ng-content></ng-content>'
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = $(this.el.nativeElement).find('div.modal');
  }

  ngOnInit(): void {
    const modal = this;

    if (!this.id) {
      return;
    }
    this.element.modal();
    this.modalService.add(this);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.modal('dispose');
    this.element.remove();
  }

  open() {
    $(this.el.nativeElement).find('div.modal').modal('show');
  }

  close() {
    $(this.el.nativeElement).find('div.modal').modal('hide');
  }
}
