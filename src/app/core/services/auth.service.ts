import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  public login(payload: { email: string, password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payload).pipe(
      map((res) => {
        localStorage.removeItem('auth_token');
        localStorage.setItem('auth_token', res.token)

        return this.router.navigate(['admin']);
      }),
        catchError((err) => {
          if (err.error.message) return throwError(() => err.error.message);

          return throwError(() => "Something went wrong  =[");
        })
      )
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }
}
