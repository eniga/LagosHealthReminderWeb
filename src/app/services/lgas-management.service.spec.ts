import { TestBed } from '@angular/core/testing';

import { LgasManagementService } from './lgas-management.service';

describe('LgasManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LgasManagementService = TestBed.get(LgasManagementService);
    expect(service).toBeTruthy();
  });
});
