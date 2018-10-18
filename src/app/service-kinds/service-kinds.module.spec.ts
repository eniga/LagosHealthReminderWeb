import { ServiceKindsModule } from './service-kinds.module';

describe('ServiceKindsModule', () => {
  let serviceKindsModule: ServiceKindsModule;

  beforeEach(() => {
    serviceKindsModule = new ServiceKindsModule();
  });

  it('should create an instance', () => {
    expect(serviceKindsModule).toBeTruthy();
  });
});
