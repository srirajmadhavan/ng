import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
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
  color: string;
  positiveStats: string;
  cardSettings: any;
  flipped: false;
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

  viewChart() {
    if (this.flipped) { this.renderer.removeClass(this.element.nativeElement.querySelector('.cascading-admin-card'), 'flipped'); } else {
      const ctxl = this.element.nativeElement.querySelector('#lineChart-' + this.card.Id);
      this.detailChart = new Chart(ctxl, {
        type: 'line',
        data: {
          labels: Object.keys(this.card.StatisticsDetail),
          datasets: [{
            label: 'Leads Per Month',
            data: Object.values(this.card.StatisticsDetail)
          }],
          options: {
            respnsive: true
          }
        }
      });
      this.renderer.addClass(this.element.nativeElement.querySelector('.cascading-admin-card'), 'flipped');
    }
  }
}
