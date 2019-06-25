import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Node } from '../models/models';
import { NodeService } from '../node.service';
import { debug } from 'util';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { typeSourceSpan } from '@angular/compiler';
import { ExportToCsv } from 'export-to-csv';
declare var vis: any;
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-vistimeline',
  templateUrl: './vistimeline.component.html',
  styleUrls: ['./vistimeline.component.css']
})
export class VistimelineComponent implements OnInit {
  @Input() root: Node;
  public onChange( { editor }: ChangeEvent ) {
    const rich = editor.getData();
    this.selectedNode.description=rich;

    
    console.log(rich);
}
public model = {
  editorData: ''
};
public isDisabled = false;
    // ...
    toggleDisabled() {
        this.isDisabled = !this.isDisabled
    }
  public Editor = ClassicEditor;
  @ViewChild("visjsTimeline") timelineContainer: ElementRef;
  tlContainer: any;
  timeline: any;
  data: any;
  options: {};
  values = '';
  allow=false;
  fatherItem: string[];
  selectedNode:Node=null;


/*
  util = require('util');
  express  = require('express');
  
  config = require('./config');
  gcal = require('../GoogleCalendar');
  app = this.express();
  passport = require('passport')
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
 */
  



  constructor(public nodeService: NodeService) {
    //this.getTimelineData();

  }

  ngOnInit() {
    //this.getTimelineData();
    console.log(this.Editor);
    console.log(ClassicEditor);


   }

  ngAfterViewInit() {
    
    /*
    debugger;
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new vis.Timeline(this.tlContainer, this.data, this.options);
    //this.timeline.itemsData.remove(1);
    this.timeline.on('select', (properties) => {
        var id = properties.items[0];
        console.log(id);
        this.selectedNode=this.nodeService.findNode(id,this.root);
        console.log(this.selectedNode.id);

    })
    */
  }
  updateGraph() {
    
    debugger;
    this.getTimelineData();
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new vis.Timeline(this.tlContainer, this.data, this.options);
    this.timeline.itemsData.remove(1);
    this.timeline.on('select', (properties) => {
      
        var id = properties.items[0];
        console.log(id);
        this.selectedNode=this.nodeService.findNode(id,this.root);

        this.model.editorData=this.selectedNode.description;
        console.log(this.selectedNode.id);

    })
    //this.timeline = new vis.Timeline(this.tlContainer, this.data, this.options);
    /*const toBeVisited: Node[] = [];
      this.root.children.forEach(x => toBeVisited.push(x));
      const graphItems = [];
      while (toBeVisited.length) {
        const current = toBeVisited.pop();
        toBeVisited.push(...current.children);
        graphItems.push({ 
          id: current.id, 
          content: current.content, 
          start: current.start, 
          end: current.end});
      }
      //this.data = new vis.DataSet(graphItems);
      //this.ngAfterViewInit();
      

    //this.ngAfterViewInit();
    */
  }
//find
  updateParentsTimeline(parent: Node){
    if (parent!= null && !parent.isRoot){
      const itemData = {...this.timeline.itemSet.items[parent.id],start:parent.start,end:parent.end}; //,oldStart:newStart,oldEnd:newEnd};
      this.timeline.itemsData.update(itemData);
      this.updateParentsTimeline(parent.parent);
    }
  }



  updateChildrenTimeline(node: Node){
    if (node!=null && !node.isRoot){
      const itemData = {...this.timeline.itemSet.items[node.id],start:node.start,end:node.end}; //,oldStart:newStart,oldEnd:newEnd};
      this.timeline.itemsData.update(itemData);
      for (var i=0; i<node.children.length; i++){
        this.updateChildrenTimeline(node.children[i]);
      }
    }
  }
  disableEnableTree(node:Node,enabled:boolean)
  {
    if (node!=null && !node.isRoot){
      node.isEnabled=enabled;
      const itemData = {...this.timeline.itemSet.items[node.id],className: enabled?'enabled':'disabled'}; //,oldStart:newStart,oldEnd:newEnd};
      this.timeline.itemsData.update(itemData);
      for (var i=0; i<node.children.length; i++){
        this.disableEnableTree(node.children[i], enabled);
      }

      this.updateTreePrice(node.parent);
    }

  }
  removeTree(tree: Node){
    this.timeline.itemsData.remove(this.timeline.itemSet.items[tree.id]);
    for (var i=0; i<tree.children.length;i++){
      this.removeTree(tree.children[i]);
    }
  }
  onKey(event:Event) { // with type info
    this.values = (<HTMLInputElement>event.target).value;
  }

