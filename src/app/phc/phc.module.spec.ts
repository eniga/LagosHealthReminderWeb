import { PhcModule } from './phc.module';

describe('PhcModule', () => {
  let phcModule: PhcModule;

  beforeEach(() => {
    phcModule = new PhcModule();
  });

  it('should create an instance', () => {
    expect(phcModule).toBeTruthy();
  });
});
