import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEsopComponent } from './form-esop.component';

describe('FormEsopComponent', () => {
  let component: FormEsopComponent;
  let fixture: ComponentFixture<FormEsopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEsopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEsopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
