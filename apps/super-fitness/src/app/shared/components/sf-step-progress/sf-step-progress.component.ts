import { Component, Input } from '@angular/core';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sf-step-progress',
  templateUrl: './sf-step-progress.component.html',
  imports: [KnobModule, FormsModule],
})
export class SfStepProgressComponent {
  @Input() current = 1;
  @Input() total = 6;
}
