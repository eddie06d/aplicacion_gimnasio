
import { Product } from './../models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product [] = [
    new Product(1, 'Mancuernas hexagonales con recubrimiento de caucho Pesas de 5 Kg', 'lorem impsum', 170.00, 'https://http2.mlstatic.com/D_NQ_NP_795914-MPE44447127514_122020-O.jpg'),
    new Product(2, 'Pull up bar Barra de dominadas para puerta', 'lorem ipsum', 79.00, 'https://mirfitness.com.ar/wp-content/uploads/2228.jpg'),
    new Product(3, 'Barra Z cromada importada de 150cm', 'lorem ipsum', 99.00, 'https://www.alphagym.store/wp-content/uploads/2020/10/61bgjXw-15L._AC_SX679_.jpg'),
    new Product(4, 'Barra multifuncional 2 en 1 para dominadas , soporte 200kg', 'lorem ipsum', 149.00, 'https://www.mercadazo.com.mx/116358-large_default/barra-dominadas-gym-abdominales-centurfit-ejercicio-pared.jpg'),
    new Product(5, 'Barra Z cromada importada de 150cm', 'lorem ipsum', 99.00, 'https://www.alphagym.store/wp-content/uploads/2020/10/61bgjXw-15L._AC_SX679_.jpg'),
    new Product(6, 'Pull up bar Barra de dominadas para puerta', 'lorem ipsum', 79.00, 'https://mirfitness.com.ar/wp-content/uploads/2228.jpg'),
    new Product(7, 'Mancuernas hexagonales con recubrimiento de caucho Pesas de 5 Kg', 'lorem impsum', 170.00, 'https://http2.mlstatic.com/D_NQ_NP_795914-MPE44447127514_122020-O.jpg'),
    new Product(8, 'Pull up bar Barra de dominadas para puerta', 'lorem ipsum', 79.00, 'https://mirfitness.com.ar/wp-content/uploads/2228.jpg'),
  ];
  constructor() { }
  getProducts(): Product[] {
    return this.products;
  }
}
