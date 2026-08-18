import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { JwtUtil } from './jwtutil';


@Injectable({ providedIn: 'root' })
export class UserRouteAccessGuard implements CanActivate {
    constructor(private router: Router, private _snackBar: MatSnackBar, private jwtUtil: JwtUtil) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        if (!this.jwtUtil.tokenYaroqli()) {
            this.jwtUtil.clear();
            return this.rad("Iltimos, tizimga qaytadan kiring!", state.url);
        }

        // Route `data: { roles: [...] }` bilan e'lon qilingan bo'lsa, rol tekshiriladi
        const roles: string[] = route.data['roles'] ?? [];
        if (!this.jwtUtil.hasAnyRole(roles)) {
            return this.rad("Sizga bu bo'limda ishlashga huquq berilmagan!", state.url);
        }

        return of(true);
    }

    private rad(xabar: string, qaytishUrl: string): Observable<boolean> {
        this._snackBar.open(xabar, 'X ', {
            duration: 4000,
            verticalPosition: 'top',
        });
        this.router.navigate(['/login'], { queryParams: { redirect: qaytishUrl } });
        return of(false);
    }
}
