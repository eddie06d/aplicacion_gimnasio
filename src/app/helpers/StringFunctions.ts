import { Product } from "../models/product";
export class StringFunctions {
  // Devuelve un array de palabras separandolos por espacios y haciendo 1º letra mayuscula y el resto minuscula
  static capitalizePhrase(phrase: string): string {
    let words = phrase.split(' ');
    for(let i=0; i<words.length; i++) {
      const partUpper = words[i].charAt(0).toLocaleUpperCase();
      const partLower = words[i].slice(1).toLowerCase();
      words[i] = partUpper + partLower;
    }
    return words.join(' ');
  }

  static BuscarProducto(id : number, productos : Product []) : Product{
  
    for(let i=0;i<productos.length;i++){
        
        if(productos[i].$key === id){

            return productos[i];
            break;
        }
    }
    return null;
  }

  static FiltraProdByCategoria(productos : Product [], categoria : string) : Product[] {

    let Prods =  [];
    for(let value of productos){

          if(value.categoria == categoria){
            Prods.push(value);
          }
    }
    return Prods;
  }




}
