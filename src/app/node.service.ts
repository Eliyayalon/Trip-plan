import { Injectable } from '@angular/core';
import {Node} from './models/models';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  findNode = (nodeId: string, root?: Node): Node => {
    if (root.id === nodeId) {
      return root;
    } else if (!root.children.length) {
      return null;
    } else {
      let i = 0;
      while (i < root.children.length) {
        let res = this.findNode(nodeId, root.children[i++]);
        if (res) {
          return res;
        }
      }
      return null;
    }
  }

  public arrayToNode = (arr: any[]) =>
    ({
      id: arr[0],
      start: new Date(arr[2] * 1),
      end: new Date(arr[3] - 0),
      content: arr[1],
      children: [],
      parent: null
    })

  public addNode (root: Node, node: Node, parentId:string) {
    const parentNode = this.findNode(parentId, root);
    node.parent = parentNode;
    parentNode.children.push(node)  
  }

public removeNode(nodeId: string, root: Node){
  const node = this.findNode(nodeId, root);  
  const index = node.parent.children.indexOf(node);
  if (index !== -1) {
    node.parent.children.splice(index, 1);
   }
}
  constructor() { }
}
