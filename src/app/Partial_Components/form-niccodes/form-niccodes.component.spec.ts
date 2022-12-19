import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNiccodesComponent } from './form-niccodes.component';

describe('FormNiccodesComponent', () => {
  let component: FormNiccodesComponent;
  let fixture: ComponentFixture<FormNiccodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNiccodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNiccodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
