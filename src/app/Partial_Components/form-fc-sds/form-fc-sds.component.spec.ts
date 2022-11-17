import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFcSdsComponent } from './form-fc-sds.component';

describe('FormFcSdsComponent', () => {
  let component: FormFcSdsComponent;
  let fixture: ComponentFixture<FormFcSdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFcSdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFcSdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
