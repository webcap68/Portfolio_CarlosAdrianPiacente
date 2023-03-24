import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Banner } from 'src/app/model/banner';
import { BannerService } from 'src/app/service/banner.service';
import { ImageService } from 'src/app/service/image.service';


@Component({
  selector: 'app-editbanner',
  templateUrl: './editbanner.component.html',
  styleUrls: ['./editbanner.component.css']
})
export class EditbannerComponent implements OnInit {
  banner : Banner =  null ;
  form : FormGroup;
  
  constructor(private activatedRouter: ActivatedRoute,
    private bannerS : BannerService,
    private router: Router,
    public imageService : ImageService,
    private formBuilder : FormBuilder) {
      this.form=this.formBuilder.group({
        url_fotoB:['',[Validators.required]],
      })
     }



    ngOnInit(): void {
      const id = this.activatedRouter.snapshot.params['id'];
      this.bannerS.detail(id).subscribe(
        data => {
          this.banner = data;
        }, err => {
         alert("Error al modificar"); 
         this.router.navigate(['']);
        }
      )
    }
//metodos para el form
    get URL(){
      return this.form.get("url_fotoB");
    }

    get urlInvalido(){
      return this.URL?.touched && !this.URL.valid;
    }
//guardar la url en la base de datos
    onUpdate($event:Event): void {
      event.preventDefault;
      if (this.form.valid){
        
      const id = this.activatedRouter.snapshot.params['id'];
      this.banner.url_fotoB = this.imageService.urlB;
      this.bannerS.update(id,this.banner).subscribe(
        data => {
          alert("se actualizo el banner");
          this.router.navigate(['']);
          
        }, err => {
         alert("Error al modificar banner"); 
         this.router.navigate(['']);
        }
      )
      } else{
      alert("La url es un dato obligatorio");
      this.form.markAllAsTouched;
      }
    }
  
    uploadImage($event:any){
      const id = this.activatedRouter.snapshot.params['id'];
      const name = "banner_" + id;
      this.imageService.uploadImageB($event, name);
      
    }

    

}
