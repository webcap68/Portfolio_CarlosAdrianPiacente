import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent implements OnInit {
  persona : persona =  null ;
  form : FormGroup = new FormGroup({
    nombre:   new FormControl(''),
    apellido: new FormControl(''),
    descripcion: new FormControl(''),
    email: new FormControl(''),
    url_foto: new FormControl('')

  });
  submitted : boolean = false;

  constructor(private activatedRouter: ActivatedRoute,
    private personaService : PersonaService,
    private router: Router,
    public imageService : ImageService,
    private formBuilder : FormBuilder) {}
      

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      url_foto:['',[Validators.required]],
      nombre:['',[Validators.required,Validators.minLength(2)]],
      apellido:['',[Validators.required,Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      descripcion:['',[Validators.required,Validators.maxLength(255)]]
    })
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.detail(id).subscribe(
      data => {this.persona = data}
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

  
  get Url_foto(){
    return this.form.get('url_foto');
  }

  get urlInvalido(){
    return this.Url_foto?.touched && !this.Url_foto?.valid;
  }

  get Nombre(){
    return this.form.get('nombre');
  }

  get nombreInvalido(){
    return this.Nombre?.touched && !this.Nombre?.valid;
  }

  

  get Apellido(){
    return this.form.get('apellido');
  }

  get apellidoInvalido(){
    return this.Apellido?.touched && !this.Apellido?.valid;
  }

  get Descripcion(){
    return this.form.get('descripcion');
  }

  get descripcionInvalido(){
    return this.Descripcion?.touched && !this.Descripcion?.valid;
  } 

  get Email(){
    return this.form.get('email');
  }

  get emailInvalido(){
    return this.Email?.touched && !this.Email?.valid;
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
    this.persona.url_foto = this.imageService.url;
    this.personaService.update(id,this.persona).subscribe(
      data => {       
        this.router.navigate(['']);
        }, err => {
        alert("Error al modificar persona"); 
        this.router.navigate(['']);
        }
      )
    }
  }

  onReset(){
    this.form.reset();
    this.submitted=false;
     
  }

  uploadImage($event:any){
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "perfil_" + id;
   
    {
        if ($event.target.files && $event.target.files[0]) {
          let file = $event.target.files[0];
          console.log(file);
            if(file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
              this.imageService.uploadImage($event, name);
              console.log("correct");
            }
            else {
              //call validation
              this.form.reset();
              this.form.controls["url_foto"].setValidators([Validators.required]);
              this.form.get('url_foto').updateValueAndValidity();
            }
        }
    }
   
  }

}
