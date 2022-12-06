import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprInstructionsComponent } from './apr-instructions.component';

describe('AprInstructionsComponent', () => {
  let component: AprInstructionsComponent;
  let fixture: ComponentFixture<AprInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
