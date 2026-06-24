import { Component } from '@angular/core';
import { StepPersonalInfoComponent } from './steps/step-personal-info/step-personal-info.component';
import { ChooseGender } from './steps/choose-gender/choose-gender';
import { ChooseAge } from './steps/choose-age/choose-age';
import { ChooseWeight } from './steps/choose-weight/choose-weight';

@Component({
  selector: 'app-register',
  imports: [StepPersonalInfoComponent, ChooseGender, ChooseAge, ChooseWeight],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  showGender = false;
  showAge = false;
  showWeight = false;
}
