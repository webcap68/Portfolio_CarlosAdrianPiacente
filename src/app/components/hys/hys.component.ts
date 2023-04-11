import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  skill : Skill[] = [];
  constructor(private skillS: SkillService, private tokenService: TokenService) { }
  isLogged = false;
  

  ngOnInit(): void {
    this.cargarSkills();
    if(this.tokenService.getToken()){
      this.isLogged = true;
      
    }else{
      this.isLogged = false;
    }
  }

  cargarSkills(): void{
    this.skillS.lista().subscribe(
      data =>{
        this.skill = data;
      }
    )
    
  }

  delete(id : number) {
    if(id != undefined){
      this.skillS.delete(id).subscribe({
        next: (data) => {
                  
          if (data.mensaje=="Skill eliminada exitosamente"){
            console.log("Skill eliminada exitosamente",data);
            this.cargarSkills();
          }
        },
        error: (e) => {
          console.log("algo salio mal",e);
          if (e.error.mensaje=="El ID no existe"){
            alert("El ID del Skill no existe");
            } else if (e.error.status==0){
            alert("Error del cliente");
          } else if (e.error.status==500){
            alert("Error del servidor");
          }
        },
        complete: () => console.log("finalizó el proceso de eliminación"),
        
      } );
            
    }
  }

}
