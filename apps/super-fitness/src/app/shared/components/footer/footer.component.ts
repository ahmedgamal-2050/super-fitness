import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideMail, LucidePhone } from '@lucide/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoPipe, LucidePhone, LucideMail],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
