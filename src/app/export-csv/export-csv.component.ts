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

  public localData = [
    { id: 1, content: 'item1', start: new Date(2018, 12, 23),end: new Date(2018, 12, 27) }
    
  ]
  
  constructor(private csvExportService: IgxCsvExporterService) {
    
  }

  public exportCsvButtonHandler() {
    const opt: IgxCsvExporterOptions = new IgxCsvExporterOptions("CSVExportFileFromData", CsvFileTypes.CSV);
    this.csvExportService.exportData(this.localData, opt);
  }


}

