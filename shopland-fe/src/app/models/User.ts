export class User {
    jwtToken: string;
    name: string;
    email: string;
    role: Role;

    constructor(jwtToken: string, name: string, email: string, role: Role) {
        this.jwtToken = jwtToken;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    hasRole(role: Role): boolean {
        return this.role === role;
    }
}


export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST'
}
