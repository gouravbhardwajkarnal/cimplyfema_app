import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFcgprComponent } from './form-fcgpr.component';

describe('FormFcgprComponent', () => {
  let component: FormFcgprComponent;
  let fixture: ComponentFixture<FormFcgprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFcgprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFcgprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
