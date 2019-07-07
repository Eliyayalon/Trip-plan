import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Node } from '../models/models';
import { NodeService } from '../node.service';
import { debug } from 'util';
import{VistimelineComponent}from '../vistimeline/vistimeline.component'
import bsCustomFileInput from 'bs-custom-file-input'

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
  public isUpl:boolean;
  @Output() onImportComplete: EventEmitter<Node> = new EventEmitter();
  constructor(public nodeService: NodeService) { }
  public allowToImport:boolean;

  ngOnInit() {
    this.allowToImport=this.nodeService.allowToCreate;
  }
  
  fileUpload(event) {
   // this.nodeService.allowToCreate==true;
   // this.vis.allow=true;
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

    this.allowToImport=false;
  }

  csvSplittData() {
    this.splitedToLines = this.importedData.split('\r\n');
    console.log(this.splitedToLines);
    this.splittedData = this.splitedToLines.map(n => n.split(','));
    console.log(this.splitedToLines);
    let isFirst = true;
    this.splittedData.forEach(nodeArray => {
      if (isFirst) {
        isFirst = false;
        return;
      }
      if (nodeArray.length > 1) {
        if (!nodeArray[4] || nodeArray[4] === "") {
          debugger;
          this.root = this.nodeService.arrayToNode(nodeArray);
        } else {
          debugger;
          let nodeToBeAdded: Node = this.nodeService.arrayToNode(nodeArray);
          this.nodeService.addNode(this.root, nodeToBeAdded, nodeArray[4]);
        }
      }
    });
  }

}
