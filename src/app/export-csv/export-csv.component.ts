import { Component, Input } from "@angular/core";
import { CsvFileTypes, IgxCsvExporterOptions, IgxCsvExporterService } from "igniteui-angular";
import { Node } from '../models/models';
//import { start } from 'repl';

@Component({
  selector: "app-export-csv",
  styleUrls: ["./export-csv.component.css"],
  templateUrl: "./export-csv.component.html"
})
export class ExportCsvComponent {
  @Input() root: Node;
  
  public exporedData = [    
  ]
  
  constructor(private csvExportService: IgxCsvExporterService) {
    
  }
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  nodeToArray(node: Node) {
    if (node.isRoot){
      this.exporedData.push({ id: node.id, content: node.content, start: null,end: null, parent: node.parent!=null ? node.parent.id:'', isRoot: node.isRoot, price: node.price, enabled: node.isEnabled });
    }
    else{
      debugger;
      this.exporedData.push({  id: node.id,content:node.content,
        start: JSON.stringify(node.start),
       end: JSON.stringify(node.end),
      
        parent: node.parent!=null ? node.parent.id:'',
        isRoot: node.isRoot, 
       price: node.price, 
       enabled: node.isEnabled ,
       description:node.description,
       "Subject": node.content,
       "Start Date":node.start.getDate()+"/"+node.start.getMonth()+"/"+node.start.getFullYear(),
       "Start Time":this.formatAMPM(node.start),
      
       "End Date":node.end.getDate()+"/"+node.end.getMonth()+"/"+node.end.getFullYear(), 
      "End Time":this.formatAMPM(node.end),
       "Private":"",
       "All Day Event":"",
       "Location":""}
      
       );

 //this.exporedData.push({ id: node.id, content: node.content, start: JSON.stringify(node.start),end: JSON.stringify(node.end), parent: node.parent!=null ? node.parent.id:'', isRoot: node.isRoot, price: node.price, enabled: node.isEnabled });
     
     console.log("the type of start Parse date is: " +typeof(JSON.stringify(node.start)));

     //this.exporedData.push({ "ID": node.id, "subject": node.content, "Start Date": "JSON.stringify(node.start)",end: JSON.stringify(node.end), parent: node.parent!=null ? node.parent.id:'', isRoot: node.isRoot, price: node.price, enabled: node.isEnabled });
      debugger;
    }
    node.children.forEach(node => {
      this.nodeToArray(node);
    });
  }

  public exportCsvButtonHandler() {
    this.exporedData = [];
    this.nodeToArray(this.root);
    const opt: IgxCsvExporterOptions = new IgxCsvExporterOptions("CSVExportFileFromData", CsvFileTypes.CSV);
    this.csvExportService.exportData(this.exporedData, opt);
  }
  


}

