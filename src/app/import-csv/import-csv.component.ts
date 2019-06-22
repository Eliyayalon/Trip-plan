import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Node } from '../models/models';
import { NodeService } from '../node.service';
import { debug } from 'util';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.css']
})
export class ImportCsvComponent implements OnInit {
  
  public importedData: string;
  public splitedToLines: string[];
  public splittedData: string[][];
  public root: Node;
  @Output() onImportComplete: EventEmitter<Node> = new EventEmitter();
  constructor(public nodeService: NodeService) { }

  ngOnInit() {

  }
  
  fileUpload(event) {
    var reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    //var me = this;
    reader.onload = () => {
      if (typeof reader.result == "string") {
        this.importedData = reader.result;
      }
      this.csvSplittData();
      this.onImportComplete.emit(this.root);
    }


  }


 csvSplittData(){

  const rowToObject = (headers, cells) =>
  headers.reduce(
    (acc, header, i) => {
      acc[header] = cells[i]
      return acc
    },
    {}
  )

const csvToObjects = file => {
  const [headerRow, ...dataRows] = file.split('\n')
  const headers = headerRow.split(',')
  return dataRows.map(
    row => rowToObject(headers, row.split(','))
  )
}
 }








}
