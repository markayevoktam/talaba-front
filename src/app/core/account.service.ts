import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { JwtUtil } from './jwtutil';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  api = environment.baseApi + "/api/account";

  private currentUser: User | undefined;

  private userCache$: Observable<any> | undefined;

  constructor(private http: HttpClient, private jwtUtil: JwtUtil) { }

  login(loginParol: any, rememberMe: boolean = true): Observable<any> {
    return this.http.post(this.api + "/auth", loginParol)
      .pipe(
        map((data: any) => {
          if (data && data.token) {
            this.jwtUtil.save(data.token, rememberMe);
            // Yangi foydalanuvchi kirdi - eski keshni tashlab yuboramiz
            this.userCache$ = undefined;
            this.currentUser = undefined;
          }
          return data;
        })
      )
  }

  register(user: any): Observable<any> {
    return this.http.post(this.api + "/register", user);
  }

  update(user: any): Observable<any> {
    return this.http.post(this.api + "/update", user);
  }

  identity(): Observable<any> {
    // Yaroqli token bo'lmasa, backendga bexuda 401 so'rov yubormaymiz
    if (!this.jwtUtil.tokenYaroqli()) {
      return of(null);
    }
    if (!this.userCache$) this.userCache$ = this.http.get<User>(this.api + "/current")
      .pipe(
        shareReplay(1),
        map(user => {
          this.currentUser = user;
          return user;
        })
      );
    return this.userCache$;
  }

  logout() {
    this.jwtUtil.clear();
    this.userCache$ = undefined;
    this.currentUser = undefined;
  }

  hasAnyRole(roles: string[]): boolean {
    return this.jwtUtil.hasAnyRole(roles);
  }
}
