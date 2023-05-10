import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EducacionService } from 'src/app/service/educacion.service';

@Component({
  selector: 'app-editeducacion',
  templateUrl: './editeducacion.component.html',
  styleUrls: ['./editeducacion.component.css']
})
export class EditeducacionComponent implements OnInit {
  educacion: Educacion = null;
  form: FormGroup = new FormGroup({
    nombreE: new FormControl(''),
    descripcionE: new FormControl(''),
    inicio: new FormControl(''),
    fin: new FormControl('')
  });
  submitted: boolean = false;

  constructor(
    private educacionS: EducacionService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditeducacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fin: ['', [Validators.required, Validators.min(1900), Validators.max(2023)]],
      nombreE: ['', [Validators.required, Validators.minLength(2)]],
      inicio: ['', [Validators.required, Validators.min(1900), Validators.max(2023)]],
      descripcionE: ['', [Validators.required, Validators.maxLength(255)]]
    })



    this.educacionS.detail(this.data.id).subscribe({

      next: (data) => {
        this.educacion = data;
        console.log("carga exitosa", data);
        //this.router.navigate(['']);
      },

      error: (err) => {
        console.log("algo salio mal", err);
        if (err.error.status == 400) {
          this.snackbar.open(`Error al cargar educacion: ${err.error.mensaje}`, 'Cerrar', {
            duration: 2000,
            verticalPosition: 'top'
          });
         // this.onReset();
        } else if (err.error.status == 0) {
          this.snackbar.open('Error del lado del cliente: ${err.error.message}','Cerrar',{
          duration: 2000,
          verticalPosition: 'top'});
        } else if (err.error.status == 500) {
          this.snackbar.open('Error del lado del servidor: ${err.error.message}','Cerrar',{
            duration: 2000,
            verticalPosition: 'top'});
        }
        this.onClose();
        //this.router.navigate(['']);
        
        

      },

    });

  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get Fin() {
    return this.form.get('fin');
  }

  get finInvalido() {
    return this.Fin?.touched && !this.Fin?.valid;
  }

  get NombreE() {
    return this.form.get('nombreE');
  }

  get nombreEInvalido() {
    return this.NombreE?.touched && !this.NombreE?.valid;
  }



  get Inicio() {
    return this.form.get('inicio');
  }

  get inicioInvalido() {
    return this.Inicio?.touched && !this.Inicio?.valid;
  }

  get DescripcionE() {
    return this.form.get('descripcionE');
  }

  get descripcionEInvalido() {
    return this.DescripcionE?.touched && !this.DescripcionE?.valid;
  }

  onUpdate(event: Event): void {

    event.preventDefault;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.submitted) {

      this.educacion = this.form.value;
      this.educacionS.update(this.data.id,this.educacion).subscribe({

        next: (data) => {
          //this.educacion = data;
          console.log("modificación exitosa", data);
          const miSnackbar = this.snackbar.open(`${data.mensaje}`, 'Cerrar' , {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        //  miSnackbar.onAction().subscribe(()=> {
        //    alert('presionaste Cerrar');
        //  })
        this.onClose();
        },
        error: (err) => {
          console.log("algo salio mal", err);
          if (err.error.status == 400) {
            this.snackbar.open(`Error al modificar la educacion: ${err.error.mensaje}`, 'Cerrar', {
              duration: 2000,
              verticalPosition: 'top'
            });
           
          } else if (err.error.status == 0) {
            this.snackbar.open('Error del lado del cliente: ${err.error.message}','Cerrar',{
            duration: 2000,
            verticalPosition: 'top'});
          } else if (err.error.status == 500) {
            this.snackbar.open('Error del lado del servidor: ${err.error.message}','Cerrar',{
              duration: 2000,
              verticalPosition: 'top'});
          }
          this.onClose();
        
        },
  
      });
  
    }
  }



  onReset() {
    this.form.reset();
    this.submitted = false;

  }

  onClose() {

    this.dialogRef.close();
  }

}
