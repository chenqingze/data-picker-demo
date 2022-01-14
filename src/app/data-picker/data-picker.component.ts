import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, Subject} from "rxjs";

enum PickerLevelType {
  First = 1, Second, Third, Fourth
}

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss']
})
export class DataPickerComponent implements OnInit {


  pickerLevel = PickerLevelType;
  isDataLinkage: boolean = true; // 数据是否联动
  @Input() pickerSize = 1; // picker选择列数
  @Input() displayAttributeName: string = '';
  @Input() childrenAttributeName: string = '';
  @Input() selectedAttributeName: string = '';
  @Input() headNameList: Array<string> = [];
  @Input() linkageData: Array<any> = [];
  @Input() firstLevelData: Array<any> = [];
  @Input() secondLevelData: Array<any> = [];
  @Input() thirdLevelData: Array<any> = [];
  @Input() fourthLevelData: Array<any> = [];

  @Output() pickerEvent = new EventEmitter();

  @ViewChild('firstPickerContent') firstPickerContentRef!: ElementRef;
  @ViewChild('secondPickerContent') secondPickerContentRef!: ElementRef;
  @ViewChild('thirdPickerContent') thirdPickerContentRef!: ElementRef;
  @ViewChild('fourthPickerContent') fourthPickerContentRef!: ElementRef;

  firstSelectedValue: any;
  secondSelectedValue: any;
  thirdSelectedValue: any;
  fourthSelectedValue: any;
  firstScroll$ = new Subject<any>();
  secondScroll$ = new Subject<any>();
  thirdScroll$ = new Subject<any>();
  fourthScroll$ = new Subject<any>();


  ngOnInit(): void {
    this.firstScroll$.asObservable().pipe(
      debounceTime(100)
    ).subscribe((v) => {
      let index = this.firstLevelData.indexOf(v);
      this.firstPickerContentRef.nativeElement.scrollTo({
        top: index * 33,
        behavior: 'smooth'
      });
      this.dataLinkage(PickerLevelType.First);
    });


    this.secondScroll$.asObservable().pipe(
      debounceTime(100)
    ).subscribe((v) => {
      let index = this.secondLevelData.indexOf(v);
      this.secondPickerContentRef.nativeElement.scrollTo({
        top: index * 33,
        behavior: 'smooth'
      });
      this.dataLinkage(PickerLevelType.Second);
    });

    this.thirdScroll$.asObservable().pipe(
      debounceTime(100)
    ).subscribe((v) => {
      let index = this.thirdLevelData.indexOf(v);
      this.thirdPickerContentRef.nativeElement.scrollTo({
        top: index * 33,
        behavior: 'smooth'
      });

      this.dataLinkage(PickerLevelType.Third);
    });

    this.fourthScroll$.asObservable().pipe(
      debounceTime(100)
    ).subscribe((v) => {
      let index = this.fourthLevelData.indexOf(v);
      this.fourthPickerContentRef.nativeElement.scrollTo({
        top: index * 33,
        behavior: 'smooth'
      });
      this.dataLinkage(PickerLevelType.Fourth);
    });

    // 初始化数据
    this.isDataLinkage = !!this.linkageData;
    if (this.isDataLinkage) {
      this.firstLevelData = this.linkageData;
      this.firstSelectedValue = this.firstLevelData[0];
      this.firstScroll$.next(this.firstSelectedValue);
    }
  }

  scrollTo(index: number, event: any, level: PickerLevelType) {
    let containerRef: ElementRef;
    switch (level) {
      case PickerLevelType.Second:
        containerRef = this.secondPickerContentRef;
        break;
      case PickerLevelType.Third:
        containerRef = this.thirdPickerContentRef;
        break;
      case PickerLevelType.Fourth:
        containerRef = this.fourthPickerContentRef;
        break;
      // here could have more picker level case
      case PickerLevelType.First:
      default:
        containerRef = this.firstPickerContentRef;
    }
    containerRef.nativeElement.scrollTo({
      top: index * 33,
      behavior: 'smooth'
    });
  }

