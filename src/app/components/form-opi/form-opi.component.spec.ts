import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOpiComponent } from './form-opi.component';

describe('FormOpiComponent', () => {
  let component: FormOpiComponent;
  let fixture: ComponentFixture<FormOpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
