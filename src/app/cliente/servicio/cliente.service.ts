import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLocalStorageService } from '../../servicios/usuario-local-storage.service';

const URL = "https://tiendavirtual-fu7i.onrender.com/"/*"http://localhost:8080/"*/;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  constructor(private http: HttpClient) { }

  recuperarTodosLosProductos(): Observable<any> {
    return this.http.get(URL + "api/customer/products", {
      headers: this.createAuthorizationHeader(),
    })
  }

  recuperarTodosLosProductosPorNombre(name: any): Observable<any> {
    return this.http.get(`${URL}api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  crearOrden(productId: any): Observable<any> {
    const orden = {
      idUsuario: UsuarioLocalStorageService.recuperarUsuarioPorId(),
      idProducto: productId
    }
    console.log(orden);
    return this.http.post(`${URL}api/customer/crearOrden`, orden, {
      headers: this.createAuthorizationHeader(),
      responseType: 'text' // Cambiar a 'text'
    });
  }

  recuperarTodasLasOrdenesDelUsuario(): Observable<any> {
    const usuarioId = UsuarioLocalStorageService.recuperarUsuarioPorId()
    return this.http.get(`${URL}api/customer/recuperarTodasLasOrdenes/${usuarioId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  recuperarOrdenPendienteDelUsuario(): Observable<any> {
    const usuarioId = UsuarioLocalStorageService.recuperarUsuarioPorId()
    return this.http.get(`${URL}api/customer/recuperarOrdenPendiente/${usuarioId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  recuperarProductoPorId(idProducto: number): Observable<any> {
    return this.http.get(`${URL}api/customer/recuperarProductoPorId/${idProducto}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  recuperarOrdenDelUsuarioPorIdDeLaOrden(idOrden: number): Observable<any> {
    const recuperarOrden = {
      idUsuario: UsuarioLocalStorageService.recuperarUsuarioPorId(),
      idOrden: idOrden
    };
    return this.http.post(`${URL}api/customer/recuperarOrden`, recuperarOrden, {
      headers: this.createAuthorizationHeader(),
    });
  }

  realizarPedido(RealizarOrdenDto: any): Observable<any> {
    RealizarOrdenDto.idUsuario = UsuarioLocalStorageService.recuperarUsuarioPorId()
    RealizarOrdenDto.idOrden = 1
    return this.http.post(`${URL}api/customer/realizarOrden`, RealizarOrdenDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  actualizarOrden(actualizarOrdenDto: any): Observable<any> {
    actualizarOrdenDto.idUsuario = UsuarioLocalStorageService.recuperarUsuarioPorId();
    // Verificar la estructura del objeto antes de enviarlo
    console.log("Estructura de actualizarOrdenDto", JSON.stringify(actualizarOrdenDto));

    return this.http.post(`${URL}api/customer/actualizarOrden`, actualizarOrdenDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  borrarOrden(idOrden: any): Observable<any> {
    return this.http.delete(`${URL}api/customer/eliminarOrden/${idOrden}`, {
        headers: this.createAuthorizationHeader(),
        responseType: 'text' // Indicar que esperamos texto
    });
}


  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      "Authorization", "Bearer " + UsuarioLocalStorageService.recuperarToken()
    )
  }

}
