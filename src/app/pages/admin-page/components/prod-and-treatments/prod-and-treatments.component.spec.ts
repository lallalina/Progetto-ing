import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdAndTreatmentsComponent } from './prod-and-treatments.component';

describe('ProdAndTreatmentsComponent', () => {
  let component: ProdAndTreatmentsComponent;
  let fixture: ComponentFixture<ProdAndTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdAndTreatmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdAndTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
