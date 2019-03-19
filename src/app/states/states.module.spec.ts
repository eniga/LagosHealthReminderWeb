import { StatesModule } from './states.module';

describe('StatesModule', () => {
  let statesModule: StatesModule;

  beforeEach(() => {
    statesModule = new StatesModule();
  });

  it('should create an instance', () => {
    expect(statesModule).toBeTruthy();
  });
});
