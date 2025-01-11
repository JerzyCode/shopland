import { ServerResponse } from "../models/ServerResponse";
import { getUser } from "./AuthService";
import { Role } from "../models/User";
import axios from "axios";
import { SERVER_URL } from "../../env";

const URL = SERVER_URL + "/rest/api/orders";

export const getOrderHistory = async (): Promise<ServerResponse> => {
    const user = getUser();
    if (!user || user.role === Role.GUEST) {
        return new ServerResponse(400, { message: "User not authorized." });
    }

    try {
        const response = await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${user.jwtToken}`,
            },
        });

        return new ServerResponse(response.status, response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return new ServerResponse(error.response?.status || 500, error.response?.data);
        } else {
            console.error(error);
            return new ServerResponse(500, { message: "Unknown error occurred" });
        }
    }
};
