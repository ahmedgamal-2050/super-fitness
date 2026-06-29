import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  viewChild,
  effect,
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
  slidesPerView = input<number>(4);
  spaceBetween = input<number>(20);

  swiperRef = viewChild<ElementRef>('swiper');

  constructor() {
    effect(() => {
      const swiper = this.swiperRef()?.nativeElement;
      if (!swiper) return;

      Object.assign(swiper, {
        slidesPerView: this.slidesPerView(),
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
      width: 70% !important;
      margin-left: auto !important;
      margin-right: auto !important;
      padding-bottom: 60px !important;
    }

    .swiper-pagination-bullet {
      width: 11px !important;
      height: 11px !important;
      background: #1f2937 !important;
      opacity: 1 !important;
      transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      width: 70px !important;
      height: 11px !important;
      border-radius: 999px !important;
      background: #f97316 !important;
    }

    .swiper-pagination {
      bottom: 20px !important;
    }
    `,
        ],

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });

      swiper.initialize();
    });
  }
}
