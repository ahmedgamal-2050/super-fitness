import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-profile-action-card',
  templateUrl: './profile-action-card.html',
})
export class ProfileActionCard {
  label = input.required<string>();
  subLabel = input<string>();
  isDestructive = input<boolean>(false);
  isToggle = input<boolean>(false);
  toggleValue = input<boolean>(false);

  cardClick = output<void>();
  toggleChange = output<boolean>();

  onCardClick() {
    if (this.isToggle()) {
      this.toggleChange.emit(!this.toggleValue());
    } else {
      this.cardClick.emit();
    }
  }
}