  returnItemDate(event:any)
  {
  }
  findContent()
  {
      const node=this.nodeService.findNodeContent(this.values,this.root);
      if(node!=null)
      {
        this.timeline.setSelection(node.id, {focus:true});
      }
  }
  disableEnableActivity(enabled:boolean)
  {
    var id=this.timeline.getSelection();
    console.log(id[0]);
    const tree=this.nodeService.findNode(id[0],this.root);
    this.disableEnableTree(tree,enabled);
  }
  updateTreePrice(node: Node)
  {
    if (node == null ){
      
      return;
    }
    
    var price=0;
    for(var i=0;i<node.children.length;i++)
    {
     if(node.children[i].isEnabled)
        price+=node.children[i].price;
    }
    node.price=price;
    if (node.isRoot){
      
      return;
    }
    this.updateTreePrice(node.parent);
    

  }
  setPrice()
  {
    var priceOfItem = parseFloat(prompt("Enter a Value", "0"));
    var id=this.timeline.getSelection();

    const tree=this.nodeService.findNode(id[0],this.root);
    tree.price=priceOfItem;
    this.updateTreePrice(tree.parent);



  }
  getTimelineData() {
    //debugger;
    if (this.root) {
     
    
      this.root.isRoot=true;
      const toBeVisited: Node[] = [];
      this.root.children.forEach(x => toBeVisited.push(x));
      const graphItems = [];
      while (toBeVisited.length) {
        const current = toBeVisited.pop();
        toBeVisited.push(...current.children);
        console.log("current is enablerd: "+ current.isEnabled);
        if (!current.isRoot){
          graphItems.push({ 
            id: current.id, 
            content: current.content, 
            start: current.start, 
            end: current.end,
            className:current.isEnabled?"enabled":"disabled"});
          }
      }
      debugger;
      this.data = new vis.DataSet(graphItems);
      

    } else {
      debugger;
      this.root = new Node(null,null,'root',null,true,true,0,"");
      this.root.id='root';
      this.root.start=null;
      this.root.end=null;
      this.root.content=null;
      this.root.isRoot=true;
      this.root.children=[];
      this.root.parent=null;


      var today = new Date();
      var nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate()+7);
      this.data = new vis.DataSet([
       { id: 1, content: 'item1', className: 'disabled', start: today,  end: nextWeek}
      ]);
      //this.timeline.setCurrentTime(new Date());
    }

