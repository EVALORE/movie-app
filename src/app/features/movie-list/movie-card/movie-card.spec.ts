import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCard } from './movie-card';
import { Movie } from '../../../core/api/responses';

describe('MovieCard', () => {
  let component: MovieCard;
  let fixture: ComponentFixture<MovieCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCard);
    component = fixture.componentInstance;

    const mockMovie: Movie = {
      // eslint-disable-next-line camelcase
      poster_path: '/test-poster.jpg',
      title: 'Test Movie',
      overview: 'This is a test movie overview',
    };
    fixture.componentRef.setInput('movieInformation', mockMovie);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
