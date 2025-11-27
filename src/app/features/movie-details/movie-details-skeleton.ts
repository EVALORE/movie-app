import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skeleton } from '../../shared/components/skeleton/skeleton';

@Component({
  selector: 'app-movie-details-skeleton',
  imports: [Skeleton],
  template: `
    <app-skeleton width="320px" height="500px" />
    <div class="p-2 w-100">
      <app-skeleton variant="text" width="23rem" height="1.5rem" />
      <app-skeleton variant="text" width="23rem" height="1.5rem" />
      <app-skeleton variant="text" width="23rem" height="1.5rem" />
      <app-skeleton variant="text" width="23rem" height="10rem" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex' },
})
export class MovieDetailsSkeleton {}
