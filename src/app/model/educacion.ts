export class Educacion {
    id: number;
    nombreE: string;
    descripcionE: string;
    inicio : number;
    fin : number;

    constructor(nombreE: string, descripcionE: string, inicio: number, fin: number){
        this.nombreE=nombreE;
        this.descripcionE=descripcionE;
        this.inicio = inicio;
        this.fin = fin;
    }
}
