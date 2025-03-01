import { Component } from '@angular/core';
import { ClienteService } from '../../servicio/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-panel-principal',
  standalone: false,
  
  templateUrl: './panel-principal.component.html',
  styleUrl: './panel-principal.component.css'
})
export class PanelPrincipalComponent {


  products: any[] = [];
  formularioDeBusquedaDeProducto!: FormGroup;

  constructor(private customerService: ClienteService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router : Router
  ) { }

  ngOnInit() {
    this.recuperarTodosLosProductos();
    this.formularioDeBusquedaDeProducto = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  recuperarTodosLosProductos() {
    this.products = [];
    this.customerService.recuperarTodosLosProductos().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    })
  }

  enviarFormulario() {
    this.products = [];
    const title = this.formularioDeBusquedaDeProducto.get('title')!.value;
    this.customerService.recuperarTodosLosProductosPorNombre(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    });
  }

  crearOrden(id: any) {
    this.customerService.crearOrden(id).subscribe(res => {
      this.snackBar.open("El Producto Fue Agregado Correctamente", "close", { duration: 5000 });
      
      // Navegar al carrito solo después de que se haya creado la orden
      this.router.navigateByUrl('cliente/Carrito');
    }, error => {
      // Manejo de errores si es necesario
      this.snackBar.open("Error al agregar el producto", "close", { duration: 5000 });
    });
  }
  
  enviarAVisualizar(idProducto: number) {
    this.router.navigateByUrl(`cliente/Visualizar/${idProducto}`);
}


}
