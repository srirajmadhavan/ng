import {
  Component, OnInit, Input, OnChanges, Renderer2, ElementRef, SimpleChanges, SimpleChange
} from '@angular/core';
import { CardViewModel } from './dashboard.model';
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
    private renderer: Renderer2,
    private element: ElementRef,
    private http: HttpService) {
  }

  @Input() public allCards: CardViewModel[];
  @Input() public selectedCardId?: number;

  selectedRange: TimeRange = TimeRange.YearToDate;

  lineChartMain: any;

  ngOnInit() {
    const ctxl = this.element.nativeElement.querySelector('#lineChart-main');
    this.lineChartMain = new Chart(ctxl, {
      type: 'line',
      data: {
        labels: [],
        datasets: [],
        options: {
          responsive: true
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const value: SimpleChange = changes.selectedCardId;
    if (value && !value.firstChange) {
      this.createChart();
    }
  }

  createChart(timeRange: TimeRange = TimeRange.YearToDate) {
    let label = '';
    this.allCards.forEach((v: CardViewModel, i) => {
      label = v.Name;
      this.http
        .get('http://masterapi-forall.azurewebsites.net/default/detail?range=' + this.selectedRange, { throbbing: false })
        .map((res: Response) => res.json())
        .toPromise()
        .then((data: any) => {
          this.lineChartMain.data.datasets = [];
          this.lineChartMain.update();
          this.lineChartMain.data.labels = Object.keys(data);
          this.lineChartMain.data.datasets.push(new ChartDataSet(label, Object.values(data)));
          this.lineChartMain.update();
        })
        .catch((err: any) => Promise.resolve());
    });
  }

  onRangeChange(value) {
    this.selectedRange = value;
  }
}

enum TimeRange {
  YearToDate = 0,
  Today = 1,
  Yesterday = 2,
  LastSevenDays = 3,
  LastThirtyDays = 4,
  LastMonth = 5,
}

class ChartDataSet {
  fillColor = '#fff';
  backgroundColor = 'rgba(255, 255, 255, .3)';
  borderColor = 'rgba(255, 99, 132)';
  label: string;
  data: number[];

  constructor(label: string, data: number[]) {
    this.label = label;
    this.data = data;
  }
}
