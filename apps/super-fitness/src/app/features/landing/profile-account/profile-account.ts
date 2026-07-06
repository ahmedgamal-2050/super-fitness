import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  LucideRefreshCw,
  LucideGlobe,
  LucideSunMoon,
  LucideShield,
  LucideShieldCheck,
  LucideLifeBuoy,
  LucideLogOut,
} from '@lucide/angular';
import { ProfileColumn } from './components/profile-column/profile-column';
import { ProfileActionCard } from './components/profile-action-card/profile-action-card';

@Component({
  selector: 'app-profile-account',
  imports: [
    TranslocoPipe,
    LucideRefreshCw,
    LucideGlobe,
    LucideSunMoon,
    LucideShield,
    LucideShieldCheck,
    LucideLifeBuoy,
    LucideLogOut,
    ProfileColumn,
    ProfileActionCard,
  ],
  templateUrl: './profile-account.html',
})
export class ProfileAccount {
  isDarkTheme = signal<boolean>(false);

  changeGoal() {
    console.log('Change Goal clicked');
  }

  changeLevel() {
    console.log('Change Level clicked');
  }

  changeWeight() {
    console.log('Change Weight clicked');
  }

  changePassword() {
    console.log('Change Password clicked');
  }

  selectLanguage() {
    console.log('Select Language clicked');
  }

  toggleTheme() {
    console.log('Select Theme clicked');
  }

  viewSecurity() {
    console.log('View Security clicked');
  }

  viewPrivacyPolicy() {
    console.log('View Privacy Policy clicked');
  }

  getHelp() {
    console.log('Get Help clicked');
  }

  logout() {
    console.log('Logout clicked');
  }
}
