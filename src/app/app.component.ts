import { Component, OnInit } from '@angular/core';
import { Node } from './models/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public root: Node;
  constructor() { 
    //this.root = null;
    this.root = { id: "0", content: "root", parent: null, start: new Date(2018, 12, 23),  end: new Date(2018, 12, 27), children: [{ id: "1", content: 'item1', start: new Date(2018, 12, 23),  end: new Date(2018, 12, 27), children: [], parent: null }] };
    
  }

  onImportComplete(newRoot: Node) {
    this.root = newRoot;
    console.log(this.root);
  }
  ngOnInit() {
  }

}

