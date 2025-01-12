import axios from "axios";

export const getComplaintsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/complaints/ByUser/${userId}`);
        return response.data;

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};