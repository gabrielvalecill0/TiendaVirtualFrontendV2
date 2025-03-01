import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvitadoService } from '../../service/invitado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-principal',
  standalone: false,

  templateUrl: './panel-principal.component.html',
  styleUrl: './panel-principal.component.css'
})
export class PanelPrincipalComponent {

  products: any[] = [];
  formularioDeBusquedaDeProducto!: FormGroup;

  constructor(private invitadoService: InvitadoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.recuperarTodosLosProductos();
    this.recordatorio();

  }

  recuperarTodosLosProductos() {
    this.products = [];
    this.invitadoService.recuperarTodosLosProductos().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }

  enviarAVisualizar(idProducto: number) {
    this.router.navigateByUrl(`invitado/Visualizar/${idProducto}`);
  }

  recordatorio() {
    this.snackBar.open('RECUERDE INGRESAR PARA PODER COMPRAR', 'Cerrar', {
      duration: 100000, // Duración en milisegundos
      horizontalPosition: 'center', // Posición horizontal
      verticalPosition: 'bottom', // Posición vertical
    });
  }

}
