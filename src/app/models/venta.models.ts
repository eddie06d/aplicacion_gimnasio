import { Product } from "../models/product";
import { CartItemModel } from "./cart-item-model";

export class Ventas{
    
    productos : Product ;    // Nombre y cantidad
    // cantidad : number;
    cliente : string;
    productId: number;
    productName: string;
    qty: number;
    constructor(product: Product, cliente : string, Carrito : CartItemModel ) {
        this.productId = product.$key;
        this.productName = product.nombre;
        this.qty = 1;
    }


    
}