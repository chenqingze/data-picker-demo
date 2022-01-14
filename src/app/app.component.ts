import {Component} from '@angular/core';
import {data, headNames} from "./city.data";
import {cityData} from "./city.data-tmp";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-picker-demo';

  data = data;
  headNames = headNames;
  cityData = cityData;

  pickedValues(selectedValue: any) {
    console.log(JSON.stringify(selectedValue));
  }
}
