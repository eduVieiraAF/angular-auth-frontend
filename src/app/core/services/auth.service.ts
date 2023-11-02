import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public login(payload: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.url}/sign`, payload).pipe(
      map((data) => console.log(data)),
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }
}
