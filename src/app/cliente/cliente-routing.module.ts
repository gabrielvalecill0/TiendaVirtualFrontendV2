import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { CarritoComponent } from './components/compras/carrito.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ListaDeDeseosComponent } from './components/lista-de-deseos/lista-de-deseos.component';
import { ActualizarOrdenComponent } from './components/actualizar-orden/actualizar-orden.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';

const routes: Routes = [
  
  { path: '', component: ClienteComponent },
  { path: 'Panel Principal', component: PanelPrincipalComponent },
  { path: 'Carrito', component: CarritoComponent },
  { path: 'Ordenes', component: OrdenesComponent },
  { path: 'Lista De Deseos', component: ListaDeDeseosComponent },
  { path: 'Mis Ordenes', component: OrdenesComponent },
  { path: 'Actualizar Orden/:id', component: ActualizarOrdenComponent },
  { path: 'Visualizar/:idProducto', component: VisualizarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
