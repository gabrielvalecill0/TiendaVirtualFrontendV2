import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*"http://localhost:8080/"*/
const URL = "https://tiendavirtual-fu7i.onrender.com/";

@Injectable({
  providedIn: 'root'
})
export class InvitadoService {

  constructor(private http: HttpClient) { }

  recuperarTodosLosProductos(): Observable<any> {
    return this.http.get(URL + "guest/recuperarTodosLosProductos")
  }

  recuperarProductoPorId(idProducto: number): Observable<any> {
    return this.http.get(`${URL}guest/recuperarProductoPorId/${idProducto}`);
  }

}
