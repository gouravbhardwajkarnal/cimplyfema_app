import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAprComponent } from './form-apr.component';

describe('FormAprComponent', () => {
  let component: FormAprComponent;
  let fixture: ComponentFixture<FormAprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
