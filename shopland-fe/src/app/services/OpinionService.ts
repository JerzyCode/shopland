import {getUser} from "./AuthService.ts";
import {Role} from "../models/User.ts";
import {ServerResponse} from "../models/ServerResponse.ts";
import axios from "axios";
import {OpinionCommand} from "../models/Requests.ts";
import {SERVER_URL} from "../../env.ts";

const URL = SERVER_URL + "/rest/api/opinion"

export const getOpinionsForUser = async (): Promise<ServerResponse> => {
    const user = getUser();
    if (user === undefined || user?.role === Role.GUEST) {
        return new ServerResponse(400, {message: 'User wrong token!'});
    }

    try {
        const response = await axios.get(`${URL}/user`, {
            headers: {
                'Authorization': 'Bearer ' + user?.jwtToken
            }
        });

        return new ServerResponse(200, response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}


export const getOpinionsForProduct = async (productId: number): Promise<ServerResponse> => {
    try {
        const response = await axios.get(`${URL}/products/${productId}`);

        return new ServerResponse(200, response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}


export const addOpinionForProduct = async (productId: number, command: OpinionCommand): Promise<ServerResponse> => {
    const user = getUser();
    if (user === undefined || user?.role === Role.GUEST) {
        return new ServerResponse(400, {message: 'User wrong token!'});
    }

    try {
        const response = await axios.post(`${URL}/products/${productId}`, command, {
            headers: {
                'Authorization': 'Bearer ' + user?.jwtToken
            },
        });

        if (response.status == 400) {
            return new ServerResponse(400, {message: 'You already added opinion for that product.'});
        }

        return new ServerResponse(response.status, {message: 'Opinion Added Successfully'});
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}


export const updateOpinion = async (opinionId: number, command: OpinionCommand): Promise<ServerResponse> => {
    const user = getUser();
    if (user === undefined || user?.role === Role.GUEST) {
        return new ServerResponse(400, {message: 'User wrong token!'});
    }

    try {
        const response = await axios.put(`${URL}/${opinionId}`, command, {
            headers: {
                'Authorization': 'Bearer ' + user?.jwtToken
            },
        });

        if (response.status == 403) {
            return new ServerResponse(403, {message: 'You cannot update other user opinion.'});
        }

        return new ServerResponse(response.status, {message: 'Opinion Updated Successfully'});
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}


export const deleteOpinion = async (opinionId: number): Promise<ServerResponse> => {
    const user = getUser();
    if (user === undefined || user?.role === Role.GUEST) {
        return new ServerResponse(400, {message: 'User wrong token!'});
    }

    try {
        const response = await axios.put(`${URL}/${opinionId}`, {
            headers: {
                'Authorization': 'Bearer ' + user?.jwtToken
            },
        });

        if (response.status == 403) {
            return new ServerResponse(403, {message: 'You cannot delete that opinion.'});
        }

        return new ServerResponse(response.status, {message: 'Opinion Deleted Successfully'});
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, {message: 'Unknown error occurred'});
        }
    }
}

