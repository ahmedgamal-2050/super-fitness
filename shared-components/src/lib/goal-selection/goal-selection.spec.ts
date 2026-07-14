import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSelection } from './goal-selection';

describe('GoalSelection', () => {
  let component: GoalSelection;
  let fixture: ComponentFixture<GoalSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
