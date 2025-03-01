import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-producto',
  standalone: false,
  
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  formularioDeProducto: FormGroup;
  listOfCategories: any = [];
  archivo: File | null;
  imagen: string | ArrayBuffer | null;

  constructor(private fb:FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdministradorService){
  }

  archivoSelecionado(event: any) {
    this.archivo = event.target.files[0]; 
    this.imagenPrevia();
}


  imagenPrevia(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagen = reader.result;
    }
    reader.readAsDataURL(this.archivo);
  }

  ngOnInit(): void{
    this.formularioDeProducto = this.fb.group({
      idCategoria: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
    });

    this.recuperarCategorias();
  }

  recuperarCategorias(){
    this.adminService.recuperarTodasLasCategorias().subscribe(res=>{
      this.listOfCategories = res;
    })
  }

  agregarProducto(): void {
    if (this.formularioDeProducto.valid) {
      const formData: FormData = new FormData();
      formData.append('img', this.archivo);
      formData.append('idCategoria', this.formularioDeProducto.get('idCategoria').value);
      formData.append('nombre', this.formularioDeProducto.get('nombre').value);
      formData.append('descripcion', this.formularioDeProducto.get('descripcion').value); // Asegúrate de que este campo existe
      formData.append('precio', this.formularioDeProducto.get('precio').value); // Asegúrate de que este campo existe
      this.adminService.agregarProducto(formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Se Ha Añadido Correctamente El Producto', 'close', { duration: 5000 });
          this.router.navigateByUrl('/administrador/Panel Principal');
        } else {
          this.snackBar.open(res.message, 'ERROR', { duration: 5000 });
        }
      });
    } else {
      for (const i in this.formularioDeProducto.controls) {
        this.formularioDeProducto.controls[i].markAsDirty();
        this.formularioDeProducto.controls[i].updateValueAndValidity();
      }
    }
  }
  

}
