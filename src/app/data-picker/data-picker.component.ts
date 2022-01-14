import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, Subject} from "rxjs";
import {PickerLevelType} from "./picker.model";
import {data} from "../city.data";


@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss']
})
export class DataPickerComponent implements OnInit {

  @Input() displayAttributeName: string = ''; // 组件内显示对象的属性名称
  @Input() childrenAttributeName: string = ''; // 子节点属性名称
  @Input() title: string = '';
  @Input() data: Array<any> = [];//  渲染数据
  @Output() pickerEvent = new EventEmitter();
  @ViewChild('pickerContent') pickerContentRef!: ElementRef;// 页面element引用
  selectedObject: any | undefined; // 选中的值
  level: PickerLevelType | undefined; // picker级别，例如省/市/县三级联动的第二级picker：市
  scroll$: Subject<any>; // 用于订阅picker滑动事件

  constructor() {
    this.scroll$ = new Subject<any>();
    this.data = data;
    this.selectedObject = this.data[0];
  }

  ngOnInit(): void {
    this.scroll$.asObservable().pipe(
      debounceTime(100)
    ).subscribe((v) => {
      let index = this.data.indexOf(v);
      this.pickerContentRef.nativeElement.scrollTo({
        top: index * 33,
        behavior: 'smooth'
      });
    });
  }

  /**
   * 准确显示到选中样式
   * @param index
   * @param event
   */
  scrollTo(index: number, event: any) {
    this.pickerContentRef.nativeElement.scrollTo({
      top: index * 33,
      behavior: 'smooth'
    });
  }

  /**
   * 监听滚动事件
   * @param event
   */
  @HostListener("window:scroll", ['$event'])
  handleLevelScroll(event: any) {
    console.log("scroll:", event.target.scrollTop);
    this.selectedObject = this.getValueByPosition(event.target.scrollTop);
    this.scroll$.next(this.selectedObject);
  }

  /**
   * 获取选中值的位置
   * @param y
   * @private
   */
  private getValueByPosition(y: number) {
    let index = Math.floor((y + 17) / 33);
    if (index < 0) index = 0;
    if (index >= this.data.length) index = this.data.length - 1;
    return this.data[index];
  }

}
