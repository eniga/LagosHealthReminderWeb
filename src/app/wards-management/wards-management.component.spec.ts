import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardsManagementComponent } from './wards-management.component';

describe('WardsManagementComponent', () => {
  let component: WardsManagementComponent;
  let fixture: ComponentFixture<WardsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
