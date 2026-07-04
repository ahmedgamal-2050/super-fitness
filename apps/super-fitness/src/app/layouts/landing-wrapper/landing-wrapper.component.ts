import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-landing-wrapper',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './landing-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingWrapperComponent {}
