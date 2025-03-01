import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarComponent } from './ingresar/ingresar.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { VerificarOrdenesComponent } from './verificar-ordenes/verificar-ordenes.component';
import { PanelPrincipalComponent } from './invitado/components/panel-principal/panel-principal.component';

const routes: Routes = [

  { path : "", component: PanelPrincipalComponent},//PanelPrincipal Invitados
  { path : "Ingresar" , component: IngresarComponent},
  { path : "Registrate" , component: RegistrarseComponent},
  { path : "Verificar Ordenes" , component: VerificarOrdenesComponent},

  { path: 'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },

  { path: 'administrador', loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule) },

  { path: 'invitado', loadChildren: () => import('./invitado/invitado.module').then(m => m.InvitadoModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
