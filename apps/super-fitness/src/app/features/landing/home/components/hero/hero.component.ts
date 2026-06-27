import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from '../../../../../shared/components/button/button';
import { ScrollingMarqueeBanner } from '../../../../../shared/components/scrolling-marquee-banner/scrolling-marquee-banner';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslocoPipe, Button, ScrollingMarqueeBanner],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  counterList = signal([
    {
      label: 'landing_page_hero_section_stat_members_count_text',
      value: 'landing_page_hero_section_stat_members_label_text',
    },
    {
      label: 'landing_page_hero_section_stat_trainers_count_text',
      value: 'landing_page_hero_section_stat_trainers_label_text',
    },
    {
      label: 'landing_page_hero_section_stat_programs_count_text',
      value: 'landing_page_hero_section_stat_programs_label_text',
    },
  ]);
}
