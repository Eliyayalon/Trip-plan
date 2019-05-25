import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var vis: any;

@Component({
  selector: 'app-vistimeline',
  templateUrl: './vistimeline.component.html',
  styleUrls: ['./vistimeline.component.css']
})
export class VistimelineComponent implements OnInit {

  @ViewChild("visjsTimeline") timelineContainer: ElementRef;
  tlContainer: any;
  timeline: any;
  data: any;
  options: {};
  fatherItem: string[];



  constructor() {
    this.getTimelineData();

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new vis.Timeline(this.tlContainer, this.data, this.options);
    this.timeline.on('mouseDown', (properties) => {
      console.log('test');
      // debugger;

    })

    // this.timeline.on('mouseUp',(properties)=>{



  }
  


  getTimelineData() {
    // Create a DataSet (allows two way data-binding)
    this.data = new vis.DataSet([
      { id: 1, content: 'item1', className: "enabled", start: new Date(2018, 12, 23), oldStart: new Date(2018, 12, 23), end: new Date(2018, 12, 27), oldEnd: new Date(2018, 12, 27) }

    ]);

    this.options = {
      moveable: true,
      height: '350px',
      editable: true,// add/remove item
      showTooltips: true,
      clickToUse: true,
     
      
      onAdd: (newItem, callback) => {
      
        newItem.timeline = this.timeline;
        newItem.fatherItem = [];
        newItem.children = [];
        newItem.className = 'enabled';
        const items = this.data._data;
        const fathers = this.data.length == 0 ? null : Object.keys(items).forEach(key => {
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
            //debugger;
            //this.timeline.itemSet.items[key].data.start = newStart;
            //this.timeline.itemSet.items[key].data.end = newEnd;
            const itemData = {...this.timeline.itemSet.items[key],start:newStart,end:newEnd,oldStart:newStart,oldEnd:newEnd};
            //debugger;
            this.timeline.itemsData.update(itemData);
            //debugger;
          }
        })
        console.log(newItem.fatherItem);
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
        newItem.oldStart = newItem.start;
        newItem.oldEnd = newItem.end;
        callback(newItem);
       // debugger;
        //this.fatherItem = [];

      },
      onUpdate:  (item, callback)=> { //change name of item
        item.content = prompt('Edit items text:', item.content);
        var aaa = confirm("Is it enabled?");
        if (aaa){
          item.className = "enabled";
        }
        else{
          item.className = "disabled";
        }
        if (item.children){
          for (var i=0; i<item.children.length; i++){
            item.children[i].className = item.className;
            const itemData = {...item.timeline.itemSet.items[item.children[i].id],className:item.className};
            item.timeline.itemsData.update(itemData);

          }
        }
        if (item.content != null) {
          callback(item);
        }
        else {
          callback(null);
        }
      },
      onRemove:  (item, callback) =>{ //change name of item
        if (item.fatherItem){
          for (var i =0; i<item.fatherItem.length;i++) {
            for (var j=0;j<item.fatherItem[i].children.length; j++){
              if (item.fatherItem[i].children[j].id == item.id){
                item.fatherItem[i].children.splice(j,1);
              }
            }
          }
        }
        callback(item);
      },
      onMoving:  (item, callback) =>{ //change name of item
        //console.log(item.end.getTime() - item.oldEnd.getTime());
        //debugger;
        if (item.children){
          var did_change = (item.start.getTime() - item.oldStart.getTime()) != (item.end.getTime() - item.oldEnd.getTime());
          if (!did_change){
            for (var i=0; i<item.children.length; i++){
              //debugger;
              //console.log( (item.children[i].start.getTime() + item.start.getTime() - item.oldStart.getTime()) - item.children[i].start.getTime());
              var newStart = new Date(item.children[i].start.getTime() + item.start.getTime() - item.oldStart.getTime());
              var newEnd = new Date(item.children[i].end.getTime() + item.end.getTime() - item.oldEnd.getTime());
              console.log(item.children[i].start);
              console.log(item.children[i].end);
              console.log(item.children[i].start.getTime() + item.start.getTime() - item.oldStart.getTime());
              console.log(item.children[i].end.getTime() + item.end.getTime() - item.oldEnd.getTime());
              console.log(newStart);
              console.log(newEnd);
              //debugger;
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

