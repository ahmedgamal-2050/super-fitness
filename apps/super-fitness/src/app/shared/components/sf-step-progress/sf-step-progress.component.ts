import { Component, Input, OnChanges } from '@angular/core';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sf-step-progress',
  templateUrl: './sf-step-progress.component.html',
  imports: [KnobModule, FormsModule],
})
export class SfStepProgressComponent implements OnChanges {
  @Input() current = 1;
  @Input() total = 6;

  value = 0;

  ngOnChanges(): void {
    this.value = Math.round((this.current / this.total) * 100);
  }
}
