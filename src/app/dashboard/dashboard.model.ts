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

export const CardColor = ['indigo darken-1', 'purple lighten-1', 'red darken-1', 'orange accent-4'];
