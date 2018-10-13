import { TestBed } from '@angular/core/testing';

import { QrManagementService } from './qr-management.service';

describe('QrManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrManagementService = TestBed.get(QrManagementService);
    expect(service).toBeTruthy();
  });
});
