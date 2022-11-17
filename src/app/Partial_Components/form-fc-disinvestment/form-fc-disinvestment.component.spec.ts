import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFcDisinvestmentComponent } from './form-fc-disinvestment.component';

describe('FormFcDisinvestmentComponent', () => {
  let component: FormFcDisinvestmentComponent;
  let fixture: ComponentFixture<FormFcDisinvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFcDisinvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFcDisinvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
