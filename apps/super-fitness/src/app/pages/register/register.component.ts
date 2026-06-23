import { Component } from '@angular/core';
import { StepPersonalInfoComponent } from './steps/step-personal-info/step-personal-info.component';

@Component({
  selector: 'app-register',
  imports: [StepPersonalInfoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
