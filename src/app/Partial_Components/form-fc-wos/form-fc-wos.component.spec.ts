import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFcWosComponent } from './form-fc-wos.component';

describe('FormFcWosComponent', () => {
  let component: FormFcWosComponent;
  let fixture: ComponentFixture<FormFcWosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFcWosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFcWosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
