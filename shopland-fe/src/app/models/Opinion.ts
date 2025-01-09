export class Opinion {
    id: number;
    productId: number;
    productName: string;
    userEmail: string;
    content: string;
    value: number;


    constructor(id: number, productId: number, productName: string, userEmail: string, content: string, value: number) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.userEmail = userEmail;
        this.content = content;
        this.value = value;
    }

}
