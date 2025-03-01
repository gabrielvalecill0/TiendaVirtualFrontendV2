import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-actualizar-producto',
  standalone: false,

  templateUrl: './actualizar-producto.component.html',
  styleUrl: './actualizar-producto.component.css'
})
export class ActualizarProductoComponent {


  formularioDeProducto: FormGroup;
  listOfCategories: any = [];
  archivo: File | null;
  imagen: string | ArrayBuffer | null;
  id: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdministradorService,
    private activatedRoute: ActivatedRoute,) {
  }

  archivoSelecionado(event: any) {
    this.archivo = event.target.files[0];
    this.formularioDeProducto.patchValue({
      byteImg: this.archivo // Asigna también a byteImg
    });
    this.imagenPrevia(); // Método para previsualizar la imagen
}



  imagenPrevia() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagen = reader.result;
    }
    reader.readAsDataURL(this.archivo);
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.formularioDeProducto = this.fb.group({
      id:this.id,
      idCategoria: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      byteImg: [null,this.archivo]
    });
    this.recuperarCategorias();
  }

  recuperarCategorias() {
    this.adminService.recuperarTodasLasCategorias().subscribe(res => {
      this.listOfCategories = res;
    })
  }
  
  actualizarProducto(): void {
    const datos = this.formularioDeProducto.value;

    console.log(datos)
    this.adminService.actualizarProducto(datos).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Se Ha Añadido Correctamente El Producto', 'close', { duration: 5000 });
        this.router.navigateByUrl('/administrador/Panel Principal');
      } else {
        this.snackBar.open(res.message, 'ERROR', { duration: 5000 });
      }
    });
  }
  
  
}
