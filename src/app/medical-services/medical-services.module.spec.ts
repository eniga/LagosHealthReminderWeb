import { MedicalServicesModule } from './medical-services.module';

describe('MedicalServicesModule', () => {
  let medicalServicesModule: MedicalServicesModule;

  beforeEach(() => {
    medicalServicesModule = new MedicalServicesModule();
  });

  it('should create an instance', () => {
    expect(medicalServicesModule).toBeTruthy();
  });
});
