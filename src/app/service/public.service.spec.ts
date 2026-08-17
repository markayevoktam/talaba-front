import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PublicService } from './public.service';

describe('PublicService', () => {
  let service: PublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PublicService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
