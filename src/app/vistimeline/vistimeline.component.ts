import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Node } from '../models/models';
import { debug } from 'util';
//import { ExportToCsv } from 'export-to-csv';
declare var vis: any;

@Component({
  selector: 'app-vistimeline',
  templateUrl: './vistimeline.component.html',
  styleUrls: ['./vistimeline.component.css']
})
export class VistimelineComponent implements OnInit {
  @Input() root: Node;
  @ViewChild("visjsTimeline") timelineContainer: ElementRef;
  tlContainer: any;
  timeline: any;
  data: any;
  options: {};
  fatherItem: string[];

  constructor() {
  }

  ngOnInit() {
    this.getTimelineData();
  }

  ngAfterViewInit() {
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new vis.Timeline(this.tlContainer, this.data, this.options);
    this.timeline.on('mouseDown', (properties) => {
      console.log('test');
    })
  }
  updateGraph() {
    this.getTimelineData();
  }
  getTimelineData() {
    //debugger;
    if (this.root) {
      
      const toBeVisited: Node[] = [];
      this.root.children.forEach(x => toBeVisited.push(x));
      const graphItems = [];
      while (toBeVisited.length) {
        const current = toBeVisited.pop();
        toBeVisited.push(...current.children);
        graphItems.push({ 
          id: current.id, 
          content: current.context, 
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
        newItem.timeline = this.timeline;
        newItem.fatherItem = [];
        newItem.children = [];
        const items = this.data._data;
        const fathers = this.data.length == 0 ? null : Object.keys(items).forEach(key => {
          //const newTime = properties.time;
          const currentTime = items[key];
          if ((newItem.start >= currentTime.start && newItem.start <= currentTime.end)
            || (newItem.end >= currentTime.start && newItem.end <= currentTime.end)
            || (newItem.start <= currentTime.start && newItem.end >= currentTime.end)) {
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
            const itemData = {...this.timeline.itemSet.items[key],start:newStart,end:newEnd,oldStart:newStart,oldEnd:newEnd};
            this.timeline.itemsData.update(itemData);
          }
        })
        newItem.oldStart = newItem.start;
        newItem.oldEnd = newItem.end;
        callback(newItem);
      },
      onUpdate:  (item, callback)=> { //change name of item
        item.content = prompt('Edit items text:', item.content);
        if (item.content != null) {
          callback(item);
        }
        else {
          callback(null);
        }
      },
      // onRemove:  (item, callback) =>{ 
      //   if (item.children.length>0){
      //     for (var i =0; i<item.children.length;i++) {
      //       item.timeline.itemsData.remove(item.children[i]);
 
      //     }
      //   }
      //   callback(item);
      //},
      onMoving:  (item, callback) =>{ //change name of item
        if (item.children){
          var did_change = (item.start.getTime() - item.oldStart.getTime()) != (item.end.getTime() - item.oldEnd.getTime());
          if (!did_change){
            for (var i=0; i<item.children.length; i++){
              var newStart = new Date(item.children[i].start.getTime() + item.start.getTime() - item.oldStart.getTime());
              var newEnd = new Date(item.children[i].end.getTime() + item.end.getTime() - item.oldEnd.getTime());
              item.children[i].start = newStart;
              item.children[i].end = newEnd;
              const itemData = {...item.timeline.itemSet.items[item.children[i].id],start:newStart,end:newEnd,oldStart:newStart,oldEnd:newEnd};
              item.timeline.itemsData.update(itemData);
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

  }

}




