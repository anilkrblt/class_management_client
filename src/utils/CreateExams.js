import axios from "axios";
import { baseUrl, baseUrl2 } from "./ClubEventApiService";

export const createExams = async (datas) => {
    try {
        const response = await axios.post(`${baseUrl2}examsessions`, datas);
    
    
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);
    
        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
};

export const createExamSession = async (datas) => {
    try {
        const response = await axios.post(`${baseUrl}/exams`, datas);
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);
    
        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
};