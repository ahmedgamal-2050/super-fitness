import {
  Component,
  DestroyRef,
  inject,
  input,
  signal,
  TemplateRef,
} from '@angular/core';
import { MediaArea } from '../../../home/services/meal/pages/media-area/media-area';
import { SharedCard } from '@org/shared-components';
import { MuscleService } from '../../../home/services/muscle/muscle.service';
import {
  DifficultyLevel,
  Exercise,
  Meal,
  MealListApiResponse,
  Muscle,
  MuscleGroup,
  MuscleGroupResponse,
  MuscleListResponse,
} from '../../../home/home.model';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClassList } from '../class-list/class-list';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../../home/services/meal/meal.service';

@Component({
  selector: 'app-class-details',
  imports: [MediaArea, SharedCard, ClassList],
  templateUrl: './class-details.html',
  styleUrl: './class-details.css',
})
export class ClassDetails {
  readonly muscleService = inject(MuscleService);
  readonly mealService = inject(MealService);
  mealList = signal<Meal[]>([]);
  categories = signal<MuscleGroup[]>([]);
  muscleList = signal<Muscle[]>([]);
  selectedCategoryId = signal<string>('');
  readonly destroyRef = inject(DestroyRef);
  levels = signal<DifficultyLevel[]>([]);
  selectedMuscleId = signal('');
  selectedLevelId = signal('');
  exercises = signal<Exercise[]>([]);
  readonly route = inject(ActivatedRoute);
  cardButton = input<TemplateRef<unknown> | null>(null);
  items = input<any[]>([]);
  onCardClick = input<(item: any) => void>();
  selectedExercise = signal<Exercise | null>(null);
  selectMuscle(muscleId: string) {
    console.log('Selected muscle:', muscleId);

    this.selectedMuscleId.set(muscleId);

    this.muscleService
      .getLevelsByMoverMusclesGroupId(muscleId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        console.log('Levels:', res);

        this.levels.set(res.difficulty_levels);

        if (res.difficulty_levels.length) {
          this.selectLevel(res.difficulty_levels[0].id);
        }
      });
  }

  selectLevel(levelId: string) {
    this.selectedLevelId.set(levelId);

    this.muscleService
      .getExercisesByMuscleAndDifficulty(this.selectedMuscleId(), levelId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.exercises.set(res.exercises);

        if (res.exercises.length) {
          this.selectedExercise.set(res.exercises[0]);
        }
      });
  }

  selectExercise(exercise: Exercise) {
    this.selectedExercise.set(exercise);
  }

  getMealListByCategoryName() {
    this.mealService
      .getMealListByCategoryName('Beef')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: MealListApiResponse) => {
        this.mealList.set(
          res.meals.slice(2, 5).map(meal => ({
            _id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            area: meal.strArea ?? '',
            country: meal.strCountry ?? '',
          }))
        );
      });
  }

  selectCategory(catId: string) {
    this.getMusclesListByGroupId(catId);
  }

  getMusclesListByGroupId(groupId: string, selectedMuscleId?: string) {
    this.muscleService
      .getMusclesListByGroupId(groupId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: MuscleListResponse) => {
        this.selectedCategoryId.set(res.muscleGroup._id);
        this.muscleList.set(res.muscles);

        this.levels.set([]);
        this.exercises.set([]);

        const muscle =
          res.muscles.find(m => m._id === selectedMuscleId) ?? res.muscles[0];

        if (muscle) {
          this.selectMuscle(muscle._id);
        }
      });
  }

  getInitMusclesList() {
    this.muscleService
      .getMusclesGroups()
      .pipe(
        switchMap((res: MuscleGroupResponse) => {
          this.categories.set(res.musclesGroup);

          return this.muscleService.getMusclesListByGroupId(
            res.musclesGroup[0]._id
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: MuscleListResponse) => {
        this.selectedCategoryId.set(res.muscleGroup._id);
        this.muscleList.set(res.muscles);

        if (res.muscles.length) {
          this.selectMuscle(res.muscles[0]._id);
        }
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const groupId = params['groupId'];
      const muscleId = params['muscleId'];

      if (groupId && muscleId) {
        this.getMusclesListByGroupId(groupId, muscleId);
      }
      this.getInitMusclesList();
      this.getMealListByCategoryName();
    });
  }
}
