import { ElementRef, Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'md-datepicker',
    template: '<ng-content></ng-content>'
})
export class DatePickerComponent implements OnInit {

    @Input() id: string;
    private element: any;
    @Output() change = new EventEmitter<any>();

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        this.element = $(this.el.nativeElement).find('input[type="text"]');
        if (!this.id) {
            return;
        }
        this.element.pickadate();
        // const that = this;
        // this.element.change(function () {
        //   that.change.emit($(this).val());
        // });
    }
}
