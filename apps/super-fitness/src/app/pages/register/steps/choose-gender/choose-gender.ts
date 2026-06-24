/* eslint-disable @nx/enforce-module-boundaries */
import { Component, output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';

@Component({
  selector: 'app-choose-gender',
  imports: [NgStyle, SfButtonComponent],
  templateUrl: './choose-gender.html',
})
export class ChooseGender {
  selectedGender: 'male' | 'female' | null = null;
  loginClicked = output<void>();
  selectGender(gender: 'male' | 'female'): void {
    this.selectedGender = gender;
  }
}
