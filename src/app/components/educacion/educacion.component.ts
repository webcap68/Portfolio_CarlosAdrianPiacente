import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import { NeweducacionComponent } from './neweducacion.component';
import { EditeducacionComponent } from './editeducacion.component';




@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  constructor(
    private educacionS: EducacionService,
    private tokenService: TokenService,
    private matdialog: MatDialog,
    private snackbar: MatSnackBar) { }

  isLogged = false;
  isExpirate = false;




  ngOnInit(): void {

    this.cargarEducacion();
    if (this.tokenService.getToken()) {
      this.isLogged = true;

    } else {
      this.isLogged = false;
    }
  }

  cargarEducacion(): void {
    this.educacionS.lista().subscribe({
      next: (data) => {
        this.educacion = data;
        console.log("carga exitosa", data);
        //this.router.navigate(['']);
      },
   
      error: (err) => {
        console.log("algo salio mal", err);
        if (err.error.status == 400) {
          this.snackbar.open(`Error al cargar educacion: ${err.error.mensaje}`, 'Cerrar', {
            duration: 5000,
            verticalPosition: 'top'
          });

        } else if (err.error.status == 0) {
          this.snackbar.open(`Error del lado del cliente: ${err.error.message}`, 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top'
          });
        } else if (err.error.status == 500) {
          this.snackbar.open(`Error del lado del servidor: ${err.error.message}`, 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      },
    });
  }

  delete(id?: number) {
    if (id != undefined) {
      if (confirm('Está seguro de eliminar el dato?')) {


        this.educacionS.delete(id).subscribe(
          result => {
          this.cargarEducacion();
        }, err => {
          alert("No se pudo eliminar");
        })
      }
    }
  }

  procesaPropagar(mensaje: string) {
    console.log(mensaje);
  }

  nuevaEdu(): void {


    const dialogRef = this.matdialog.open(NeweducacionComponent, {
      width: '40%', height: 'auto',
      enterAnimationDuration: '1000ms', exitAnimationDuration: '500ms'
    });
    dialogRef.afterClosed().subscribe((data) => {


      console.log("paso por el after ")
      this.ngOnInit();

    })
  }

  editEdu(id: any): void {

    if (id != undefined) {
      console.log(id);
      const dialogRef = this.matdialog.open(EditeducacionComponent, {
        width: '40%', height: 'auto',
        enterAnimationDuration: '1000ms', exitAnimationDuration: '500ms', data: { id: id }
      });
      dialogRef.afterClosed().subscribe((data) => {


        console.log("paso por el after ")
        this.ngOnInit();

      })
    } else {
      console.log("no definido");
    }
  }


}
