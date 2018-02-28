export class Location {
    public lattitude: number;
    public longitude: number;
    constructor(private _lattitude: number, private _longitude: number) {
        this.lattitude = _lattitude;
        this.longitude = _longitude;
    }
}
