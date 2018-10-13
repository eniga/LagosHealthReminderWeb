import { WardsManagementModule } from './wards-management.module';

describe('WardsManagementModule', () => {
  let wardsManagementModule: WardsManagementModule;

  beforeEach(() => {
    wardsManagementModule = new WardsManagementModule();
  });

  it('should create an instance', () => {
    expect(wardsManagementModule).toBeTruthy();
  });
});
