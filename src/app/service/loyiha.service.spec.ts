import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoyihaService } from './loyiha.service';

describe('LoyihaService', () => {
  let service: LoyihaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoyihaService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
