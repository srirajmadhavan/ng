import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ISubscription } from 'rxjs/Subscription';
import { DynamicComponent } from '../shared/dynamic/dynamic.component';
import { SignalRService } from '../core/signalR.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  private numberSub: ISubscription;
  private customSub: ISubscription;
  private signalData: ISubscription;

  @ViewChild('dynamicInserts', { read: ViewContainerRef }) dynamicInserts: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef,
    private _signalRService: SignalRService) { }

  ngOnDestroy(): void {
    this.numberSub.unsubscribe();
    this.customSub.unsubscribe();
    this.signalData.unsubscribe();
  }

  ngOnInit() {

    this.signalData = this._signalRService.data.subscribe((s) => {
      console.log('subscription component recieved a data change: ' + JSON.stringify(s));
    });

    const myObs = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('error message');
        observer.complete();
      }, 5000);
    });
    const myNUmber = Observable.interval(1000);
    this.numberSub = myNUmber.subscribe((number: number) => { console.log(number); });
    this.customSub = myObs.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('completed'); }
    );
  }

  loadComponent() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    // this.dynamicInserts.clear();
    // this.dynamicInserts.createComponent(factory);
    const dynComponent = this.dynamicInserts.createComponent(factory).instance;
    dynComponent.someProperty = 'test';
  }
}
