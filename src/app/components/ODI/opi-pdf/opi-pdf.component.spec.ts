import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpiPdfComponent } from './opi-pdf.component';

describe('OpiPdfComponent', () => {
  let component: OpiPdfComponent;
  let fixture: ComponentFixture<OpiPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpiPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpiPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
