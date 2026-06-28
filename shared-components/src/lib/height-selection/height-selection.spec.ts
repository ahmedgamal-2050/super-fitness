import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeightSelection } from './height-selection';

describe('HeightSelection', () => {
  let component: HeightSelection;
  let fixture: ComponentFixture<HeightSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeightSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeightSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
