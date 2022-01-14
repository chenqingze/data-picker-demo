import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DataPickerComponent} from './data-picker/data-picker.component';
import {MultiDataPickerComponent} from './multi-data-picker/multi-data-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    DataPickerComponent,
    MultiDataPickerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
