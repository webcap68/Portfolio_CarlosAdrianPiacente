import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css']
})
export class NewproyectoComponent implements OnInit {
  nuevopro : Proyecto = null;
  form : FormGroup = new FormGroup({
    nombreE:   new FormControl(''),
    descripcionE: new FormControl(''),
    inicio: new FormControl(''),
    fin: new FormControl('')
  });
  submitted : boolean = false;
  urlgenerica: string = 'https://firebasestorage.googleapis.com/v0/b/frontendcap68.appspot.com/o/proyectos%2Fimagenaeditar.jpg?alt=media&token=9d8b49e7-7639-4b56-a234-75f3b64e359c';

  constructor(private proyectoS: ProyectoService,
  private router: Router,
  private activatedRouter : ActivatedRoute,
  public imageService : ImageService,
  private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      url:['',[Validators.required]],
      foto:[this.urlgenerica,[Validators.required]],
      ano:['',[Validators.required,Validators.min(1980),Validators.max(2023)]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get Ano(){
    return this.form.get('ano');
  }

  get anoInvalido(){
    return this.Ano?.touched && !this.Ano?.valid;
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

  get descripcionEInvalido(){
    return this.Descripcion?.touched && !this.Descripcion?.valid;
  } 

  get Url(){
    return this.form.get('url');
  }

  get urlInvalido(){
    return this.Url?.touched && !this.Url?.valid;
  } 


  onCreate(event:Event): void{
    event.preventDefault;
    this.submitted=true;
      if (this.form.invalid){
        return;
      } 

    if (this.submitted){
    
    const proyecto =  this.form.value ;
    this.proyectoS.save(proyecto).subscribe(
      data =>{
        
      this.router.navigate(['']);
    }, err =>{
      alert("Falló al agregar nuevo proyecto");
      this.router.navigate(['']);
    }
    )
  }
}

// uploadImage($event:any){
//   const id = this.activatedRouter.snapshot.params['id'];
//   const name = "proyecto_" + id;
//     if ($event.target.files && $event.target.files[0]) {
//         let file = $event.target.files[0];
//         console.log(file);
//           if(file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
//             this.imageService.uploadImageP ($event, name);
//             console.log("correct");
//             alert("se obtuvo la URL de la foto de perfil");
//           }
//           else {
//             //call validation
//             this.form.reset();
//             this.form.controls["url_foto"].setValidators([Validators.required]);
//             this.form.get('url_foto').updateValueAndValidity();
//           }
//       }
//   }

onReset(){
  this.form.reset();
  this.submitted=false;
   
}

onClose(){
  this.router.navigate(['']);
}
}
