import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {
  skill : Skill = null;
  form : FormGroup = new FormGroup({
    nombre:   new FormControl(''),
    porcentaje: new FormControl('')
  });
  submitted : boolean = false;

  constructor(
    private skillS: SkillService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      porcentaje:[0,[Validators.required,Validators.min(0),Validators.max(100)]],
      nombre:['',[Validators.required,Validators.minLength(2),Validators.maxLength(12)]]
    })
    const id = this.activatedRouter.snapshot.params['id'];
    this.skillS.detail(id).subscribe(
      data =>{
        this.skill = data;
      }, err=>{
        alert("error al cargar la skill");
        this.router.navigate(['']);
      }
    );
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

  
  onUpdate(event:Event) : void{
    event.preventDefault;
    this.submitted=true;
      if (this.form.invalid){
        return;
      } 

    if (this.submitted){
    const id= this.activatedRouter.snapshot.params['id'];
    this.skill = this.form.value;
    this.skillS.update(id,this.skill).subscribe(
      data =>{
        this.router.navigate(['']);
      }, err =>{
        alert("error al modificar la skill");
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