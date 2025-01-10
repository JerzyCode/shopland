export class ProductCart {
    productId: number;
    quantity: number;
    price: number;


    constructor(productId: number, quantity: number, price: number) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }
}
