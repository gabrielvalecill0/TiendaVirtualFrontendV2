import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitadoRoutingModule } from './invitado-routing.module';
import { InvitadoComponent } from './invitado.component';
import { PanelPrincipalComponent } from './components/panel-principal/panel-principal.component';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialMoudel';
import { VisualizarComponent } from './components/visualizar/visualizar.component';


@NgModule({
  declarations: [
    InvitadoComponent,
    PanelPrincipalComponent,
    VisualizarComponent,
    
  ],
  imports: [
    CommonModule,
    InvitadoRoutingModule,
    DemoAngularMaterialModule
  ]
})
export class InvitadoModule { }
