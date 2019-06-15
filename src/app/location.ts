export class Location {
  public id:number;
    public content:string;
    public startD:Date;
    public endDate:Date;
    constructor( content:any, startD:Date, endDate:Date)
    {
        this.content=content;
        this.startD=startD;
        this.endDate=endDate;
    }
    
}
