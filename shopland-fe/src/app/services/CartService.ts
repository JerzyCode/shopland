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

        if (response.status == 403) {
            return new ServerResponse(403, {message: 'You cannot delete that opinion.'});
        }

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
