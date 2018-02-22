export interface LogCount {
    Addendum: number;
    ApplicationLaunch: number;
    ContactActivity: number;
    ExportData: number;
    InsideSales: number;
    LocationLog: number;
    PhoneCall: number;
    Pipeline: number;
    Proposal: number;
}


export class CardViewModel {
    public SignalData: any;
    Id: number;
    Name: string;
    Count: number;
    Statistics: number;
    StatisticsDetail: any[];

    constructor(private signalData) {
        this.SignalData = signalData;
    }
}

export const CardColor = [
    'indigo darken-1',
    'purple lighten-1',
    'red darken-1',
    'orange accent-4',
    'deep-orange darken-1',
    'mdb-color darken-3',
    'light-blue darken-2'
];


export enum TimeRange {
    YearToDate = 0,
    Today = 1,
    Yesterday = 2,
    LastSevenDays = 3,
    LastThirtyDays = 4,
    LastMonth = 5,
}

export class ChartDataSet {
    fillColor = '#fff';
    backgroundColor = 'rgba(255, 255, 255, .3)';
    borderColor = 'rgba(255, 99, 132)';
    data: number[];
    id: number;

    constructor(id: number, label: string, data: number[]) {
        this.id = id;
        this.data = data;
    }
}

