import { Component } from "@angular/core";

import { CsvFileTypes, IgxCsvExporterOptions, IgxCsvExporterService } from "igniteui-angular";

@Component({
  selector: "app-export-csv",
  styleUrls: ["./export-csv.component.css"],
  templateUrl: "./export-csv.component.html"
})
export class ExportCsvComponent {

  public localData = [
    { Name: "Eliya", Age: "24" },
    { Name: "Libi", Age: "25" },
    { Name: "Omer", Age: "26" }
  ];

  constructor(private csvExportService: IgxCsvExporterService) {
  }

  public exportCsvButtonHandler() {
    const opt: IgxCsvExporterOptions = new IgxCsvExporterOptions("CSVExportFileFromData", CsvFileTypes.CSV);
    this.csvExportService.exportData(this.localData, opt);
  }


}

