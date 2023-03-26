import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {
  expLab : Experiencia = null;
  form : FormGroup = new FormGroup({
    nombreE:   new FormControl(''),
    descripcionE: new FormControl(''),
    inicio: new FormControl(''),
    fin: new FormControl('')
  });
  submitted : boolean = false;

  constructor(private sExperiencia: SExperienciaService,
    private activatedRouter : ActivatedRoute,
    private router: Router,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      fin:['',[Validators.required,Validators.min(1900),Validators.max(2023)]],
      nombreE:['',[Validators.required,Validators.minLength(2)]],
      inicio:['',[Validators.required,Validators.min(1900),Validators.max(2023)]],
      descripcionE:['',[Validators.required,Validators.maxLength(255)]]
    })
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.detail(id).subscribe(
      data =>{this.expLab = data}
      , err =>{
        alert("Error al cargar el dato de Experiencia");
        this.router.navigate(['']);
      }
    );
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

  //metodos para el form
  onUpdate(event:Event) : void{
    event.preventDefault;
    this.submitted=true;
      if (this.form.invalid){
        return;
      } 

    if (this.submitted){
    const id = this.activatedRouter.snapshot.params['id'];
    this.expLab=this.form.value;
    this.sExperiencia.update(id, this.expLab).subscribe(
      data => {
        this.router.navigate(['']);
      }, err =>{
        alert("Error al editar ");
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

