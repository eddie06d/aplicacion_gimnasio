
import { Product } from './product';
export class CartItemModel {
    productId: number;
    productName: string;
    productImgUrl: string;
    productPrice: number;
    qty: number;
    constructor(product: Product) {
        this.productId = product.$key;
        this.productName = product.nombre;
        this.productImgUrl = product.image;
        this.productPrice = product.precio;
        this.qty = 1;
    }
}
