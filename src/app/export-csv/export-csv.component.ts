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
    this.exporedData.push({ id: node.id, content: node.content, start: node.start.getTime(),end: node.end.getTime(), parent: node.parent && node.parent.id });
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

