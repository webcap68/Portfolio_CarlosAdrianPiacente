import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/model/banner';
import { BannerService } from 'src/app/service/banner.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banner : Banner = null;
  constructor(public bannerS: BannerService, private tokenService: TokenService) { }

  isLogged = false;
  ngOnInit(): void {
    this.cargarBanner();
    if(this.tokenService.getToken()){
      this.isLogged= true;
     
    } else {
      this.isLogged= false;
    }
  }

  cargarBanner(){
    this.bannerS.detail(1).subscribe(data =>
      
      {this.banner= data})
      console.log('this.banner');
    }
  

}
