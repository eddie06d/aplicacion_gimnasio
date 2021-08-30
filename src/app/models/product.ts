export class Product {
    $key: number;
    name: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string;

    constructor(id, name, description, price, imageUrl) {
        this.$key = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}
