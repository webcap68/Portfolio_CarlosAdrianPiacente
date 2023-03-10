import { Component, OnInit } from '@angular/core';
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
  constructor(private activatedRouter: ActivatedRoute,
    private bannerS : BannerService,
    private router: Router,
    public imageService : ImageService ) { }

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

    onUpdate(): void {
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
    }
  
    uploadImage($event:any){
      const id = this.activatedRouter.snapshot.params['id'];
      const name = "banner_" + id;
      this.imageService.uploadImageB($event, name);
      
    }

}
