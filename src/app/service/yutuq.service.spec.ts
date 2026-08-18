import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { YutuqService } from './yutuq.service';

describe('YutuqService', () => {
  let service: YutuqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(YutuqService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
