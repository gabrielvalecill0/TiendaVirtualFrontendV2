import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLocalStorageService } from './usuario-local-storage.service';
import { map, Observable } from 'rxjs';

const URL =/* "https://tiendavirtual-fu7i.onrender.com"*/"http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http: HttpClient,
    private userStorangeService: UsuarioLocalStorageService
  ) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post(URL + "sign-up", signupRequest)
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = { username, password };

    return this.http.post(URL + 'authenticate', body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;
        if (token && user) {
          this.userStorangeService.guardarToken(token);
          this.userStorangeService.guardarUsuario(user);
          return true;
        }
        return false;
      })
    )
  }

  getOrderByTrackingId(trackingId: number): Observable<any> {
    return this.http.get(`${URL}order/${trackingId}`);
  }

}
