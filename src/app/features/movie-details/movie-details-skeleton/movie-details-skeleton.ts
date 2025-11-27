import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';

@Component({
  selector: 'app-movie-details-skeleton',
  imports: [Skeleton],
  templateUrl: './movie-details-skeleton.html',
  styleUrl: './movie-details-skeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsSkeleton {}
