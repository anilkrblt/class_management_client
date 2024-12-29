import axios from "axios"
const baseUrl = "http://localhost:5132/api"

export const getAllInstructors = async () => {
    try {
        const response = await axios.get(`${baseUrl}/instructors`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};