import axios from "axios";
import { baseUrl, baseUrl2 } from "./ClubEventApiService";

export const createExams = async (dates) => {

    const examDates= {dates: dates}
    try {
        const response = await axios.post(`${baseUrl2}examsessions`, examDates);
    
    
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);
    
        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
};