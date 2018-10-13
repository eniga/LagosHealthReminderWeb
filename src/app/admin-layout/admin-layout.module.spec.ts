import { AdminLayoutModule } from './admin-layout.module';

describe('AdminLayoutModule', () => {
  let adminLayoutModule: AdminLayoutModule;

  beforeEach(() => {
    adminLayoutModule = new AdminLayoutModule();
  });

  it('should create an instance', () => {
    expect(adminLayoutModule).toBeTruthy();
  });
});
