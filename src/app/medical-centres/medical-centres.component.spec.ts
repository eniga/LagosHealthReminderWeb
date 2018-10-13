import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCentresComponent } from './medical-centres.component';

describe('MedicalCentresComponent', () => {
  let component: MedicalCentresComponent;
  let fixture: ComponentFixture<MedicalCentresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalCentresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
