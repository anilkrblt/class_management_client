import axios from "axios";
import { baseUrl } from "./ClubEventApiService";

export const LoginApiService = async (login) => {

    try {
        const response = await axios.post(`${baseUrl}/auth/login`,login);
    
        console.log(response)
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);
    
        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
};