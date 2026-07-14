import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionItem } from './option-item';

describe('OptionItem', () => {
  let component: OptionItem;
  let fixture: ComponentFixture<OptionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionItem],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionItem);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
