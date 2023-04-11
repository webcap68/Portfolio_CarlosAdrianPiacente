import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-editproyecto',
  templateUrl: './editproyecto.component.html',
  styleUrls: ['./editproyecto.component.css']
})
export class EditproyectoComponent implements OnInit {

  proyecto : Proyecto =  null ;
  form : FormGroup = new FormGroup({
    nombre:   new FormControl(''),
    descripcion: new FormControl(''),
    ano: new FormControl(''),
    url: new FormControl(''),
    foto: new FormControl('')

  });
  submitted : boolean = false;
  urlgenerica: string = 'https://firebasestorage.googleapis.com/v0/b/frontendcap68.appspot.com/o/proyectos%2Fimagenaeditar.jpg?alt=media&token=9d8b49e7-7639-4b56-a234-75f3b64e359c';
  constructor(private activatedRouter: ActivatedRoute,
    private proyectoS : ProyectoService,
    private router: Router,
    public imageService : ImageService,
    private formBuilder : FormBuilder) { }

    ngOnInit(): void {
      this.form=this.formBuilder.group({
        foto:[this.urlgenerica,[Validators.required]],
        nombre:['',[Validators.required,Validators.minLength(8)]],
        descripcion:['',[Validators.required]],
        url:['https://',[Validators.required]],
        ano:['',[Validators.required,Validators.min(1900),Validators.max(2023)]]
      })
      const id = this.activatedRouter.snapshot.params['id'];
      this.proyectoS.detail(id).subscribe(
        data => {this.proyecto = data}
        , err => {
         alert("Error al cargar"); 
         this.router.navigate(['']);
        }
      );
  
    }
  
    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }
  
    //metodos para el form
  
    
    get Url(){
      return this.form.get('url');
    }
  
    get urlInvalido(){
      return this.Url?.touched && !this.Url?.valid;
    }
  
    get Nombre(){
      return this.form.get('nombre');
    }
  
    get nombreInvalido(){
      return this.Nombre?.touched && !this.Nombre?.valid;
    }
  
      
    get Descripcion(){
      return this.form.get('descripcion');
    }
  
    get descripcionInvalido(){
      return this.Descripcion?.touched && !this.Descripcion?.valid;
    } 
  
    get Foto(){
      return this.form.get('foto');
    }
  
    get fotoInvalido(){
      return this.Foto?.touched && !this.Foto?.valid;
    }

    get Ano(){
      return this.form.get('ano');
    }
  
    get anoInvalido(){
      return this.Ano?.touched && !this.Ano?.valid;
    }
  
  
    onUpdate(event:Event): void {
      event.preventDefault;
      this.submitted=true;
        if (this.form.invalid){
          return;
        } 
  
      if (this.submitted){
     
      const id = this.activatedRouter.snapshot.params['id'];
      
      this.proyecto=this.form.value;
      this.proyecto.foto = this.imageService.url;
      console.log(this.proyecto.foto);
      this.proyectoS.update(id,this.proyecto).subscribe(
        data => {       
          this.router.navigate(['']);
          }, err => {
          alert("Error al editar proyecto"); 
          this.router.navigate(['']);
          }
        )
      }
    }
  
    onReset(){
      this.form.reset();
      this.submitted=false;
       
    }
  
    onClose(){
      this.router.navigate(['']);
    }
  
    uploadImage($event:any){
      const id = this.activatedRouter.snapshot.params['id'];
      const name = "proyecto_" + id;
        if ($event.target.files && $event.target.files[0]) {
            let file = $event.target.files[0];
            console.log(file);
              if(file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
                this.imageService.uploadImageP($event, name);
                console.log("correct");
                alert("se obtuvo la URL de la foto de proyecto");
              }
              else {
                //call validation
                this.form.reset();
                this.form.controls["foto"].setValidators([Validators.required]);
                this.form.get('foto').updateValueAndValidity();
              }
          }
      }

}
