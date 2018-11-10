import { TestBed } from '@angular/core/testing';

import { PhcService } from './phc.service';

describe('PhcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhcService = TestBed.get(PhcService);
    expect(service).toBeTruthy();
  });
});
