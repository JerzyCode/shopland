export class LoginRequest {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}


export class RegisterRequest {
    email: string;
    name: string;
    surname: string;
    age: number;
    password: string


    constructor(email: string, name: string, surname: string, age: number, password: string) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.password = password;
    }
}


export class OpinionCommand {
    content: string;
    score: number;


    constructor(content: string, score: number) {
        this.content = content;
        this.score = score;
    }
}
