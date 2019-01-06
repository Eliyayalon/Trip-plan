import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var vis:any;

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
  

  constructor() { 
    this.getTimelineData();
    
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {     
    this.tlContainer = this.timelineContainer.nativeElement;       
    this.timeline = new vis.Timeline(this.tlContainer, this.data, this.options);  
  }
  

getTimelineData() {
      // Create a DataSet (allows two way data-binding)
      this.data = new vis.DataSet([
         {id: 1, content: 'item1', start: '2018-12-29', end:'2018-12-30' },
       
        
      ]);
      
      
        this.options = {
          
        editable: true,// add/remove item
        showTooltips: true,
        clickToUse: true,
        
        onUpdate: function (item, callback) { //change name of item
          item.content = prompt('Edit items text:', item.content);
          if (item.content != null) {
            callback(item); 
          }
          else {
            callback(null); 
          }
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