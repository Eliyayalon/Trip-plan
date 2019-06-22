export class Node {
    public children: Node[];
    public start: Date;
    public end: Date;
    public id: string;
    public content: string;
    public parent: Node;
    public isRoot:boolean
    public isEnabled:boolean;
    public price:number;
    
    public constructor( startD: Date, endD:Date,id:string,content:string,isRoot:boolean,isEnabled:boolean,price:number)
        {
            this.price=price;
            this.start=startD;
            this.end=endD;
            this.id=id;
            this.content=content;
            this.isRoot=isRoot;
            this.isEnabled=isEnabled;
        }
    }