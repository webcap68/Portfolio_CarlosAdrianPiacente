import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';


@Component({
  selector: 'app-neweducacion',
  templateUrl: './neweducacion.component.html',
  styleUrls: ['./neweducacion.component.css']
})
export class NeweducacionComponent implements OnInit {
  nuevaedu: Educacion = null;
  form: FormGroup = new FormGroup({
    nombreE: new FormControl(''),
    descripcionE: new FormControl(''),
    inicio: new FormControl(''),
    fin: new FormControl('')
  });
  submitted: boolean = false;
  mensaje: string;

  constructor(private educacionS: EducacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private Ref: MatDialogRef<NeweducacionComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fin: ['', [Validators.required, Validators.min(1900), Validators.max(2023)]],
      nombreE: ['', [Validators.required, Validators.minLength(2)]],
      inicio: ['', [Validators.required, Validators.min(1900), Validators.max(2023)]],
      descripcionE: ['', [Validators.required, Validators.maxLength(255)]]
    })
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


  onCreate(event: Event): void {
    event.preventDefault;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.submitted) {

      const educacion = this.form.value;
      // this.educacionS.save(educacion).subscribe(
      //   data =>{

      //    this.onClose();
      //this.router.navigate(['']);
      // }, err =>{
      //alert("Falló al agregar nueva educacion");
      //this.router.navigate(['']);
      // }
      // )

      this.educacionS.save(educacion).subscribe({
        next: (data) => {
          console.log("creación de educación exitosa", data);
          this.snackbar.open(`${data.mensaje}`, 'Cerrar', {
            duration: 5000,
            verticalPosition: 'top'
          });
          this.onClose();
        },
        error: (err) => {
          console.log("algo salio mal", err);
          if (err.error.status == 400) {
            this.snackbar.open(`Error al crear la educacion: ${err.error.mensaje}`, 'Cerrar', {
              duration: 2000,
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
    this.Ref.close();
  }
}
