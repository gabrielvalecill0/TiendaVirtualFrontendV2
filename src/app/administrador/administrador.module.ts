import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialMoudel';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoComponent } from './components/producto/producto.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';


@NgModule({
  declarations: [
    AdministradorComponent,
    PanelPrincipalComponent,
    CategoriaComponent,
    ProductoComponent,
    OrdenesComponent,
    ActualizarProductoComponent,
    
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    DemoAngularMaterialModule
  ]
})
export class AdministradorModule { }
