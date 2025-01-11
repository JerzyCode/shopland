import {ServerResponse} from "../models/ServerResponse.ts";
import {getUser} from "./AuthService.ts";
import {Role} from "../models/User.ts";
import axios from "axios";
import {SERVER_URL} from "../../env.ts";

const URL = SERVER_URL + "/rest/api/cart"


export const getCartForUser = async (): Promise<ServerResponse> => {
    const user = getUser();
    if (user === undefined || user?.role === Role.GUEST) {
        return new ServerResponse(400, {message: 'User wrong token!'});
    }

    try {
        const response = await axios.get(URL, {
            headers: {
                'Authorization': 'Bearer ' + user?.jwtToken
            },
        });

        return new ServerResponse(response.status, response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}

export const deleteProductFromCart = async (productId: number) => {
    const user = getUser();
    if (user === undefined || user?.role === Role.GUEST) {
        return new ServerResponse(400, {message: 'User wrong token!'});
    }

    try {
        const response = await axios.delete(`${URL}/${productId}`, {
            headers: {
                'Authorization': 'Bearer ' + user?.jwtToken
            },
        });
        return new ServerResponse(response.status, {message: 'Successfully Deleted Product.'});

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}

export const addProductToCart = async (productId: number, quantity: number): Promise<ServerResponse> => {
    const user = getUser();
    if (user === undefined || user?.role === Role.GUEST) {
        return new ServerResponse(400, { message: 'User wrong token!' });
    }

    const cartProductCommand = {
        productId,
        quantity,
    };

    try {
        const response = await axios.post(URL, cartProductCommand, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.jwtToken}`,
            },
        });

        return new ServerResponse(response.status, response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, { message: 'Unknown error occurred' });
        }
    }
};
