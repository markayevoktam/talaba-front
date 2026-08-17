import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class JwtUtil {

    constructor() {

    }
    save(token: any, rememberMe: Boolean) {
        this.clear();
        if (rememberMe) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }

    }

    clear() {

        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

    }

    getToken() {
        let token = localStorage.getItem('token');
        if (!token)
            token = sessionStorage.getItem('token');

        return token;
    }
    getData(): any {
        const token = this.getToken();
        if (token) {
            try {
                return jwt_decode(token);
            } catch (e) {
                // Token buzilgan bo'lsa, uni saqlashdan ma'no yo'q
                this.clear();
                return null;
            }
        }
        return null;
    }

    getRoles(): string[] {
        const data = this.getData();
        if (!data) {
            return [];
        }
        // Backend rollarni massiv, vergul bilan ajratilgan matn yoki bitta `role` sifatida berishi mumkin
        const xom = data.roles ?? data.role;
        if (!xom) {
            return [];
        }
        if (Array.isArray(xom)) {
            return xom.map((r: any) => typeof r === 'string' ? r : r?.authority ?? String(r));
        }
        return String(xom).split(',').map(r => r.trim()).filter(r => !!r);
    }

    /**
     * Token mavjud va muddati o'tmaganini tekshiradi.
     * `exp` da'vosi bo'lmagan token muddatsiz deb qabul qilinadi.
     */
    tokenYaroqli(): boolean {
        const data = this.getData();
        if (!data) {
            return false;
        }
        if (data.exp && data.exp * 1000 <= Date.now()) {
            return false;
        }
        return true;
    }

    hasAnyRole(roles: string[]): boolean {
        if (!roles || roles.length === 0) {
            return true;
        }
        const mavjud = this.getRoles().map(JwtUtil.rolniNormallash);
        // Token rollarni umuman e'lon qilmasa, tekshiruvni backend zimmasiga qoldiramiz
        if (mavjud.length === 0) {
            return true;
        }
        return roles.some(role => mavjud.includes(JwtUtil.rolniNormallash(role)));
    }

    /** "ROLE_ADMIN", "role_admin" va "ADMIN" bir xil rol deb qaraladi */
    private static rolniNormallash(role: any): string {
        return String(role).toUpperCase().replace(/^ROLE_/, '');
    }

}
