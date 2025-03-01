import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DemoAngularMaterialModule } from './DemoAngularMaterialMoudel';
import { VerificarOrdenesComponent } from './verificar-ordenes/verificar-ordenes.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IngresarComponent,
    RegistrarseComponent,
    VerificarOrdenesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoAngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
