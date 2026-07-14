/* eslint-disable @nx/enforce-module-boundaries */
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StepPersonalInfoComponent } from '../../../../../../shared-components/src/lib/step-personal-info/step-personal-info.component';
import { GoalSelection } from '../../../../../../shared-components/src/lib/goal-selection/goal-selection';
import { PhyscialSelection } from '../../../../../../shared-components/src/lib/physcial-selection/physcial-selection';
import {
  AgeSelection,
  GenderComponent,
  HeightSelection,
  WightSelection,
} from '@org/shared-components';
import { AuthService } from '../../core/services/auth-service';
import { PersonalInfo, SignupPayload } from '../../core/models/auth.models';

const ACTIVITY_MAP: Record<string, string> = {
  Rookie: 'level1',
  Beginner: 'level2',
  Intermediate: 'level3',
  Advance: 'level4',
  'True Beast': 'level5',
};

@Component({
  selector: 'app-register',
  imports: [
    StepPersonalInfoComponent,
    GenderComponent,
    AgeSelection,
    WightSelection,
    HeightSelection,
    GoalSelection,
    PhyscialSelection,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Step visibility flags
  showGender = false;
  showAge = false;
  showWeight = false;
  showHeight = false;
  showGoal = false;
  showPhysical = false;

  // Saved values — restored when navigating back
  savedPersonalInfo: PersonalInfo | null = null;
  savedGender: 'male' | 'female' | null = null;
  savedAge = 30;
  savedWeight = 90;
  savedHeight = 180;
  savedGoal: string | null = null;
  savedPhysical: string | null = null;

  private registrationData: Partial<SignupPayload> = {};

  // Forward navigation — save data then advance

  onPhysical(physical: string): void {
    this.savedPhysical = physical;
    this.registrationData.activityLevel = ACTIVITY_MAP[physical];
    this.signup();
  }

  private signup(): void {
    this.authService.signup(this.registrationData as SignupPayload).subscribe({
      next: () => {
        this.router.navigate(['/landing/home']);
      },
      error: err => {
        console.error('Signup error', err);
      },
    });
  }

  // Back navigation
  stepNumber = 1;
  private next(): void {
    this.stepNumber++;
  }

  back(): void {
    if (this.stepNumber > 1) {
      this.stepNumber--;
    }
  }

  onPersonalInfo(data: PersonalInfo): void {
    this.savedPersonalInfo = data;
    this.registrationData = { ...this.registrationData, ...data };
    this.next();
  }

  onGender(gender: 'male' | 'female'): void {
    this.savedGender = gender;
    this.registrationData.gender = gender;
    this.next();
  }

  onAge(age: number): void {
    this.savedAge = age;
    this.registrationData.age = age;
    this.next();
  }

  onWeight(weight: number): void {
    this.savedWeight = weight;
    this.registrationData.weight = weight;
    this.next();
  }

  onHeight(height: number): void {
    this.savedHeight = height;
    this.registrationData.height = height;
    this.next();
  }

  onGoal(goal: string): void {
    this.savedGoal = goal;
    this.registrationData.goal = goal;
    this.next();
  }
}
