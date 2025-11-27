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
      poster_path: '/test-poster.jpg',
      title: 'Test Movie',
      overview: 'This is a test movie overview',
      release_date: '2024-03-04',
      id: '1243',
      genres: [{ id: 354, name: 'thriller' }],
      vote_average: 8.5,
    };
    fixture.componentRef.setInput('movieInformation', mockMovie);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
