import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../servicio/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visualizar',
  standalone: false,

  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.css'
})
export class VisualizarComponent {

  id: number;
  product: any;
  reviewForm!: FormGroup;

  selectedFile: File | null;
  imagePreview: String | ArrayBuffer | null;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['idProducto'];
    this.recuperarProducto(this.id)

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  recuperarProducto(idProducto: number) {
    console.log("ID DEL PRODUCTO BUSCADO " + idProducto);
    this.clienteService.recuperarProductoPorId(idProducto).subscribe(
      (response) => {
        this.product = response;
        console.log("Producto recuperado:", this.product);
      },
      (error) => {
        console.error("Error al recuperar el producto:", error);
        this.snackBar.open("Error al recuperar el producto", "Cerrar", {
          duration: 3000,
        });
      }
    );
  }

  crearOrden(id: any) {
    this.clienteService.crearOrden(id).subscribe(res => {
      this.snackBar.open("El Producto Fue Agregado Correctamente", "close", { duration: 5000 });

      // Navegar al carrito solo después de que se haya creado la orden
      this.router.navigateByUrl('cliente/Carrito');
    }, error => {
      // Manejo de errores si es necesario
      this.snackBar.open("Error al agregar el producto", "close", { duration: 5000 });
    });
  }


}
