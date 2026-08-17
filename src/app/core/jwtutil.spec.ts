import { TestBed } from '@angular/core/testing';

import { JwtUtil } from './jwtutil';

/** Test uchun imzosiz, lekin tuzilishi to'g'ri JWT yasaydi */
function tokenYasa(payload: any): string {
  const base64 = (obj: any) => btoa(JSON.stringify(obj)).replace(/=+$/, '');
  return `${base64({ alg: 'HS256', typ: 'JWT' })}.${base64(payload)}.imzo`;
}

const KELAJAK = Math.floor(Date.now() / 1000) + 3600;
const OTMISH = Math.floor(Date.now() / 1000) - 3600;

describe('JwtUtil', () => {
  let jwtUtil: JwtUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    jwtUtil = TestBed.inject(JwtUtil);
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('rememberMe true bo\'lsa localStorage\'ga saqlaydi', () => {
    jwtUtil.save('abc', true);
    expect(localStorage.getItem('token')).toBe('abc');
    expect(sessionStorage.getItem('token')).toBeNull();
  });

  it('rememberMe false bo\'lsa sessionStorage\'ga saqlaydi va baribir topadi', () => {
    jwtUtil.save('abc', false);
    expect(sessionStorage.getItem('token')).toBe('abc');
    expect(localStorage.getItem('token')).toBeNull();
    expect(jwtUtil.getToken()).toBe('abc');
  });

  it('token bo\'lmasa yaroqsiz deb hisoblaydi', () => {
    expect(jwtUtil.tokenYaroqli()).toBeFalse();
  });

  it('muddati o\'tgan tokenni yaroqsiz deb hisoblaydi', () => {
    jwtUtil.save(tokenYasa({ exp: OTMISH, roles: ['ADMIN'] }), true);
    expect(jwtUtil.tokenYaroqli()).toBeFalse();
  });

  it('muddati o\'tmagan tokenni yaroqli deb hisoblaydi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK }), true);
    expect(jwtUtil.tokenYaroqli()).toBeTrue();
  });

  it('buzuq tokenni tozalab tashlaydi', () => {
    localStorage.setItem('token', 'buzuq-token');
    expect(jwtUtil.tokenYaroqli()).toBeFalse();
    expect(jwtUtil.getToken()).toBeNull();
  });

  it('rollarni massiv ko\'rinishida o\'qiydi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK, roles: ['ADMIN', 'USER'] }), true);
    expect(jwtUtil.getRoles()).toEqual(['ADMIN', 'USER']);
  });

  it('rollarni vergulli matn ko\'rinishida ham o\'qiydi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK, role: 'ADMIN,USER' }), true);
    expect(jwtUtil.getRoles()).toEqual(['ADMIN', 'USER']);
  });

  it('ROLE_ prefiksini hisobga olmaydi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK, roles: ['ROLE_ADMIN'] }), true);
    expect(jwtUtil.hasAnyRole(['ADMIN'])).toBeTrue();
    expect(jwtUtil.hasAnyRole(['USER'])).toBeFalse();
  });

  it('token rollarni e\'lon qilmasa, tekshiruvdan o\'tkazadi', () => {
    jwtUtil.save(tokenYasa({ exp: KELAJAK }), true);
    expect(jwtUtil.hasAnyRole(['ADMIN'])).toBeTrue();
  });

  it('clear ikkala saqlash joyini ham tozalaydi', () => {
    localStorage.setItem('token', 'a');
    sessionStorage.setItem('token', 'b');
    jwtUtil.clear();
    expect(jwtUtil.getToken()).toBeNull();
  });
});
