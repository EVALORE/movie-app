import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';

@Component({
  selector: 'app-movie-card-skeleton',
  imports: [Skeleton],
  templateUrl: './movie-card-skeleton.html',
  styleUrl: './movie-card-skeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardSkeleton {}
