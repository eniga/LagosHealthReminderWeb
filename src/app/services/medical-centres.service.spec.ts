import { TestBed } from '@angular/core/testing';

import { MedicalCentresService } from './medical-centres.service';

describe('MedicalCentresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicalCentresService = TestBed.get(MedicalCentresService);
    expect(service).toBeTruthy();
  });
});
