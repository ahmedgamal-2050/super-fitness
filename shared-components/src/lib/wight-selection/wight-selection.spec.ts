import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WightSelection } from './wight-selection';

describe('WightSelection', () => {
  let component: WightSelection;
  let fixture: ComponentFixture<WightSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WightSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WightSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
