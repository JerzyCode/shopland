import {Role, User} from "../models/User.ts";


const USER_KEY = 'LOGGED_USER';

export const saveUser = (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const getUser = (): User | null => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : new User('Guest', Role.GUEST);
};


export const removeUser = (): void => {
    localStorage.removeItem(USER_KEY);
};
