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
    this.root = null;
  }

  onImportComplete(newRoot: Node) {
    this.root = newRoot;
    console.log(this.root);
  }
  ngOnInit() {
  }

}

