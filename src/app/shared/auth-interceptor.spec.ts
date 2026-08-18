import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { JwtUtil } from '../core/jwtutil';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let jwtUtil: JwtUtil;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    jwtUtil = TestBed.inject(JwtUtil);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('token bo\'lsa Authorization sarlavhasini qo\'shadi', () => {
    localStorage.setItem('token', 'abc');

    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc');
    req.flush({});
  });

  it('token bo\'lmasa sarlavha qo\'shmaydi', () => {
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('401 kelganda tokenni o\'chirib login sahifasiga yuboradi', () => {
    localStorage.setItem('token', 'abc');

    http.get('/test').subscribe({ next: () => { }, error: () => { } });

    httpMock.expectOne('/test').flush({ message: 'Ruxsat yo\'q' }, { status: 401, statusText: 'Unauthorized' });

    expect(jwtUtil.getToken()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('bir xil xabarni ketma-ket takrorlamaydi', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    spyOn(snackBar, 'open');

    http.get('/bir').subscribe({ next: () => { }, error: () => { } });
    http.get('/ikki').subscribe({ next: () => { }, error: () => { } });
    httpMock.expectOne('/bir').flush(null, { status: 0, statusText: 'Unknown Error' });
    httpMock.expectOne('/ikki').flush(null, { status: 0, statusText: 'Unknown Error' });

    expect(snackBar.open).toHaveBeenCalledTimes(1);
  });

  it('xatoni yutib yubormaydi', () => {
    let xatoKeldi = false;

    http.get('/test').subscribe({ next: () => { }, error: () => xatoKeldi = true });
    httpMock.expectOne('/test').flush({ message: 'Xato' }, { status: 500, statusText: 'Server Error' });

    expect(xatoKeldi).toBeTrue();
  });
});
