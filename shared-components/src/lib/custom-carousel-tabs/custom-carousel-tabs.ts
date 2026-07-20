import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  output,
  viewChild,
  effect,
  signal,
  inject,
  DestroyRef,
} from '@angular/core';
import { delay, of } from 'rxjs';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'lib-custom-carousel-tabs',
  standalone: true,
  imports: [],
  templateUrl: './custom-carousel-tabs.html',
  styleUrl: './custom-carousel-tabs.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomCarouselTabs {
  readonly destroyRef = inject(DestroyRef);

  tabs = input<any[]>([]);
  activeTab = input<string | number>('');
  tabIdKey = input<string>('_id');
  tabLabelKey = input<string>('name');

  tabSelected = output<any>();

  swiperRef = viewChild<ElementRef>('swiper');

  showPrev = signal(false);
  showNext = signal(false);

  constructor() {
    effect(() => {
      const swiper = this.swiperRef()?.nativeElement;
      if (!swiper) return;

      Object.assign(swiper, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        freeMode: true,
        centerInsufficientSlides: true,
        injectStyles: [
          `
          .swiper {
            width: 100% !important;
            margin-inline: auto !important;
            padding-block: 0.5rem !important;
          }
          .swiper-slide {
            width: auto !important;
          }
          `,
        ],
      });

      swiper.initialize();

      // Delay checking since Swiper requires full initialization layout rendering
      of(null)
        .pipe(delay(100), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.showPrev.set(!swiper.isBeginning);
          this.showNext.set(!swiper.isEnd);
        });
    });
  }

  slidePrev(): void {
    const swiper = this.swiperRef()?.nativeElement?.swiper;
    if (swiper) {
      swiper.slidePrev();
      swiper.slidePrev();
      swiper.slidePrev();
      swiper.slidePrev();
      this.showPrev.set(!swiper.isBeginning);
      this.showNext.set(!swiper.isEnd);
    }
  }

  slideNext(): void {
    const swiper = this.swiperRef()?.nativeElement?.swiper;
    if (swiper) {
      swiper.slideNext();
      swiper.slideNext();
      swiper.slideNext();
      swiper.slideNext();
      this.showPrev.set(!swiper.isBeginning);
      this.showNext.set(!swiper.isEnd);
    }
  }

  isSelected(tab: any): boolean {
    const key = this.tabIdKey();
    return tab[key] === this.activeTab();
  }

  onTabClick(tab: any): void {
    this.tabSelected.emit(tab);
  }
}
