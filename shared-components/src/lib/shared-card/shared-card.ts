import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'lib-shared-card',
  imports: [ButtonModule, CardModule, NgTemplateOutlet],
  templateUrl: './shared-card.html',
  styleUrl: './shared-card.css',
})
export class SharedCard {
  cardTitle = input<string>();
  cardImage = input<string>();
  clicked = output<void>();
  cardButton = input<TemplateRef<unknown> | null>(null);
}
