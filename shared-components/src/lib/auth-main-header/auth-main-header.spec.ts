import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMainHeader } from './auth-main-header';

describe('AuthMainHeader', () => {
  let component: AuthMainHeader;
  let fixture: ComponentFixture<AuthMainHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthMainHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthMainHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
