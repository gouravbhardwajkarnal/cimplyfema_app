import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcInvestorComponent } from './fc-investor.component';

describe('FcInvestorComponent', () => {
  let component: FcInvestorComponent;
  let fixture: ComponentFixture<FcInvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcInvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
