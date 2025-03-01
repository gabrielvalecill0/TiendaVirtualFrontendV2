import { Injectable } from '@angular/core';

const TOKEN = "ecom-token";
const USER = "ecom-user";

@Injectable({
  providedIn: 'root'
})
export class UsuarioLocalStorageService {

  constructor() { }

  public guardarToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  public guardarUsuario(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static recuperarToken(): string{
    return localStorage.getItem(TOKEN);
  }

  static recuperarUsuario():any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static recuperarUsuarioPorId(): string{
    const user = this.recuperarUsuario();
    if(user == null){
      return '';
    }
    return user.userId;
  }

  static recuperarRoleDelUsuario(): string{
    const user = this.recuperarUsuario();
    if( user == null){
      return '';
    }
    return user.role;
  }

  static ingresarComoAdministrador() : boolean {
    if(this.recuperarToken === null){
      return false;
    }
    const role: string = this.recuperarRoleDelUsuario();
    return role == 'ADMINISTRADOR';
  }

  static ingresarComoCliente(): boolean{
    if(this.recuperarToken === null){
      return false;
    }
    const role: string = this.recuperarRoleDelUsuario();
    return role == 'CLIENTE';
  }

  static desconectar(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
