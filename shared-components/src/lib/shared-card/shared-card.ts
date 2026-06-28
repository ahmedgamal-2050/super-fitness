import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'lib-shared-card',
  imports: [ButtonModule, CardModule],
  templateUrl: './shared-card.html',
  styleUrl: './shared-card.css',
})
export class SharedCard {
  cardTitle = input<string>();
  cardImage = input<string>();
}
