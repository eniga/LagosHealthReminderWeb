import { LgasManagementModule } from './lgas-management.module';

describe('LgasManagementModule', () => {
  let lgasManagementModule: LgasManagementModule;

  beforeEach(() => {
    lgasManagementModule = new LgasManagementModule();
  });

  it('should create an instance', () => {
    expect(lgasManagementModule).toBeTruthy();
  });
});
