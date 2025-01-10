import {ProductCart} from "./ProductCart.ts";

export class Cart {
    products: ProductCart[];
    totalPrice: number;


    constructor(products: ProductCart[], totalPrice: number) {
        this.products = products;
        this.totalPrice = totalPrice;
    }
}
