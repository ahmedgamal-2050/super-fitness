import { Component, output } from '@angular/core';
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
import { LucideAngularModule, Mars, Venus } from 'lucide-angular';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
@Component({
  selector: 'lib-gender-component',
  imports: [
    AuthMainHeader,
    AuthSecondHeader,
    LucideAngularModule,
    SfButtonComponent,
  ],
  templateUrl: './gender-component.html',
  styleUrl: './gender-component.css',
})
export class GenderComponent {
  gender: 'male' | 'female' | null = null;
  loginClicked = output<void>();
  readonly icons = { Venus, Mars };

  selectGender(value: 'male' | 'female') {
    this.gender = value;
  }
}
