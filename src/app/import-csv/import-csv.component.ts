import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../models/models';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.css']
})
export class ImportCsvComponent implements OnInit {
  public importedData = ["id,name,start,end,parent",
                          "1,,0,0,", 
                          "2,n2,123,456,1",
                          "3,n3,1234,4567,1",
                          "4,n4,1231,4561,2"];
  public splittedData: string[][];
  @Input() root: Node;
  constructor() { }

  ngOnInit() {
    
  }

  importCsvButtonHandler() {
    this.splittedData = this.importedData.map(n => n.split(','));
    let isFirst = true;
    this.splittedData.forEach(nodeArray => {
      if (isFirst) {
        isFirst = false;
        return;
      }
      if (!nodeArray[4]) {
        this.root = this.arrayToNode(nodeArray);
      } else {
        let nodeToBeAdded : Node = this.arrayToNode(nodeArray);
        let parent = this.findNode(nodeArray[4], this.root);
        nodeToBeAdded.parent = parent;
        parent.children.push(nodeToBeAdded);
      }
    });
  }

  arrayToNode = (arr: string[]) =>
    ({
      id: arr[0],
      start: new Date(arr[2]),
      end: new Date(arr[3]),
      context: arr[1],
      children: [],
      parent: null
    })
  

  findNode = (nodeId: string, root: Node): Node => {
    if (root.id === nodeId) {
      return root;
    } else if (!root.children.length) {
      return null;
    } else {
      let i = 0;
      while (i < root.children.length) {
        let res = this.findNode(nodeId, root.children[i]);
        if (res) {
          return res;
        }
      }
      return null;
    }
  }

}
