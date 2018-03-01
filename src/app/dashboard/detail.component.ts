import {
  Component, OnInit, Input, OnChanges, ElementRef, SimpleChanges, SimpleChange
} from '@angular/core';
import { CardViewModel, TimeRange, ChartDataSet } from './dashboard.model';
import { StartupService } from '../core/startup.service';
import { HttpService } from '../core/http.service';
import { Response } from '@angular/http';
declare var Chart: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnChanges {

  constructor(private startupService: StartupService,
    private element: ElementRef,
    private http: HttpService) {
  }

  @Input() public allCards: CardViewModel[];
  @Input() public selectedCardId: number[];

  selectedRange: TimeRange = TimeRange.YearToDate;

  lineChartMain: any;
  graphMode = false;

  ngOnInit() {
    const ctxl = this.element.nativeElement.querySelector('#lineChart-main');
    this.lineChartMain = new Chart(ctxl, {
      type: 'line',
      data: {
        labels: [],
        datasets: [],
        options: {
          responsive: true,
          legend: false
        }
      }
    });
  }

  onMapGraphToggle(value) {
    this.graphMode = !this.graphMode;
  }

  ngOnChanges(changes: SimpleChanges) {
    const value: SimpleChange = changes.selectedCardId;
    if (value && !value.firstChange) {
      this.createChart();
    }
  }

  createChart(timeRange: TimeRange = TimeRange.YearToDate) {
    this.lineChartMain.data.datasets = [];
    this.lineChartMain.update();
    let label = '';
    let id = 0;

    const chartingCards = this.allCards.filter((v, i) => {
      return this.selectedCardId.includes(v.Id);
    });

    chartingCards.forEach((v: CardViewModel, i) => {
      label = v.Name;
      id = v.Id;

      this.http
        .get('default/detail?range=' + this.selectedRange, { throbbing: false })
        .map((res: Response) => res.json())
        .toPromise()
        .then((data: any) => {
          this.lineChartMain.data.labels = Object.keys(data);
          this.lineChartMain.data.datasets.push(new ChartDataSet(id, label, Object.values(data)));
          this.lineChartMain.update();
        })
        .catch((err: any) => Promise.resolve());
    });
  }

  onRangeChange(value) {
    this.selectedRange = +value;
    this.createChart();
  }

  onCheckChange(e, val) {
    if (e.target.checked) {
      if (!this.selectedCardId.includes(e.target.value) || !this.selectedCardId) { this.selectedCardId.push(+e.target.value); }
    } else {
      const index = this.selectedCardId.indexOf(+e.target.value);
      this.selectedCardId.splice(index, 1);
    }
    this.createChart();
  }
}
