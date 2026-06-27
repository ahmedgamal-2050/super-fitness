import { Component } from '@angular/core';
import { WheelPicker } from '../wheel-picker/wheel-picker';
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
@Component({
  selector: 'lib-age-selection',
  imports: [WheelPicker, AuthMainHeader, AuthSecondHeader],
  templateUrl: './age-selection.html',
  styleUrl: './age-selection.css',
})
export class AgeSelection {}
