import { AfterViewInit, Component, OnInit, SimpleChanges, OnChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { Node } from '../models/models';
import { NodeService } from '../node.service';
import { debug } from 'util';
//import { ExportToCsv } from 'export-to-csv';
declare var vis: any;

@Component({
  selector: 'app-vistimeline',
  templateUrl: './vistimeline.component.html',
  styleUrls: ['./vistimeline.component.css']
})
export class VistimelineComponent implements OnInit, OnChanges {
  @Input() root: Node;
  @ViewChild("visjsTimeline") timelineContainer: ElementRef;
  tlContainer: any;
  timeline: any;
  data: any;
  options: {};
  fatherItem: string[];

  constructor(public nodeService: NodeService) {
  }

  ngOnInit() {
    this.getTimelineData();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getTimelineData();
  }

  ngAfterViewInit() {
    
  }
  updateGraph() {
    this.getTimelineData();
  }
  getTimelineData() {
    if (this.root) {
      
      const toBeVisited: Node[] = [];
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
      this.data = new vis.DataSet(graphItems);
    } else {
      this.data = new vis.DataSet([
        { id: 1, content: 'item1', start: new Date(2018, 12, 23),  end: new Date(2018, 12, 27)}
      ]);
    }

    this.options = {
      moveable: true,
      height: '400px',
      editable: true,// add/remove item
      showTooltips: true,
      clickToUse: true,
      //multiselect:true,
      align:'center',
      onAdd: (newItem, callback) => {
        //debugger;
        newItem.children = [];
        const items = this.root.children;
        const parent = items.filter(currentTime => (newItem.start >= currentTime.start && newItem.start <= currentTime.end)
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
        const node = this.nodeService.findNode(item.id, this.root);
        for( var i = 0; i < node.parent.children.length; i++){ 
          if ( node.parent.children[i].id === item.id) {
            node.parent.children.splice(i, 1); 
            i--;
          }
       }
        callback(item);
      },
      onMoving:  (item, callback) =>{ //change name of item
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

    if(this.timeline) {
      this.timeline.destroy();
    }

    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new vis.Timeline(this.tlContainer, this.data, this.options);
    this.timeline.on('mouseDown', (properties) => {
      console.log('test');
    })
  }

}




