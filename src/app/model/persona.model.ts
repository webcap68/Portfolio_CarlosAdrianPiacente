export class persona{
    id?: number;
    nombre: string;
    apellido: string;
    descripcion: string;
    email: string;
    url_foto: string;

    constructor(nombre: string , apellido: string , descripcion:string , email:string, url_foto: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.descripcion = descripcion;
        this.email = email;
        this.url_foto = url_foto;
    }
}