import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLocalStorageService } from '../../servicios/usuario-local-storage.service';

const URL = /*"https://tiendavirtual-fu7i.onrender.com/"*/"http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }

  agregarCategoria(categoryDto: any): Observable<any> {
    return this.http.post(URL + "api/admin/crearCategoria", categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  recuperarTodasLasCategorias(): Observable<any> {
    return this.http.get(URL + "api/admin/recuperarCategorias", {
      headers: this.createAuthorizationHeader(),
    })
  }

  agregarProducto(productDto: any): Observable<any> {
    return this.http.post(URL + "api/admin/agregarProducto", productDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  actualizarProducto(actualizarProductoDto: any): Observable<any> {
    return this.http.post(`${URL}api/admin/actualizarProducto`, actualizarProductoDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  borrarProducto(idProducto: any): Observable<any> {
    return this.http.delete(`${URL}api/admin/producto/${idProducto}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  borrarOrden(idOrden: any): Observable<any> {
    return this.http.delete(`${URL}api/admin/eliminarOrden/${idOrden}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  recuperarTodosLosProductos(): Observable<any> {
    return this.http.get(URL + "api/admin/recuperarProductos", {
      headers: this.createAuthorizationHeader(),
    })
  }

  recuperarTodosLosProductosPorNombre(name: any): Observable<any> {
    return this.http.get(`${URL}api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  recuperarOrdenesRealizadas(): Observable<any> {
    return this.http.get(URL + "api/admin/recuperarTodasLasOrdenesRealizadas", {
      headers: this.createAuthorizationHeader(),
    })
  }

  cambiarElEstadoDeLaOrden(cambiarElEstadoDeLaOrden: any): Observable<any> {
    return this.http.post(`${URL}api/admin/cambiarEstadoDeOrden`, cambiarElEstadoDeLaOrden, {
      headers: this.createAuthorizationHeader(),
    })
  }

  preguntas(productId: number, faqDto: any): Observable<any> {
    return this.http.post(`${URL}api/admin/faq/${productId}`, faqDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  recuperarProductoPorId(productId): Observable<any> {
    return this.http.get(`${URL}api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  recuperarAnaliticas(): Observable<any> {
    return this.http.get(`${URL}api/admin/order/analytics`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      "Authorization", "Bearer " + UsuarioLocalStorageService.recuperarToken()
    )
  }

}
