import { TestBed } from '@angular/core/testing';

import { SearchParams } from './search-params.service';

describe('Search', () => {
  let service: SearchParams;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchParams);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
