import { TestBed } from '@angular/core/testing';

import { CorrectRouteService } from './correct-route.service';

describe('CorrectRouteService', () => {
  let service: CorrectRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrectRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
