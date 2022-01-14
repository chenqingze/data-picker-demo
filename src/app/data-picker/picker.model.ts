import {ElementRef} from "@angular/core";
import {Subject} from "rxjs";

// picker级别，例如省/市/县三级联动的第二级picker：市
export enum PickerLevelType {
  First = 1, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth
}

// picker model
export interface Picker<T> {
  title: string;  // 头部显示名称
  pickerContentRef: ElementRef; // 页面element引用
  data: Array<T>; //  渲染数据
  selectedObject: T; // 选中的值
  level: PickerLevelType; // picker级别，例如省/市/县三级联动的第二级picker：市
  scroll$: Subject<any>; // 用于订阅picker滑动事件
  displayAttributeName: string; // 组件内显示对象的属性名称
  childrenAttributeName: string; // 子节点属性名称
}
