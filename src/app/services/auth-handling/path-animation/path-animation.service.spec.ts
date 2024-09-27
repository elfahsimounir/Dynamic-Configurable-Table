import { TestBed } from '@angular/core/testing';

import { PathAnimationService } from './path-animation.service';

describe('PathAnimationService', () => {
  let service: PathAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
