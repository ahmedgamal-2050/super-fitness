import { Component, effect, input, model, output } from '@angular/core';
import { CategoryFilter } from '../../../home/services/meal/pages/category-filter/category-filter';
import { DifficultyLevel, Exercise, Muscle } from '../../../home/home.model';

@Component({
  selector: 'app-class-list',
  imports: [CategoryFilter],
  templateUrl: './class-list.html',
  styleUrl: './class-list.css',
})
export class ClassList {
  constructor() {
    effect(() => {
      const levels = this.levels();

      if (levels.length) {
        this.activeLevel.set(levels[0].id);
        this.levelSelected.emit(levels[0].id);
      }
    });
  }

  levels = input.required<DifficultyLevel[]>();
  muscles = input.required<Muscle[]>();
  exercises = input.required<Exercise[]>();

  muscleSelected = output<string>();
  levelSelected = output<string>();
  exerciseSelected = output<Exercise>();

  activeLevel = model('');
}
