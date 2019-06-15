import { Injectable } from '@angular/core';
import {Node} from './models/models';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  public findNode = (nodeId: string, root?: Node): Node => {
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
  public findNodeContent(nodeContent:string,root:Node)
  {
    if(root.content==nodeContent)
    {
      return root;
    }
    else if (!root.children.length) {
      return null;  }
      else {
        let i = 0;
        while (i < root.children.length) {
          let res = this.findNodeContent(nodeContent, root.children[i++]);
          if (res) {
            return res;
          }
        }
        return null;
      }
    }
      


  public updateParent(currNode:Node, start:Date, end:Date)
  {

    if (currNode.isRoot)
    {
      return;
    }

    if (currNode.start > start){
      currNode.start = start;
    }
    if (currNode.end < end){
      currNode.end = end;
    }

    this.updateParent(currNode.parent, start, end);


  }

  public updateChildren(currNode: Node, start:Date, end:Date, oldStart: Date, oldEnd: Date){
    for (var i=0; i<currNode.children.length; i++){
      var newChildStart = new Date(currNode.children[i].start.getTime() + start.getTime() - oldStart.getTime());
      var newChildEnd = new Date(currNode.children[i].end.getTime() + end.getTime() - oldEnd.getTime());
      
      currNode.children[i].start = newChildStart;
      currNode.children[i].end = newChildEnd;

      this.updateChildren(currNode.children[i], start, end, oldStart, oldEnd);


    }
  }

  public getParent(currNode:Node, tree:Node)
  {
    if( (!tree.isRoot) && (tree.start >= currNode.end || tree.end <= currNode.start) )
    {

      return null;
    }

    for( var i = 0; i < tree.children.length; i++)
    {

      var parent = this.getParent(currNode, tree.children[i]);

      if (parent != null){
        
        return parent;
      }
    }

    return tree;
  }

  public arrayToNode = (arr: any[]) =>
    ({
      id: arr[0],
      start: arr[2]==""?null:new Date(JSON.parse(arr[2])),
      end: arr[3]==""?null:new Date(JSON.parse(arr[3])),
      content: arr[1],
      children: [],
      parent: null,
      isRoot: arr[5]=="true"?true:false,
      isEnabled:arr[7]=="true"?true:false,
      price:arr[6]
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
