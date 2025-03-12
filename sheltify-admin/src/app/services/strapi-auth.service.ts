import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, Subject } from 'rxjs';

export type LoginResponse = {
  data: {
    token: string
    user: StrapiUser,
  }
}

export type StrapiUser = {
  id: number
  firstname: string
  lastname: string
  username: string
  email: string
  isActive: boolean
  blocked: boolean
  preferedLanguage: string
  createdAt: string
  updatedAt: string
}

@Injectable({
  providedIn: 'root'
})
export class StrapiAuthService {
  private apiUrl = "http://localhost:1337/admin/login";
  private httpClient = inject(HttpClient);
  private _bearer = "";
  get bearer(): string {
    return this._bearer;
  }

  private _user$ = new Subject<StrapiUser>();

  public user$ = this._user$.asObservable();

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.apiUrl, {
      email,
      password,
    }).pipe(
      tap(response => {
        this.saveLoginInfo(response);
        this._user$.next(response.data.user);
      })
    );
  }

  private saveLoginInfo(response: LoginResponse): void {
    localStorage.setItem('bearer', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }


  public reLogin() {
    const user = JSON.parse(localStorage.getItem('user') ?? "{}") as StrapiUser;
    console.log("relogged in as", user.email);
    this._user$.next(user);
    this._bearer = localStorage.getItem('bearer') ?? "";
  }

  private parseJwt (token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
