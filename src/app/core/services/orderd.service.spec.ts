import { TestBed } from '@angular/core/testing';

import { OrderdService } from './orderd.service';

describe('OrderdService', () => {
  let service: OrderdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
