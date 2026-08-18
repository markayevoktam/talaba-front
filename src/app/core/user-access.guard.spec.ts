import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { JwtUtil } from './jwtutil';
import { UserRouteAccessGuard } from './user-access.guard';

function tokenYasa(payload: any): string {
  const base64 = (obj: any) => btoa(JSON.stringify(obj)).replace(/=+$/, '');
  return `${base64({ alg: 'HS256', typ: 'JWT' })}.${base64(payload)}.imzo`;
}

const KELAJAK = Math.floor(Date.now() / 1000) + 3600;
const OTMISH = Math.floor(Date.now() / 1000) - 3600;

describe('UserRouteAccessGuard', () => {
  let guard: UserRouteAccessGuard;
  let jwtUtil: JwtUtil;
  let router: Router;

  const route = (roles?: string[]) => ({ data: roles ? { roles } : {} } as unknown as ActivatedRouteSnapshot);
  const state = { url: '/admin/talaba' } as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ]
    });
    guard = TestBed.inject(UserRouteAccessGuard);
    jwtUtil = TestBed.inject(JwtUtil);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  function natija(roles?: string[]): boolean {
    let ruxsat = false;
    guard.canActivate(route(roles), state).subscribe(d => ruxsat = d);
    return ruxsat;
  }

  it('token bo\'lmasa kiritmaydi va login sahifasiga yuboradi', () => {
    expect(natija()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { redirect: '/admin/talaba' } });
  });

  it('muddati o\'tgan token bilan kiritmaydi', () => {
    jwtUtil.save(tokenYasa({ exp: OTMISH, roles: ['ADMIN'] }), true);
    expect(natija(['ADMIN'])).toBeFalse();
  });

  it('yaroqli ADMIN tokeni bilan kiritadi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK, roles: ['ADMIN'] }), true);
    expect(natija(['ADMIN'])).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('USER rolini ADMIN bo\'limiga kiritmaydi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK, roles: ['USER'] }), true);
    expect(natija(['ADMIN'])).toBeFalse();
  });

  it('rol talab qilinmagan yo\'nalishga yaroqli token bilan kiritadi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK, roles: ['USER'] }), true);
    expect(natija()).toBeTrue();
  });
});
