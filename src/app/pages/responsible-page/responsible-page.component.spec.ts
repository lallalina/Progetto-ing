import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiblePageComponent } from './responsible-page.component';

describe('ResponsiblePageComponent', () => {
  let component: ResponsiblePageComponent;
  let fixture: ComponentFixture<ResponsiblePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiblePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiblePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
