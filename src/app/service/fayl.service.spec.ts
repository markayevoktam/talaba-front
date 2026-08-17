import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FaylService } from './fayl.service';

describe('FaylService', () => {
  let service: FaylService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FaylService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
