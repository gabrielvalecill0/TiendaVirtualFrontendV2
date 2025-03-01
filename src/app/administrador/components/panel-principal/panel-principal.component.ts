import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-panel-principal',
  standalone: false,
  
  templateUrl: './panel-principal.component.html',
  styleUrl: './panel-principal.component.css'
})
export class PanelPrincipalComponent {

  productos: any[] = [];
  formularioDeBusqueda!: FormGroup;

  constructor (private adminService: AdministradorService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    
    this.recuperarTodosLosProductos();
    this.formularioDeBusqueda = this.fb.group({
      titulo: [ null , [ Validators.required]]
    })
  }

  recuperarTodosLosProductos(){
    this.productos = [];
    this.adminService.recuperarTodosLosProductos().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+ element.byteImg;
        this.productos.push(element);
      });
    })
  }

  enviarFormulario() {
    this.productos = [];
    const title = this.formularioDeBusqueda.get('title')!.value;
    this.adminService.recuperarTodosLosProductosPorNombre(title).subscribe(res => {
        res.forEach(element => {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
            this.productos.push(element);
        });
    });
}

  borrarProducto(productId:any){
    this.adminService.borrarProducto(productId).subscribe(res =>{
      if(res.body == null){
        this.snackBar.open('El Producto Fue Eliminado Correctamente',"close",{
          duration:5000
        });
        this.recuperarTodosLosProductos();
      }else{
        this.snackBar.open(res.message, "close",
          {duration:5000,
            panelClass: "error-snackbar"
          }
        )
      }
    })
  }

}
