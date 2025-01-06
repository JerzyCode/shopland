import {Role, User} from "../models/User.ts";


const USER_KEY = 'LOGGED_USER';

export const saveUser = (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const getUser = (): User | null => {
    const storedUser = localStorage.getItem(USER_KEY);
    // return storedUser ? JSON.parse(storedUser) : new User('Guest', Role.GUEST);
    return storedUser ? JSON.parse(storedUser) : new User('User', Role.USER);
};


export const removeUser = (): void => {
    localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = (): boolean => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (!storedUser) {
        return false;
    }

    const user = JSON.parse(storedUser);
    return !!(user && user.username && user.role);


}
