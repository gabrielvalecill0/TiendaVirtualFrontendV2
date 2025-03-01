import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoComponent } from './components/producto/producto.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';

const routes: Routes = [
  
  { path: '', component: AdministradorComponent },
  { path: 'Panel Principal', component: PanelPrincipalComponent },
  { path: 'Categoria', component: CategoriaComponent },
  { path: 'Productos', component: ProductoComponent },
  { path: 'Ordenes', component: OrdenesComponent },
  { path: 'Actualizar Producto/:id', component: ActualizarProductoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
