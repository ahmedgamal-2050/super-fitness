import {
  Component,
  signal,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  DestroyRef,
  input,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CustomCarousel, CustomCarouselTabs } from '@org/shared-components';
import { Button } from '../../../../../shared/components/button/button';
import { LandingSectionTitle } from '../../../../../shared/components/landing-section-title/landing-section-title';
import { MuscleService } from '../../services/muscle/muscle.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Muscle,
  MuscleGroup,
  MuscleGroupResponse,
  MuscleListResponse,
} from '../../home.model';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-workouts',
  standalone: true,
  imports: [TranslocoPipe, Button, LandingSectionTitle, CustomCarousel, CustomCarouselTabs],
  templateUrl: './upcoming-workouts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingWorkoutsComponent implements OnInit {
  readonly muscleService = inject(MuscleService);
  readonly destroyRef = inject(DestroyRef);
  readonly router = inject(Router);
  carouselRows = input<number>(1);

  categories = signal<MuscleGroup[]>([]);
  muscleList = signal<Muscle[]>([]);
  selectedCategoryId = signal<string>('');
  ngOnInit(): void {
    this.getInitMusclesList();
  }

  goToWorkout = (muscle: Muscle) => {
    console.log('clicked', muscle);

    this.router.navigate([
      '/landing',
      'class-details',
      this.selectedCategoryId(),
      muscle._id,
    ]);
  };
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
      });
  }

  selectCategory(catId: string) {
    this.getMusclesListByGroupId(catId);
  }

  getMusclesListByGroupId(groupId: string) {
    this.muscleService
      .getMusclesListByGroupId(groupId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: MuscleListResponse) => {
        this.selectedCategoryId.set(res.muscleGroup._id);
        this.muscleList.set(res.muscles);
      });
  }
}
