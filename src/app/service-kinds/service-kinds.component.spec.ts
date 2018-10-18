import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceKindsComponent } from './service-kinds.component';

describe('ServiceKindsComponent', () => {
  let component: ServiceKindsComponent;
  let fixture: ComponentFixture<ServiceKindsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceKindsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceKindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
