import { Component, Input, OnInit, output, signal } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfStepProgressComponent } from 'apps/super-fitness/src/app/shared/components/sf-step-progress/sf-step-progress.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { OptionItem } from '../../../../apps/super-fitness/src/app/shared/components/option-item/option-item';

@Component({
  selector: 'lib-physcial-selection',
  imports: [
    SfButtonComponent,
    AuthMainHeader,
    AuthSecondHeader,
    SfStepProgressComponent,
    OptionItem,
  ],
  templateUrl: './physcial-selection.html',
  styleUrl: './physcial-selection.css',
})
export class PhyscialSelection implements OnInit {
  @Input() savedPhysical: string | null = null;

  nextClicked = output<string>();
  backClicked = output<void>();

  physicals = ['Rookie', 'Beginner', 'Intermediate', 'Advance', 'True Beast'];

  selectedPhyscial = signal<string | null>(null);

  ngOnInit() {
    if (this.savedPhysical) {
      this.selectedPhyscial.set(this.savedPhysical);
    }
  }

  selectPhyscial(physical: string) {
    this.selectedPhyscial.set(physical);
  }
}
