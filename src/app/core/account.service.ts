import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  hasAnyAuthority(authorities: any): boolean {
    throw new Error('Method not implemented.');
  }
  api = environment.baseApi + "/api/account";

  private userCache$!: Observable<any>;

  constructor(private http: HttpClient) { }

  login(loginParol: any): Observable<any> {
    return this.http.post(this.api + "/auth", loginParol)
    .pipe(
      map((data:any)=>{
        if(data && data.token){
            localStorage.setItem('token', data.token);
        }
        return data;
      })
    )
  }

  register(user: any): Observable<any> {
    return this.http.post(this.api + "/register", user);
  }

  identity(){
    return this.http.get(this.api+"/current");
  }

}
