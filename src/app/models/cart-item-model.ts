
import { Product } from './product';
export class CartItemModel {
    productId: number;
    productName: string;
    productImgUrl: string;
    productPrice: number;
    qty: number;
    constructor(product: Product) {
        this.productId = product.$key;
        this.productName = product.name;
        this.productImgUrl = product.imageUrl;
        this.productPrice = product.price;
        this.qty = 1;
    }
}
