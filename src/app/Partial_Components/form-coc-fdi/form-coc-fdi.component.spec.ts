import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCocFdiComponent } from './form-coc-fdi.component';

describe('FormCocFdiComponent', () => {
  let component: FormCocFdiComponent;
  let fixture: ComponentFixture<FormCocFdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCocFdiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCocFdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
