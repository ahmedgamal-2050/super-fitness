import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingSectionTitle } from '../../../../../shared/components/landing-section-title/landing-section-title';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-healthy-wrapper',
  imports: [TranslocoPipe, LandingSectionTitle],
  templateUrl: './healthy-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthyWrapper {}
