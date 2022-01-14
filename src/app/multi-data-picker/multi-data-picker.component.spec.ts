import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiDataPickerComponent} from './multi-data-picker.component';

describe('MultiDataPickerComponent', () => {
  let component: MultiDataPickerComponent;
  let fixture: ComponentFixture<MultiDataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiDataPickerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
