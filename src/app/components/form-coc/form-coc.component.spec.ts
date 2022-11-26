import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCocComponent } from './form-coc.component';

describe('FormCocComponent', () => {
  let component: FormCocComponent;
  let fixture: ComponentFixture<FormCocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
