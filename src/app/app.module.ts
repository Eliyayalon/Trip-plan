
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule, BsDropdownModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { VistimelineComponent } from './vistimeline/vistimeline.component';


@NgModule({
  declarations: [
  AppComponent,
  VistimelineComponent,
    
  ],
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    FormsModule,
    PopoverModule.forRoot(),		  
    ReactiveFormsModule,
    BrowserModule
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
