import {ProductCart} from "./ProductCart.ts";

class Cart {
    products: ProductCart[];
    totalPrice: number;


    constructor(products: ProductCart[], totalPrice: number) {
        this.products = products;
        this.totalPrice = totalPrice;
    }
}
