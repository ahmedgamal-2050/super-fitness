import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideSparkle } from '@lucide/angular';

@Component({
  selector: 'app-scrolling-marquee-banner',
  imports: [NgTemplateOutlet, TranslocoPipe, LucideSparkle],
  templateUrl: './scrolling-marquee-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollingMarqueeBanner {}
