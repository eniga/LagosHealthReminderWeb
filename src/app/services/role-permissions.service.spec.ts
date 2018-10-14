import { TestBed } from '@angular/core/testing';

import { RolePermissionsService } from './role-permissions.service';

describe('RolePermissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolePermissionsService = TestBed.get(RolePermissionsService);
    expect(service).toBeTruthy();
  });
});
