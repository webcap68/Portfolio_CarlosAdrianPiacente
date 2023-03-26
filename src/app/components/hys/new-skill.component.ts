import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {
  form : FormGroup = new FormGroup({
    nombre:   new FormControl(''),
    porcentaje: new FormControl('')
  });
  submitted : boolean = false;
  
  constructor(private skillS : SkillService, 
  private router : Router,
  private activatedRouter : ActivatedRoute,
  private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      porcentaje:['',[Validators.required,Validators.min(0),Validators.max(100)]],
      nombre:['',[Validators.required,Validators.maxLength(12)]]
    })
  }

 
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get Porcentaje(){
    return this.form.get('porcentaje');
  }

  get porcentajeInvalido(){
    return this.Porcentaje?.touched && !this.Porcentaje?.valid;
  }

  get Nombre(){
    return this.form.get('nombre');
  }

  get nombreInvalido(){
    return this.Nombre?.touched && !this.Nombre?.valid;
  }
  onCreate(event:Event): void{
    event.preventDefault;
    this.submitted=true;
      if (this.form.invalid){
        return;
      } 

    if (this.submitted){
    const skill = this.form.value;
    this.skillS.save(skill).subscribe(
      data=> {
        
        this.router.navigate(['']);
      }, err =>{
        alert("Falló al crear el Skill");
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
