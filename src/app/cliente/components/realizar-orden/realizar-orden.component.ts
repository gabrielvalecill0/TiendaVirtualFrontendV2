import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../servicio/cliente.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-realizar-orden',
  standalone: false,

  templateUrl: './realizar-orden.component.html',
  styleUrl: './realizar-orden.component.css'
})
export class RealizarOrdenComponent {

  formularioDeRealizarPedido!: FormGroup;
  montoTotal: number = 0
  orden: any

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: ClienteService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.recuperarOrdenPendienteDelUsuario();
    this.formularioDeRealizarPedido = this.fb.group({
      direccion: [null, [Validators.required]],
      nroDeTelf: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      montoTotal: [null, [Validators.required]],
      descripcion: [null],
    })
  }

  realizarPedido() {
    this.customerService.realizarPedido(this.formularioDeRealizarPedido.value).subscribe(res => { })

    this.snackBar.open("Se Ha Realizado El Pedido Correctamente, Espere 1 Segundo ", "Close", { duration: 5000 })
   
    setTimeout(() => {
      this.router.navigateByUrl("/cliente/Mis Ordenes");
      this.closeForm();
    }, 1000); // 1000 milisegundos = 1 segundos

  }

  calcularMontoTotal(cantidad: number) {

    this.montoTotal = this.orden.precioDelProducto * cantidad;
    this.formularioDeRealizarPedido.patchValue({ montoTotal: this.montoTotal });
  
}

  recuperarOrdenPendienteDelUsuario(){
  this.customerService.recuperarOrdenPendienteDelUsuario().subscribe(res => {
    this.orden = res;
    console.log(this.orden);
  });

}

closeForm(){
  this.dialog.closeAll();
}

}
