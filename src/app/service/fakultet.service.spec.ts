import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FakultetService } from './fakultet.service';

describe('FakultetService', () => {
  let service: FakultetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FakultetService);
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });
});
