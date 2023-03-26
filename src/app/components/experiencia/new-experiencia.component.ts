import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {
  nuevaexp : Experiencia = null;
  form : FormGroup = new FormGroup({
    nombreE:   new FormControl(''),
    descripcionE: new FormControl(''),
    inicio: new FormControl(''),
    fin: new FormControl('')
  });
  submitted : boolean = false;

  constructor(private sExperiencia: SExperienciaService,
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


  onCreate(event:Event): void {
    event.preventDefault;
    this.submitted=true;
      if (this.form.invalid){
        return;
      } 

    if (this.submitted){
    //const expe = new Experiencia(this.nombreE, this.descripcionE, this.inicio, this.fin);
    const expe = this.form.value;
    this.sExperiencia.save(expe).subscribe(
      data=>{
        
        this.router.navigate(['']);
      },err =>{
        alert("Falló al agregar");
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
