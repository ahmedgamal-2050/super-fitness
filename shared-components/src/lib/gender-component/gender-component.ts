import { Component } from '@angular/core';
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
import { LucideAngularModule ,Mars , Venus  } from 'lucide-angular'
@Component({
  selector: 'lib-gender-component',
  imports: [AuthMainHeader, AuthSecondHeader , LucideAngularModule],
  templateUrl: './gender-component.html',
  styleUrl: './gender-component.css',
})
export class GenderComponent {
  gender: 'male' | 'female' | null = null;

  readonly icons = { Venus, Mars };

  selectGender(value: 'male' | 'female') {
    this.gender = value;
  }
}
