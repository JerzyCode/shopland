export class User {
    username: string;
    role: Role;

    constructor(username: string, role: Role) {
        this.username = username;
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
