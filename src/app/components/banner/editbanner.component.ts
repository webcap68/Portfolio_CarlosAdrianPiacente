import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  form : FormGroup = new FormGroup({
    nombreB:   new FormControl(''),
     url_fotoB: new FormControl('')
  });
  submitted : boolean = false;

  constructor(private activatedRouter: ActivatedRoute,
    private bannerS : BannerService,
    private router: Router,
    public imageService : ImageService,
    private formBuilder : FormBuilder) {}



    ngOnInit(): void {
      this.form=this.formBuilder.group({
        nombreB:['',[Validators.required]],
        url_fotoB:['',[Validators.required]]
      })
      const id = this.activatedRouter.snapshot.params['id'];
      this.bannerS.detail(id).subscribe(
        data => {
          this.banner = data;
        }, err => {
         alert("Error al cargar"); 
         this.router.navigate(['']);
        }
      )
    }

    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }
//metodos para el form
    get Url_fotoB(){
      return this.form.get("url_fotoB");
    }

    get urlBInvalido(){
      return this.Url_fotoB?.touched && !this.Url_fotoB?.valid;
    }

    get NombreB(){
      return this.form.get("nombreB");
    }

    get nombreBInvalido(){
      return this.NombreB?.touched && !this.NombreB?.valid;
    }
//guardar la url en la base de datos
    onUpdate(event:Event): void {
      event.preventDefault;
      this.submitted=true;
      if (this.form.invalid){
        return;
      } 
      if (this.submitted){
      const id = this.activatedRouter.snapshot.params['id'];
      this.banner=this.form.value;
      this.banner.url_fotoB = this.imageService.urlB;
      this.bannerS.update(id,this.banner).subscribe(
        data => {
          //alert("se actualizo el banner");
          this.router.navigate(['']);
          
        }, err => {
         alert("Error al modificar banner"); 
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
      const name = "banner_" + id;
      if ($event.target.files && $event.target.files[0]) {
        let file = $event.target.files[0];
        console.log(file);
          if(file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
          this.imageService.uploadImageB($event, name);
          console.log("correct");
          alert("se obtuvo la URL del nuevo banner");
          }else {
              //call validation
              this.form.reset();
              this.form.controls["url_foto"].setValidators([Validators.required]);
              this.form.get('url_foto').updateValueAndValidity();
            }
        }
      
    }

    

}