  @HostListener("window:scroll", ['$event'])
  handleLevelScroll(event: any, level: PickerLevelType) {
    console.log("scroll:", event.target.scrollTop, "level:", level);
    switch (level) {
      case PickerLevelType.Second:
        this.secondSelectedValue = this.getValueByPosition(event.target.scrollTop, PickerLevelType.Second);
        this.secondScroll$.next(this.secondSelectedValue);
        break;
      case PickerLevelType.Third:
        this.thirdSelectedValue = this.getValueByPosition(event.target.scrollTop, PickerLevelType.Third);
        this.thirdScroll$.next(this.thirdSelectedValue);
        break;
      case PickerLevelType.Fourth:
        this.fourthSelectedValue = this.getValueByPosition(event.target.scrollTop, PickerLevelType.Fourth);
        this.fourthScroll$.next(this.fourthSelectedValue);
        break;
      // here could have more picker level case
      case PickerLevelType.First:
      default:
        this.firstSelectedValue = this.getValueByPosition(event.target.scrollTop, PickerLevelType.First);
        this.firstScroll$.next(this.firstSelectedValue);
    }
  }

  // 数据联动
  dataLinkage(level: PickerLevelType): void {
    if (level === PickerLevelType.First) {// 1st level pick
      if (this.pickerSize > 1 && this.firstSelectedValue) {
        this.secondLevelData = this.firstSelectedValue[this.childrenAttributeName];
        this.scrollTo(0, null, PickerLevelType.Second);
      } else {
        this.secondLevelData = [];
      }
      this.secondSelectedValue = this.secondLevelData[0];
      if (this.pickerSize > 2 && this.secondSelectedValue) {
        this.thirdLevelData = this.secondSelectedValue[this.childrenAttributeName];
        this.scrollTo(0, null, PickerLevelType.Third);
      } else {
        this.thirdLevelData = [];
      }
      this.thirdSelectedValue = this.thirdLevelData[0];
      if (this.pickerSize > 3 && this.thirdSelectedValue) {
        this.fourthLevelData = this.thirdSelectedValue[this.childrenAttributeName];
        this.scrollTo(0, null, PickerLevelType.Fourth);
      } else {
        this.fourthLevelData = [];
      }
    } else if (level === PickerLevelType.Second) {// 2nd level pick
      if (this.pickerSize > 2 && this.secondSelectedValue) {
        this.thirdLevelData = this.secondSelectedValue[this.childrenAttributeName];
        this.scrollTo(0, null, PickerLevelType.Third);
      } else {
        this.thirdLevelData = [];
      }
      this.thirdSelectedValue = this.thirdLevelData[0];
      if (this.pickerSize > 3 && this.thirdSelectedValue) {
        this.fourthLevelData = this.thirdSelectedValue[this.childrenAttributeName];
        this.scrollTo(0, null, PickerLevelType.Fourth);
      } else {
        this.fourthLevelData = [];
      }
    } else if (level === PickerLevelType.Third) {// 3rd level pick
      if (this.pickerSize > 4 && this.thirdSelectedValue) {
        this.fourthLevelData = this.thirdSelectedValue[this.childrenAttributeName];
        this.scrollTo(0, null, PickerLevelType.Fourth);
      } else {
        this.fourthLevelData = [];
      }
    } else if (level === PickerLevelType.Fourth) {
      // 4th level pick do nothing ,because the 4th level is the last level
    }
    // here could have more picker level case,care about the last level
    this.pickerEvent.emit([this.firstSelectedValue, this.secondSelectedValue, this.thirdSelectedValue, this.fourthSelectedValue])
  }

  private getValueByPosition(y: number, level: PickerLevelType) {
    let levelData: Array<any>;
    switch (level) {
      case PickerLevelType.Second:
        levelData = this.secondLevelData;
        break;
      case PickerLevelType.Third:
        levelData = this.thirdLevelData;
        break;
      case PickerLevelType.Fourth:
        levelData = this.fourthLevelData;
        break;
      case PickerLevelType.First:
      default:
        levelData = this.firstLevelData;
    }

    let index = Math.floor((y + 17) / 33);
    if (index < 0) index = 0;
    if (index >= levelData.length) index = levelData.length - 1;
    return levelData[index];
  }

}
