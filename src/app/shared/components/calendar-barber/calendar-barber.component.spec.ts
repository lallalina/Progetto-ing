import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBarberComponent } from './calendar-barber.component';

describe('CalendarBarberComponent', () => {
  let component: CalendarBarberComponent;
  let fixture: ComponentFixture<CalendarBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarBarberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
