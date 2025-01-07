import {Role, User} from "../models/User.ts";
import {LoginRequest, RegisterRequest} from "../models/Requests.ts";
import {ServerResponse} from "../models/ServerResponse.ts";
import axios from 'axios';
import {SERVER_URL} from "../../env.ts";


const USER_KEY = 'LOGGED_USER';
const LOGIN_URL = SERVER_URL + '/rest/api/auth/login'
const REGISTER_URL = SERVER_URL + '/rest/api/auth/register'

export const saveUser = (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const getUser = (): User | null => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return new User(parsedUser.jwtToken, parsedUser.name, parsedUser.email, parsedUser.role);
    }

    return new User('', 'guest', 'guest', Role.GUEST);
};


export const removeUser = (): void => {
    localStorage.removeItem(USER_KEY);
};

export const loginUser = async (request: LoginRequest): Promise<ServerResponse> => {
    console.log(`loginUser(), request=${JSON.stringify(request)}, url=${LOGIN_URL}`);
    try {
        const response = await axios.post(LOGIN_URL, request);

        const user = response.data;
        if (!user) {
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }

        return new ServerResponse(response.status, user);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}

export const registerUser = async (request: RegisterRequest): Promise<ServerResponse> => {
    console.log(`loginUser(), request=${JSON.stringify(request)}, url=${REGISTER_URL}`);

    try {
        const response = await axios.post(REGISTER_URL, request);

        if (response.status === 400) {
            return new ServerResponse(response.status, undefined);
        }

        return new ServerResponse(response.status, undefined);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}

