import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AccountService } from './account.service';
import { JwtUtil } from './jwtutil';

function tokenYasa(payload: any): string {
  const base64 = (obj: any) => btoa(JSON.stringify(obj)).replace(/=+$/, '');
  return `${base64({ alg: 'HS256', typ: 'JWT' })}.${base64(payload)}.imzo`;
}

const KELAJAK = Math.floor(Date.now() / 1000) + 3600;

describe('AccountService', () => {
  let service: AccountService;
  let jwtUtil: JwtUtil;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AccountService);
    jwtUtil = TestBed.inject(JwtUtil);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('yaratilishi kerak', () => {
    expect(service).toBeTruthy();
  });

  it('login muvaffaqiyatli bo\'lsa tokenni saqlaydi', () => {
    const token = tokenYasa({ exp: KELAJAK, roles: ['ADMIN'] });

    service.login({ username: 'admin', password: '123' }).subscribe();

    const req = httpMock.expectOne(environment.baseApi + '/api/account/auth');
    expect(req.request.method).toBe('POST');
    req.flush({ token: token });

    expect(jwtUtil.getToken()).toBe(token);
  });

  it('rememberMe false bo\'lsa tokenni sessionStorage\'ga saqlaydi', () => {
    const token = tokenYasa({ exp: KELAJAK });

    service.login({ username: 'admin', password: '123' }, false).subscribe();
    httpMock.expectOne(environment.baseApi + '/api/account/auth').flush({ token: token });

    expect(sessionStorage.getItem('token')).toBe(token);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('token bo\'lmasa identity() serverga so\'rov yubormaydi', () => {
    let natija: any = 'tegilmagan';
    service.identity().subscribe(d => natija = d);

    expect(natija).toBeNull();
    httpMock.expectNone(environment.baseApi + '/api/account/current');
  });

  it('identity() natijasini keshlaydi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK }), true);

    service.identity().subscribe();
    service.identity().subscribe();

    // Ikki chaqiruvga bitta so'rov ketishi kerak
    const surovlar = httpMock.match(environment.baseApi + '/api/account/current');
    expect(surovlar.length).toBe(1);
    surovlar[0].flush({ id: 1, ism: 'Admin' });
  });

  it('logout tokenni o\'chiradi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK }), true);
    service.logout();
    expect(jwtUtil.getToken()).toBeNull();
  });
});
