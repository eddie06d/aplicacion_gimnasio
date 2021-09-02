export class Product {
    $key: number;
    nombre: string;
    categoria: string;
    descripcion: string;
    precio: number;
    image: string;
    // Atributo para determinar en que seccion va el producto 
    tipo  : string ;  
    stock : number;    

    constructor(id, name,category,description, price, imageUrl,tipo,stock) {
        this.$key = id;
        this.nombre = name; 
        this.categoria = category;
        this.descripcion = description;
        this.precio = price;
        this.image = imageUrl;
        this.tipo = tipo;
        this.stock = stock;
    }
}
