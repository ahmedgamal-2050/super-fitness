import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelPicker } from './wheel-picker';

describe('WheelPicker', () => {
  let component: WheelPicker;
  let fixture: ComponentFixture<WheelPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WheelPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheelPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
