export class Alert {
    type: AlertType;
    message: string;
    autoDismiss = true;
}
export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
