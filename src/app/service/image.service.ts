import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL, list } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";
  urlB: string = "";
  urlP: string = "";
  constructor(private storage: Storage) { }

  public uploadImage($event: any , name :  string){
    
    const  file = $event.target.files[0];
    console.log(file); 
    const imgRef = ref(this.storage, `imagen/` + name)
    uploadBytes(imgRef, file)
    .then(response => {this.getImages()})
    .catch(error => {console.log(error)})
  }

  public uploadImageB($event: any , name :  string){
    
    const  file = $event.target.files[0];
    console.log(file); 
    const imgRef = ref(this.storage, `banner/` + name)
    uploadBytes(imgRef, file)
    .then(response => {this.getImagesB()})
    .catch(error => {console.log(error)})
  }

  public uploadImageP($event: any , name :  string){
    
    const  file = $event.target.files[0];
    console.log(file); 
    const imgRef = ref(this.storage, `proyectos/` + name)
    uploadBytes(imgRef, file)
    .then(response => {this.getImagesP()})
    .catch(error => {console.log(error)})
  }

  getImagesB(){
    
    const imagesRef = ref(this.storage, 'banner')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items) {
        this.urlB = await getDownloadURL(item);
        console.log("la url es: " + this.urlB);
      }
    })
    .catch(error => {console.log(error)})
    
  }

  getImages(){
    
    const imagesRef = ref(this.storage, 'imagen')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items) {
        this.url = await getDownloadURL(item);
        console.log("la url es: " + this.url);
      }
    })
    .catch(error => {console.log(error)})
  }

  getImagesP(){
    
    const imagesRef = ref(this.storage, 'proyectos')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items) {
        this.urlP = await getDownloadURL(item);
        console.log("la url es: " + this.urlP);
      }
    })
    .catch(error => {console.log(error)})
    
  }
}
