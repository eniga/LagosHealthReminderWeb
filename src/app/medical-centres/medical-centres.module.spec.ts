import { MedicalCentresModule } from './medical-centres.module';

describe('MedicalCentresModule', () => {
  let medicalCentresModule: MedicalCentresModule;

  beforeEach(() => {
    medicalCentresModule = new MedicalCentresModule();
  });

  it('should create an instance', () => {
    expect(medicalCentresModule).toBeTruthy();
  });
});
