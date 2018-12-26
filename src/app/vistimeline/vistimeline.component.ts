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
    this.timeline = new vis.Timeline(this.tlContainer, this.data, {});  
  }

getTimelineData() {
      // Create a DataSet (allows two way data-binding)
      this.data = new vis.DataSet([
         {id: 1, content: 'item1', start: '2018-05-01'},
       
        
      ]);
      
    
      this.options = {
        editable: true,
        showTooltips: true,
        tooltip: {
          followMouse: true,
          overflowMethod: 'cap'
        },
        margin: {
          item: 20,
          axis: 40
        }
      };
      // Configuration for the Timeline
      /*this.options = {
        width: '100%',
        height: '30px',
        margin: {
          item: 20
        }
      };*/

  }
}