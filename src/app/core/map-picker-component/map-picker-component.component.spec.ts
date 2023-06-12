import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPickerComponentComponent } from './map-picker-component.component';

describe('MapPickerComponentComponent', () => {
  let component: MapPickerComponentComponent;
  let fixture: ComponentFixture<MapPickerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPickerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
