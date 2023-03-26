import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';

@Component({
  selector: 'app-neweducacion',
  templateUrl: './neweducacion.component.html',
  styleUrls: ['./neweducacion.component.css']
})
export class NeweducacionComponent implements OnInit {
  nuevaedu : Educacion = null;
  form : FormGroup = new FormGroup({
    nombreE:   new FormControl(''),
    descripcionE: new FormControl(''),
    inicio: new FormControl(''),
    fin: new FormControl('')
  });
  submitted : boolean = false;

  constructor(private educacionS: EducacionService,
  private router: Router,
  private activatedRouter : ActivatedRoute,
  private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      fin:['',[Validators.required,Validators.min(1900),Validators.max(2023)]],
      nombreE:['',[Validators.required,Validators.minLength(2)]],
      inicio:['',[Validators.required,Validators.min(1900),Validators.max(2023)]],
      descripcionE:['',[Validators.required,Validators.maxLength(255)]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get Fin(){
    return this.form.get('fin');
  }

  get finInvalido(){
    return this.Fin?.touched && !this.Fin?.valid;
  }

  get NombreE(){
    return this.form.get('nombreE');
  }

  get nombreEInvalido(){
    return this.NombreE?.touched && !this.NombreE?.valid;
  }

  

  get Inicio(){
    return this.form.get('inicio');
  }

  get inicioInvalido(){
    return this.Inicio?.touched && !this.Inicio?.valid;
  }

  get DescripcionE(){
    return this.form.get('descripcionE');
  }

  get descripcionEInvalido(){
    return this.DescripcionE?.touched && !this.DescripcionE?.valid;
  } 


  onCreate(event:Event): void{
    event.preventDefault;
    this.submitted=true;
      if (this.form.invalid){
        return;
      } 

    if (this.submitted){
    
    const educacion =  this.form.value ;
    this.educacionS.save(educacion).subscribe(
      data =>{
        
      this.router.navigate(['']);
    }, err =>{
      alert("Falló al agregar nueva educacion");
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
}
