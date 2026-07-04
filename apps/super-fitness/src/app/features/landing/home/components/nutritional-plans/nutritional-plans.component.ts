import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ScrollingMarqueeBanner } from '../../../../../shared/components/scrolling-marquee-banner/scrolling-marquee-banner';
import { LandingSectionTitle } from '../../../../../shared/components/landing-section-title/landing-section-title';
import { SharedCard } from '@org/shared-components';
import { Button } from '../../../../../shared/components/button/button';

interface MealPlan {
  titleKey: string;
  image: string;
}

@Component({
  selector: 'app-nutritional-plans',
  standalone: true,
  imports: [
    TranslocoPipe,
    ScrollingMarqueeBanner,
    LandingSectionTitle,
    SharedCard,
    Button,
  ],
  templateUrl: './nutritional-plans.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionalPlansComponent {
  plans: MealPlan[] = [
    {
      titleKey: 'landing_page_meals_section_card_breakfast_title_text',
      image: 'assets/images/meal-1.png',
    },
    {
      titleKey: 'landing_page_meals_section_card_lunch_title_text',
      image: 'assets/images/meal-2.png',
    },
    {
      titleKey: 'landing_page_meals_section_card_dinner_title_text',
      image: 'assets/images/meal-3.png',
    },
  ];
}
