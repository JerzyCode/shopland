export class ProductCart {
    productId: number;
    productName: string;
    quantity: number;
    price: number;


    constructor(productId: number, productName: string, quantity: number, price: number) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }
}
