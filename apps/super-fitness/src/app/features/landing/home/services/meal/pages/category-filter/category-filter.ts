import {
  Component,
  computed,
  EventEmitter,
  input,
  model,
  signal,
} from '@angular/core';
import { LucideAngularModule, ChevronRight, ChevronLeft } from 'lucide-angular';
import { MealCategoryApi } from '../../../../home.model';

@Component({
  selector: 'app-category-filter',
  imports: [LucideAngularModule],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css',
})
export class CategoryFilter {
  categories = input.required<MealCategoryApi[]>();
  activeItem = model('');

  startIndex = signal(0);
  readonly icons = [ChevronRight, ChevronLeft];

  visibleCategories = computed(() =>
    this.categories().slice(this.startIndex(), this.startIndex() + 3)
  );

  next() {
    if (this.startIndex() + 3 < this.categories().length) {
      this.startIndex.update(v => v + 1);
    }
  }

  previous() {
    if (this.startIndex() > 0) {
      this.startIndex.update(v => v - 1);
    }
  }

  select(category: string) {
    this.activeItem.set(category);
  }

  ngOnInit(): void {
    const categories = this.categories();

    if (categories.length) {
      this.activeItem.set(categories[0].strCategory);
    }
  }
}
