import { TestBed } from '@angular/core/testing';

import { MedicalServicesService } from './medical-services.service';

describe('MedicalServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicalServicesService = TestBed.get(MedicalServicesService);
    expect(service).toBeTruthy();
  });
});
