import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { CarritoComponent } from './components/compras/carrito.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ListaDeDeseosComponent } from './components/lista-de-deseos/lista-de-deseos.component';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialMoudel';
import { RealizarOrdenComponent } from './components/realizar-orden/realizar-orden.component';
import { ActualizarOrdenComponent } from './components/actualizar-orden/actualizar-orden.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';


@NgModule({
  declarations: [
    ClienteComponent,
    PanelPrincipalComponent,
    CarritoComponent,
    OrdenesComponent,
    ListaDeDeseosComponent,
    RealizarOrdenComponent,
    ActualizarOrdenComponent,
    VisualizarComponent,
    
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    DemoAngularMaterialModule
  ]
})
export class ClienteModule { }
