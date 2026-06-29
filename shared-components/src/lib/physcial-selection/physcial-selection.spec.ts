import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyscialSelection } from './physcial-selection';

describe('PhyscialSelection', () => {
  let component: PhyscialSelection;
  let fixture: ComponentFixture<PhyscialSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhyscialSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhyscialSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
