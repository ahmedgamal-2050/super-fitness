import { Component, computed, input, output, signal } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'lib-wheel-picker',
  standalone: true,
  templateUrl: './wheel-picker.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WheelPicker {
  // reusable inputs
  start = input<number>(18);
  end = input<number>(80);
  initialValue = input<number>(25);
  label = input<string>('Yea');

  changeOn = output<number>();

  // generate values dynamically
  values = computed(() =>
    Array.from(
      { length: this.end() - this.start() + 1 },
      (_, i) => this.start() + i
    )
  );

  active = signal(this.initialValue());

  onSlideChange(event: any) {
    const swiper = event.target.swiper;
    const value = this.values()[swiper.realIndex];

    this.active.set(value);
    this.changeOn.emit(value);
  }

  getClass(index: number) {
    const current = this.values().indexOf(this.active());
    const d = Math.abs(index - current);

    if (d === 0) {
      return 'text-[58px] text-orange-500 scale-100 opacity-100';
    }

    if (d === 1) {
      return 'text-[42px] text-white scale-95 opacity-100';
    }

    if (d === 2) {
      return 'text-[30px] text-white scale-90 opacity-70';
    }

    if (d === 3) {
      return 'text-[20px] text-white scale-75 opacity-40';
    }

    return 'text-[16px] text-white scale-50 opacity-10';
  }
}

/*
create reusable whealed rigister picker
create gander section in register as reusable component
create age section in register as reusable component
create weight section in register as reusable component
headers in auth as reusable components
all in shared components liberary
*/
