import axios from 'axios';
import { SERVER_URL } from '../../env.ts';
import { ServerResponse } from '../models/ServerResponse.ts';

const URL = SERVER_URL + '/rest/api/products';

export const getProductDetails = async (productId: number): Promise<ServerResponse> => {
    try {
        const response = await axios.get(`${URL}/${productId}`);

        return new ServerResponse(200, response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, { message: 'Unknown error occurred' });
        }
    }
};