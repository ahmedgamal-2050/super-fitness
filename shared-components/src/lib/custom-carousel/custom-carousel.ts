import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  viewChild,
  effect,
  TemplateRef,
} from '@angular/core';
import { SharedCard } from '../shared-card/shared-card';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'lib-custom-carousel',
  standalone: true,
  imports: [SharedCard],
  templateUrl: './custom-carousel.html',
  styleUrl: './custom-carousel.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomCarousel {
  items = input<any[]>([]);
  rows = input<number>(1);
  slidesPerView = input<number>(3);
  spaceBetween = input<number>(20);
  cardButton = input<TemplateRef<unknown> | null>(null);
  breakpoints = input<any | null>(null);

  swiperRef = viewChild<ElementRef>('swiper');

  constructor() {
    effect(() => {
      const swiper = this.swiperRef()?.nativeElement;
      if (!swiper) return;

      const defaultBreakpoints = {
        400: {
          slidesPerView: Math.max(1, this.slidesPerView() - 2),
        },
        880: {
          slidesPerView: Math.max(1, this.slidesPerView() - 1),
        },
        1400: {
          slidesPerView: this.slidesPerView(),
        },
      };

      Object.assign(swiper, {
        slidesPerView: 1,
        spaceBetween: this.spaceBetween(),

        grid: {
          rows: this.rows(),
          fill: 'row',
        },

        pagination: {
          clickable: true,
        },
        injectStyles: [
          `
    .swiper {
      width: 100% !important;
      margin-inline: auto !important;
      padding-bottom: 3.5rem !important;
    }

    .swiper-pagination-bullet {
      width: 0.625rem !important;
      height: 0.625rem !important;
      background: var(--color-dark) !important;
      opacity: 1 !important;
      transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      width: 1.875rem !important;
      height: 0.625rem !important;
      border-radius: 10rem !important;
      background: var(--color-main) !important;
    }

    .swiper-pagination {
      bottom: 0.5rem !important;
    }
    `,
        ],
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: this.breakpoints() || defaultBreakpoints,
      });

      swiper.initialize();
    });
  }
}
