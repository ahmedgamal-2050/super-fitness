/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sf-wheel',
  templateUrl: './sf-wheel.component.html',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SfWheelComponent),
      multi: true,
    },
  ],
})
export class SfWheelComponent implements ControlValueAccessor, OnInit {
  min = input(10);
  max = input(60);
  initialValue = input<number | null>(null);
  quantity = input<string | null>('Year');

  items: number[] = [];
  selectedIndex = 0;
  isDragging = false;
  dragOffset = 0;

  private startX = 0;
  private pendingValue: number | null = null;

  readonly itemWidth = 52;
  readonly visibleRange = 3;

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChange = (_: number) => {};
  onTouched = () => {};

  get selectedValue(): number {
    return this.items[this.selectedIndex] ?? this.min();
  }

  ngOnInit(): void {
    this.items = Array.from(
      { length: this.max() - this.min() + 1 },
      (_, i) => this.min() + i
    );

    if (this.pendingValue !== null) {
      this.applyValue(this.pendingValue);
      this.pendingValue = null;
    } else {
      const iv = this.initialValue();
      if (iv !== null) this.applyValue(iv);
    }
  }

  isVisible(index: number): boolean {
    return Math.abs(index - this.selectedIndex) <= this.visibleRange;
  }

  isSelected(index: number): boolean {
    return index === this.selectedIndex;
  }

  getTransform(index: number): string {
    const diff = index - this.selectedIndex;
    const x = diff * this.itemWidth + this.dragOffset;
    const absD = Math.abs(diff);
    const scale = absD === 0 ? 1 : absD === 1 ? 0.78 : absD === 2 ? 0.62 : 0.5;

    return `translateX(${x}px) scale(${scale})`;
  }

  getOpacity(index: number): number {
    const absD = Math.abs(index - this.selectedIndex);

    return absD === 0 ? 1 : absD === 1 ? 0.55 : absD === 2 ? 0.3 : 0.15;
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    this.moveBy(Math.sign(event.deltaY));
  }

  onPointerDown(event: PointerEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    this.dragOffset = 0;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;

    this.dragOffset = event.clientX - this.startX;
  }

  onPointerUp(): void {
    if (!this.isDragging) return;

    this.isDragging = false;

    const steps = Math.round(-this.dragOffset / this.itemWidth);

    this.dragOffset = 0;
    this.moveBy(steps);
  }

  moveBy(delta: number): void {
    const next = Math.max(
      0,
      Math.min(this.items.length - 1, this.selectedIndex + delta)
    );

    if (next !== this.selectedIndex) {
      this.selectedIndex = next;
      this.onChange(this.selectedValue);
      this.onTouched();
    }
  }

  writeValue(value: number): void {
    if (this.items.length) {
      this.applyValue(value);
    } else {
      this.pendingValue = value;
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private applyValue(value: number): void {
    if (value == null) return;

    const index = this.items.indexOf(value);

    this.selectedIndex = index !== -1 ? index : 0;
  }
}
