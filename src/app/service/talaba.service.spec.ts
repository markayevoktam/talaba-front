import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TalabaService } from './talaba.service';

describe('TalabaService', () => {
  let service: TalabaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TalabaService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
