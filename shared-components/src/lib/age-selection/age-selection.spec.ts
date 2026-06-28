import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeSelection } from './age-selection';

describe('AgeSelection', () => {
  let component: AgeSelection;
  let fixture: ComponentFixture<AgeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
