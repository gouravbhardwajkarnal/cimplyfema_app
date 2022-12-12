import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFcComponent } from './form-fc.component';

describe('FormFcComponent', () => {
  let component: FormFcComponent;
  let fixture: ComponentFixture<FormFcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