    this.options = {
      moveable: true,
      height: '400px',
      editable: true,// add/remove item
      showTooltips: true,
      clickToUse: true,
      //multiselect:true,
      align:'center',

      
      template: (item, element, data) => {

        if (item != null){
          //var val = '<h1>' + item.content + '</h1>';
          //debugger;
          const node = this.nodeService.findNode(item.id, this.root);
          if  (node != null){
            return  node.content ;
          }
        }
        
      },
      

      onAdd: (newItem, callback) => {
        //this.timeline.setSelection('1', {focus:true});
        //debugger; 
        debugger;
      newItem.className = "enabled";
       let currNode=new Node(newItem.start,newItem.end,newItem.id,newItem.content,false,true,0,"");
       //console.log("dfsd:" +typeof(0));
        currNode.children=[];
       
        currNode.parent=this.nodeService.getParent(currNode, this.root);




        //currNode.parent = nodeParent;

        currNode.parent.children.push(currNode);

        this.nodeService.updateParent(currNode.parent, currNode.start, currNode.end);
        console.log("the enabled of this node is: " +currNode.isEnabled);
       

        newItem.children = [];
        newItem.start=currNode.start;
        newItem.content=currNode.content;
        newItem.parent=currNode.parent;

        newItem.end=currNode.end;

        this.updateParentsTimeline(newItem.parent);


        //const items = this.root.children;
        /*const items = this.data._data;
        //const fathers = this.data.length == 0 ? null : Object.keys(items).forEach(key => {
          //const newTime = properties.time;
          const currentTime = items[key];
          if ((newItem.start >= currentTime.start && newItem.start <= currentTime.end)
            || (newItem.end >= currentTime.start && newItem.end <= currentTime.end)
            || (newItem.start <= currentTime.start && newItem.end >= currentTime.end)) {
            console.log("Has Father");
            console.log(newItem.start);
            console.log(newItem.end);
            console.log(currentTime.start);
            console.log(currentTime.end);
            debugger;
            if (!newItem.fatherItem) {
              newItem.fatherItem = [];
            }
            newItem.fatherItem.push(items[key]);
            if (currentTime.children==null){
              currentTime.children = []
            }
            currentTime.children.push(newItem)
            var newStart = currentTime.start;
            var newEnd = currentTime.end;
            //debugger;
            if (newStart > newItem.start) {
              newStart = newItem.start;
            }
            if (newEnd < newItem.end) {
              newEnd = newItem.end;
            }
            debugger;
            //this.timeline.itemSet.items[key].data.start = newStart;
            //this.timeline.itemSet.items[key].data.end = newEnd;
            const itemData = {...this.timeline.itemSet.items[key],start:newStart,end:newEnd,oldStart:newStart,oldEnd:newEnd};
            //debugger;
            this.timeline.itemsData.update(itemData);
            //debugger;
          }
        })
        
        */
       // console.log(newItem.fatherItem);
        // const fathers= this.data.length==0 ? null : items.filter(existItem=>{
        // newItem.start.getDate()>=existItem.getDate()
        // })
        // newItem = { ...newItem, father: fathers };
        // this.data._data
        // = { ...this.data._data,
        // [this.data._data[1]]:{...this.data._data[1],end:newItem.end}
        // };
        // debugger;
        //const itemData={...this.timeline.itemSet.items[1],end: newItem.end};
        //this.timeline.itemsData.update(itemData);
        //debugger;
       // newItem.oldStart = newItem.start;
       // newItem.oldEnd = newItem.end;
        callback(newItem);







        /*const parent = items.filter(currentTime => (newItem.start >= currentTime.start && newItem.start <= currentTime.end)
        || (newItem.end >= currentTime.start && newItem.end <= currentTime.end)
        || (newItem.start <= currentTime.start && newItem.end >= currentTime.end));
        if(parent.length > 0)  {
          const currentTime = parent[0];
          if ((newItem.start >= currentTime.start && newItem.start <= currentTime.end)
            || (newItem.end >= currentTime.start && newItem.end <= currentTime.end)
            || (newItem.start <= currentTime.start && newItem.end >= currentTime.end)) {
            if (currentTime.children==null){
              currentTime.children = [];
            }
            newItem.parent = currentTime;
            currentTime.children.push(newItem);
            newItem.end = currentTime.end;
            newItem.oldStart = newItem.start;
            newItem.oldEnd = newItem.end;
          }
        }
        
        callback(newItem);
        */
      },
      onUpdate:  (item, callback)=> { //change name of item
        item.content = prompt('Edit items text:', item.content);
       
        if (item.content != null) {
          const node = this.nodeService.findNode(item.id, this.root);
          node.content = item.content;
          callback(item);
        }
        else {
          callback(null);
        }
      },
      onRemove:  (item, callback) =>{ 
        debugger;
        const node = this.nodeService.findNode(item.id, this.root);


        this.removeTree(node);

        for( var i = 0; i < node.parent.children.length; i++){ 
          if ( node.parent.children[i].id === item.id) {
            node.parent.children.splice(i, 1); 
            break;
          }
        }

        this.updateTreePrice(node.parent);


      },
      onMoving:  (item, callback) =>{ //change name of item
        //debugger;
        //console.log("moving");
        const node = this.nodeService.findNode(item.id, this.root);

        if (node != null){
          var oldStart = node.start;
          var oldEnd = node.end;
          node.start = item.start;
          node.end = item.end;
          this.nodeService.updateParent(node.parent, node.start, node.end);
          this.updateParentsTimeline(node.parent);

          this.nodeService.updateChildren(node, node.start, node.end, oldStart, oldEnd);
          this.updateChildrenTimeline(node);

        }
        /*
        if (item.children){
          var did_change = (item.start.getTime() - item.oldStart.getTime()) != (item.end.getTime() - item.oldEnd.getTime());
          if (!did_change){
            for (var i=0; i<item.children.length; i++){
              var newStart = new Date(item.children[i].start.getTime() + item.start.getTime() - item.oldStart.getTime());
              var newEnd = new Date(item.children[i].end.getTime() + item.end.getTime() - item.oldEnd.getTime());
              item.children[i].start = newStart;
              item.children[i].end = newEnd;
            }
          }

        } 
        item.oldStart=item.start;
        item.oldEnd=item.end;
        */
        callback(item);
      },
      tooltip: {
        followMouse: true,
        overflowMethod: 'cap'
      },
      margin: {
        item: 20,
        axis: 20
      }
    };

  }

}




