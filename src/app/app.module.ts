
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule, BsDropdownModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { VistimelineComponent } from './vistimeline/vistimeline.component';
import {Location} from './location';
import { ExportCsvComponent } from './export-csv/export-csv.component'
import { IgxCsvExporterService } from 'igniteui-angular';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
  AppComponent,
  VistimelineComponent,
  ExportCsvComponent,
  ImportCsvComponent,
    
  ],
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    FormsModule,
    PopoverModule.forRoot(),		  
    ReactiveFormsModule,
    BrowserModule,CKEditorModule
  ],
  providers: [IgxCsvExporterService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
