import { TestBed } from '@angular/core/testing';

import { ViewControleCookieService } from './view-controle-cookie.service';

describe('ViewControleCookieService', () => {
  let service: ViewControleCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewControleCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
