import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  standalone: false,
  
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

  formularioDeCategoria!: FormGroup;

  constructor( private fb:FormBuilder,
               private router: Router,
               private snackBar: MatSnackBar,
               private adminService: AdministradorService
  ){}

  ngOnInit(): void{
    this.formularioDeCategoria = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
    })
  }

  agregarCategoria(): void{
    if(this.formularioDeCategoria.valid){
      this.adminService.agregarCategoria(this.formularioDeCategoria.value).subscribe((res) =>{
        if(res.id !=null){
          this.snackBar.open('La Categoria Fue Agregada Con Exito','close',{
            duration:5000
          });
          this.router.navigateByUrl('/administrador/Panel Principal');
        }else{
          this.snackBar.open(res.message,'Close',{
            duration:5000,
            panelClass: 'error-snackbar'
          });
        }
      })
    }else{
      this.formularioDeCategoria.markAllAsTouched()
    };
  }  

}
