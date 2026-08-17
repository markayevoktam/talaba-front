import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GuruhService } from './guruh.service';

describe('GuruhService', () => {
  let service: GuruhService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GuruhService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
