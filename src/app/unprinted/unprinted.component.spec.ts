import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprintedComponent } from './unprinted.component';

describe('UnprintedComponent', () => {
  let component: UnprintedComponent;
  let fixture: ComponentFixture<UnprintedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnprintedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnprintedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
