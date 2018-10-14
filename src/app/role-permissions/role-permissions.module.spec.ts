import { RolePermissionsModule } from './role-permissions.module';

describe('RolePermissionsModule', () => {
  let rolePermissionsModule: RolePermissionsModule;

  beforeEach(() => {
    rolePermissionsModule = new RolePermissionsModule();
  });

  it('should create an instance', () => {
    expect(rolePermissionsModule).toBeTruthy();
  });
});
