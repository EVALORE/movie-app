import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsSkeleton } from './movie-details-skeleton';

describe('MovieDetailsSkeleton', () => {
  let component: MovieDetailsSkeleton;
  let fixture: ComponentFixture<MovieDetailsSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
