export class ProductCart {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    imageUrl: string;


    constructor(productId: number, productName: string, quantity: number, price: number, imageUrl: string) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}
