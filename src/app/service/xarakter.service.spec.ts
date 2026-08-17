import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { XarakterService } from './xarakter.service';

describe('XarakterService', () => {
  let service: XarakterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(XarakterService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
