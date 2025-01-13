import axios from "axios";
import { baseUrl } from "./ClubEventApiService";

export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/students/${id}`);
        return response.data;

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};