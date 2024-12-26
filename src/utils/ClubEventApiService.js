import axios from "axios";
const baseUrl = "http://localhost:5132/api";

export const getAllClubEvents = async () => {
    try {
        const response = await axios.get(`${baseUrl}/xxxx`);
        return response.data;

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const createClubEvent = async (event) => {

    try {
        const response = await axios.post(`${baseUrl}/xxxx`, event);
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);

        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
};

