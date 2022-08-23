import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookingPageComponent } from './delete-booking-page.component';

describe('DeleteBookingPageComponent', () => {
  let component: DeleteBookingPageComponent;
  let fixture: ComponentFixture<DeleteBookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBookingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
