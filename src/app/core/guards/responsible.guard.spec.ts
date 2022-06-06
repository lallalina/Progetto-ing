import { TestBed } from '@angular/core/testing';

import { ResponsibleGuard } from './responsible.guard';

describe('ResponsibleGuard', () => {
  let guard: ResponsibleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResponsibleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
