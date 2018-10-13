import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgasManagementComponent } from './lgas-management.component';

describe('LgasManagementComponent', () => {
  let component: LgasManagementComponent;
  let fixture: ComponentFixture<LgasManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgasManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgasManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
