import { QrManagementModule } from './qr-management.module';

describe('QrManagementModule', () => {
  let qrManagementModule: QrManagementModule;

  beforeEach(() => {
    qrManagementModule = new QrManagementModule();
  });

  it('should create an instance', () => {
    expect(qrManagementModule).toBeTruthy();
  });
});
