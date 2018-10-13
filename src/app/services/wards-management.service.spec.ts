import { TestBed } from '@angular/core/testing';

import { WardsManagementService } from './wards-management.service';

describe('WardsManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WardsManagementService = TestBed.get(WardsManagementService);
    expect(service).toBeTruthy();
  });
});
