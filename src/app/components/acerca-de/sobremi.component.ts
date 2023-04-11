import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {
  persona : persona =  null ;
  datapersona: persona =  null;
  nuevadescripcion : any = null;
  form : FormGroup = new FormGroup({
    descripcion: new FormControl('')
     });
  submitted : boolean = false;
  constructor(private activatedRouter: ActivatedRoute,
    private personaService : PersonaService,
    private router: Router,
    private formBuilder : FormBuilder) { }

    ngOnInit(): void {
      this.form=this.formBuilder.group({
       descripcion:['',[Validators.required]]
      })
      const id = this.activatedRouter.snapshot.params['id'];
      this.personaService.detail(id).subscribe(
        data => {this.persona = data;
                 this.datapersona = data }
        , err => {
         alert("Error al cargar"); 
         this.router.navigate(['']);
        }
      );
  
    }

    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }
    get Descripcion(){
      return this.form.get('descripcion');
    }
  
    get descripcionInvalido(){
      return this.Descripcion?.touched && !this.Descripcion?.valid;
    } 

    onUpdate(event:Event): void {
      event.preventDefault;
      this.submitted=true;
        if (this.form.invalid){
          return;
        } 
  
      if (this.submitted){
     
      const id = this.activatedRouter.snapshot.params['id'];
      
      this.persona=this.form.value;
      this.persona.descripcion = this.persona.descripcion.toString();
      this.persona.nombre = this.datapersona.nombre;
      this.persona.apellido = this.datapersona.apellido;
      this.persona.email = this.datapersona.email;
      this.persona.url_foto = this.datapersona.url_foto;
        
      this.personaService.update(id,this.persona).subscribe({
        next: (valor) => {
          this.persona= valor;
          console.log("carga exitosa",valor);
          this.router.navigate(['']);
          },
        
        error: (e) => {
          console.log("algo salio mal",e);
          if (e.error.status==400){
            alert("error al cargar persona");
            this.onReset();
          } else if (e.error.status==0){
            alert("Error del lado del cliente");
          } else if (e.error.status==500){
            alert("Error del servidor");
          }
          this.router.navigate(['']);
        },
              
         } );

     
      }
    }
  
    onReset(){
      this.form.reset();
      this.submitted=false;
       
    }
  
    onClose(){
      this.router.navigate(['']);
    }
  
   
  
}
