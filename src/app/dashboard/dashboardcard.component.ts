import { Component, OnInit, Input, Output, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { CardViewModel, CardColor } from './dashboard.model';
import { StartupService } from '../core/startup.service';

declare var Chart: any;

@Component({
  selector: 'app-dashboardcard',
  templateUrl: './dashboardcard.component.html',
  styleUrls: ['./dashboardcard.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input() card: CardViewModel;
  @Output() inspect = new EventEmitter<number>();
  color: string;
  positiveStats: string;
  cardSettings: any;
  flipped = false;
  detailChart: any;
  constructor(private startupService: StartupService, private renderer: Renderer2, private element: ElementRef) {
    this.color = CardColor[Math.floor(Math.random() * CardColor.length)];
  }

  ngOnInit() {
    this.card.SignalData.subscribe((d: CardViewModel) => {
      this.card.Id = d.Id;
      this.card.Name = d.Name;
      this.card.Count = d.Count;
      this.card.Statistics = d.Statistics;
      this.card.StatisticsDetail = d.StatisticsDetail;
      this.positiveStats = (this.card.Statistics >= 0 ? this.card.Statistics : -this.card.Statistics).toFixed(0);
      this.cardSettings = this.startupService.startupData.cards.find((p) => p.event === this.card.SignalData.event);
      if (this.detailChart) {
        this.detailChart.data.datasets[0].data = Object.values(this.card.StatisticsDetail);
        this.detailChart.update();
      }
      // if (this.flipped) { this.flipCard(); }
    });
  }

  getStatisticsClass() {
    if (this.card.Statistics >= 0) { return 'bg-success'; } else {
      { return 'bg-danger'; }
    }
  }

  calculateWidth() {
    return { 'width': '' + this.positiveStats + '%' };
  }

  flipCard() {
    if (this.flipped) {
      this.flipped = false;
      this.renderer.removeClass(this.element.nativeElement.querySelector('.cascading-admin-card'), 'flipped');
    } else {
      this.flipped = true;
      if (!this.detailChart) {
        this.createChart();
      }
      this.renderer.addClass(this.element.nativeElement.querySelector('.cascading-admin-card'), 'flipped');
    }
  }

  createChart() {
    const ctxl = this.element.nativeElement.querySelector('#lineChart-' + this.card.Id);
    this.detailChart = new Chart(ctxl, {
      type: 'line',
      data: {
        labels: Object.keys(this.card.StatisticsDetail),
        datasets: [{
          fillColor: '#fff',
          backgroundColor: 'rgba(255, 255, 255, .3)',
          borderColor: 'rgba(255, 99, 132)',
          label: this.card.Name,
          data: Object.values(this.card.StatisticsDetail)
        }],
        options: {
          responsive: true
        }
      }
    });
  }

  onInspect() {
    this.inspect.emit(this.card.Id);
  }
}
