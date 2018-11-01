import { UnprintedModule } from './unprinted.module';

describe('UnprintedModule', () => {
  let unprintedModule: UnprintedModule;

  beforeEach(() => {
    unprintedModule = new UnprintedModule();
  });

  it('should create an instance', () => {
    expect(unprintedModule).toBeTruthy();
  });
});
