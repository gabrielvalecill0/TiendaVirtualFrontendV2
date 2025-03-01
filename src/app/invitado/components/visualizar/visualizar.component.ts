import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitadoService } from '../../service/invitado.service';

@Component({
  selector: 'app-visualizar',
  standalone: false,
  
  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.css'
})
export class VisualizarComponent {

  idProducto: number;
  product: any;
  reviewForm!: FormGroup;

  selectedFile: File | null;
  imagePreview: String | ArrayBuffer | null;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private clienteService: InvitadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idProducto = this.activatedRoute.snapshot.params['idProducto'];
    console.log()
    this.recuperarProducto(this.idProducto)

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

}
