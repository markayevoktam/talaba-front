import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { YunalishService } from './yunalish.service';

describe('YunalishService', () => {
  let service: YunalishService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(YunalishService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
