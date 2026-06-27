import { Component } from '@angular/core';
import { WheelPicker } from '../wheel-picker/wheel-picker';
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
@Component({
  selector: 'lib-height-selection',
  imports: [WheelPicker, AuthMainHeader, AuthSecondHeader],
  templateUrl: './height-selection.html',
  styleUrl: './height-selection.css',
})
export class HeightSelection {}
