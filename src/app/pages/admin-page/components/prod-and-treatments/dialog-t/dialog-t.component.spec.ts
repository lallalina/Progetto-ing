import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTComponent } from './dialog-t.component';

describe('DialogTComponent', () => {
  let component: DialogTComponent;
  let fixture: ComponentFixture<DialogTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
