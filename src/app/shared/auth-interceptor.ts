import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { JwtUtil } from "../core/jwtutil";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    /** Bir vaqtda ketgan bir nechta so'rov bir xil xabarni takrorlamasligi uchun */
    private oxirgiXabar = '';
    private oxirgiVaqt = 0;
    private static readonly TAKROR_ORALIQ = 3000;

    constructor(
        private jwtUtil: JwtUtil,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtUtil.getToken();

        const surov = token
            ? req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) })
            : req;

        return next.handle(surov).pipe(
            catchError((error: HttpErrorResponse) => {

                if (error.status === 401 || error.status === 403) {
                    this.jwtUtil.clear();
                    this.router.navigate(['/login']);
                }

                this.xabarKorsat(this.xabarniOl(error));

                return throwError(() => error);
            })
        );
    }

    private xabarKorsat(xabar: string): void {
        const hozir = Date.now();
        if (xabar === this.oxirgiXabar && hozir - this.oxirgiVaqt < AuthInterceptor.TAKROR_ORALIQ) {
            return;
        }
        this.oxirgiXabar = xabar;
        this.oxirgiVaqt = hozir;

        this.snackBar.open(xabar, 'X', {
            duration: 4000,
            verticalPosition: 'bottom',
        });
    }

    private xabarniOl(error: HttpErrorResponse): string {
        if (error.status === 0) {
            return "Serverga ulanib bo'lmadi";
        }
        if (error.status === 401 || error.status === 403) {
            return "Sizga bu amalni bajarishga huquq berilmagan";
        }
        // Backend {message: "..."} yoki oddiy matn qaytarishi mumkin
        if (error.error) {
            if (typeof error.error === 'string') {
                return error.error;
            }
            if (error.error.message) {
                return error.error.message;
            }
        }
        return "Xatolik ro'y berdi";
    }
}
