import { Component, input, output } from '@angular/core';
import { LucideRefreshCw } from '@lucide/angular';

@Component({
  selector: 'app-profile-column',
  imports: [LucideRefreshCw],
  templateUrl: './profile-column.html',
})
export class ProfileColumn {
  title = input.required<string>();
  actionText = input<string>('Tap to change');
  value = input.required<string>();

  action = output<void>();

  onAction() {
    this.action.emit();
  }
}
