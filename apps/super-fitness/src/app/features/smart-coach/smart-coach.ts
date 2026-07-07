import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Bot, LucideAngularModule } from 'lucide-angular';
import { SmartCoachService } from './data-access/services/smart-coach.service';
import { SmartCoachPanel } from './components/smart-coach-panel/smart-coach-panel';

@Component({
  selector: 'app-smart-coach',
  imports: [TranslocoPipe, LucideAngularModule, SmartCoachPanel],
  templateUrl: './smart-coach.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartCoach {
  private readonly chatService = inject(SmartCoachService);

  isOpen = signal(false);
  icons = { Bot };

  toggle(): void {
    this.isOpen.update(open => !open);
    if (this.isOpen()) {
      this.chatService.ensureGreeted();
    }
  }
}
