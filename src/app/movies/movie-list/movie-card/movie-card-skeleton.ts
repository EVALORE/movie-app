import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skeleton } from '../../../shared/ui/skeleton';

@Component({
  selector: 'app-movie-card-skeleton',
  imports: [Skeleton],
  template: `
    <app-skeleton variant="rectangular" width="200px" height="300px" />
    <div class="p-2 w-100">
      <app-skeleton variant="text" width="23rem" height="1.5rem" />
      <app-skeleton variant="rectangular" width="23rem" height="5rem" />
    </div>
  `,
  host: {
    class:
      'flex border border-slate-700 dark:border-slate-300 shadow-md rounded-lg w-max overflow-hidden',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardSkeleton {}
