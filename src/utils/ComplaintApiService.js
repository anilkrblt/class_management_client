import axios from "axios";
const baseUrl = "http://localhost:5132/api"

export const getAllComplaints = async () => {
    try {
        const response = await axios.get(`${baseUrl}/complaints`);
        return response.data;

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const createComplaint = async (complaint) => {

    try {
        const response = await axios.post(`${baseUrl}/complaints`, complaint);
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);

        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
};

