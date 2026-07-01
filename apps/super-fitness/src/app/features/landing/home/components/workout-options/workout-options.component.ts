import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideArrowUpRight } from '@lucide/angular';
import { Button } from '../../../../../shared/components/button/button';
import { LandingSectionTitle } from '../../../../../shared/components/landing-section-title/landing-section-title';

@Component({
  selector: 'app-workout-options',
  standalone: true,
  imports: [TranslocoPipe, LucideArrowUpRight, Button, LandingSectionTitle],
  templateUrl: './workout-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutOptionsComponent {
  features = signal([
    {
      id: 1,
      title: 'landing_page_services_section_feature_plans_title_text',
      description: 'landing_page_services_section_feature_plans_desc_text',
    },
    {
      id: 2,
      title: 'landing_page_services_section_feature_coaching_title_text',
      description: 'landing_page_services_section_feature_coaching_desc_text',
    },
    {
      id: 3,
      title: 'landing_page_services_section_feature_equip_title_text',
      description: 'landing_page_services_section_feature_equip_desc_text',
    },
    {
      id: 4,
      title: 'landing_page_services_section_feature_nutrition_title_text',
      description: 'landing_page_services_section_feature_nutrition_desc_text',
    },
  ]);
}
