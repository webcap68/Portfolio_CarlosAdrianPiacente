import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import { NeweducacionComponent } from './neweducacion.component';




@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  constructor(private educacionS: EducacionService, private tokenService: TokenService,
    private matdialog: MatDialog) { }

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
    this.educacionS.lista().subscribe(
      data => {
        this.educacion = data;
      }
    )
  }

  delete(id?: number) {
    if (id != undefined) {
      if (confirm('Está seguro de eliminar el dato?')) {


        this.educacionS.delete(id).subscribe(result => {
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

  NuevaEdu(): void {

    
    const dialogRef = this.matdialog.open(NeweducacionComponent, {
      width: '40%', height: 'auto',
      enterAnimationDuration: '1000ms', exitAnimationDuration: '500ms'
    });
     dialogRef.afterClosed().subscribe((data) => {
    
       
         console.log("paso por el after ")
         this.ngOnInit();
      
     })
  }


}
