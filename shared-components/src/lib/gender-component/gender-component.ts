import { Component, Input, OnInit, output } from '@angular/core';
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
export class GenderComponent implements OnInit {
  @Input() savedGender: 'male' | 'female' | null = null;

  gender: 'male' | 'female' | null = null;
  loginClicked = output<'male' | 'female'>();
  backClicked = output<void>();
  readonly icons = { Venus, Mars };

  ngOnInit() {
    if (this.savedGender) {
      this.gender = this.savedGender;
    }
  }

  selectGender(value: 'male' | 'female') {
    this.gender = value;
  }
}
