import { Component, Input } from "@angular/core";
import { CsvFileTypes, IgxCsvExporterOptions, IgxCsvExporterService } from "igniteui-angular";
import { Node } from '../models/models';

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

  nodeToArray(node: Node) {
    if (node.isRoot){
      this.exporedData.push({ id: node.id, content: node.content, start: null,end: null, parent: node.parent!=null ? node.parent.id:'', isRoot: node.isRoot, price: node.price, enabled: node.isEnabled });
    }
    else{
      this.exporedData.push({ id: node.id, content: node.content, start: JSON.stringify(node.start),end: JSON.stringify(node.end), parent: node.parent!=null ? node.parent.id:'', isRoot: node.isRoot, price: node.price, enabled: node.isEnabled });

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

