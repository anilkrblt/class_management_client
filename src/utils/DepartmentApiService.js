import axios from "axios";
const baseUrl = "http://localhost:5132/api"

export const getAllDepartments = async () => {
    try {
        const response = await axios.get(`${baseUrl}/Department`);
        return response.data;

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};