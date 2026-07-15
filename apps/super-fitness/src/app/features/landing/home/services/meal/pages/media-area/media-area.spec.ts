import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaArea } from './media-area';

describe('MediaArea', () => {
  let component: MediaArea;
  let fixture: ComponentFixture<MediaArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
