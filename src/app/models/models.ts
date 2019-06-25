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
    public description:string;
    public constructor( startD: Date, endD:Date,id:string,content:string,isRoot:boolean,isEnabled:boolean,price:number,description:string)
        {
            this.price=price;
            this.start=startD;
            this.end=endD;
            this.id=id;
            this.content=content;
            this.isRoot=isRoot;
            this.isEnabled=isEnabled;
            this.description=description;
        }

    
}

