import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCard } from './shared-card';

describe('SharedCard', () => {
  let component: SharedCard;
  let fixture: ComponentFixture<SharedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
