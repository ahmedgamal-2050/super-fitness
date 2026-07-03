import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-option-item',
  imports: [CommonModule],
  templateUrl: './option-item.html',
  styleUrl: './option-item.css',
})
export class OptionItem {
  label = input.required<string>();
  selected = input<boolean>(false);
}
