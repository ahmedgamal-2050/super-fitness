import { Component } from '@angular/core';
import { StepPersonalInfoComponent } from './steps/step-personal-info/step-personal-info.component';
import { ChooseGender } from './steps/choose-gender/choose-gender';

@Component({
  selector: 'app-register',
  imports: [StepPersonalInfoComponent, ChooseGender],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  showGender = false;
}
