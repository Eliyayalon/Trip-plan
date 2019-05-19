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
  // public importedData = ["id,name,start,end,parent",
  //                         "1,,0,0,", 
  //                         "2,n2,1557643034236,1557743034236,1",
  //                         "3,n3,1557773034236,1557843034236,1",
  //                         "4,n4,1557683034236,1557723034236,2"];
  public importedData : string;
  public splitedToLines: string[];
  public splittedData: string[][];
  public root: Node;
  @Output() onImportComplete: EventEmitter<Node> = new EventEmitter();
  constructor(public nodeService: NodeService) { }

  ngOnInit() {
    
  }

fileUpload(event){
  var reader = new FileReader();
  //var me = this;
  reader.onload = () => {
    if(typeof reader.result == "string") {
      this.importedData = reader.result;
    }
    debugger
    this.csvSplittData();
    this.onImportComplete.emit(this.root);
  }
  
  reader.readAsText(event.srcElement.files[0]);
}

csvSplittData(){
  this.splitedToLines = this.importedData.split('\r\n');
  debugger
    this.splittedData = this.splitedToLines.map(n => n.split(','));
    debugger
    let isFirst = true;
    this.splittedData.forEach(nodeArray => {
      if (isFirst) {
        isFirst = false;
        return;
      }
      if (!nodeArray[4]) {
        this.root = this.nodeService.arrayToNode(nodeArray);
      } else {
        let nodeToBeAdded : Node = this.nodeService.arrayToNode(nodeArray);
        this.nodeService.addNode(this.root, nodeToBeAdded, nodeArray[4]);
      }
    });
    
  }
  
}
