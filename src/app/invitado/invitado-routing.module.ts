import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitadoComponent } from './invitado.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { VisualizarComponent } from './components/visualizar/visualizar.component';

const routes: Routes = [
  { path: '', component: InvitadoComponent },
  { path: 'Panel Principal', component: PanelPrincipalComponent },
  { path: 'Visualizar/:idProducto', component: VisualizarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitadoRoutingModule { }
