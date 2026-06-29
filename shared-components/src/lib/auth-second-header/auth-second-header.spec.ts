import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSecondHeader } from './auth-second-header';

describe('AuthSecondHeader', () => {
  let component: AuthSecondHeader;
  let fixture: ComponentFixture<AuthSecondHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSecondHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSecondHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
