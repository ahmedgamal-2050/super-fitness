import { Component } from '@angular/core';
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';

@Component({
  selector: 'lib-gender-component',
  imports: [AuthMainHeader, AuthSecondHeader],
  templateUrl: './gender-component.html',
  styleUrl: './gender-component.css',
})
export class GenderComponent {
  gender: 'male' | 'female' | null = null;

  selectGender(value: 'male' | 'female') {
    this.gender = value;
  }
}
