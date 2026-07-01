import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LandingSectionTitle } from '../../../../../shared/components/landing-section-title/landing-section-title';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [TranslocoPipe, LandingSectionTitle],
  templateUrl: './why-us.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./why-us.component.css']
})
export class WhyUsComponent {
  whyUsFeatures = signal([
    {
      id: '01',
      title: 'landing_page_why_us_section_point1_title_text',
      description: 'landing_page_why_us_section_point1_desc_text',
    },
    {
      id: '02',
      title: 'landing_page_why_us_section_point2_title_text',
      description: 'landing_page_why_us_section_point2_desc_text',
    },
    {
      id: '03',
      title: 'landing_page_why_us_section_point3_title_text',
      description: 'landing_page_why_us_section_point3_desc_text',
    },
  ]);
}
