import axios from "axios"
const baseUrl = "http://localhost:5132/api"

export const getAllLectures = async () => {
    try {
        const response = await axios.get(`${baseUrl}/lectures`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const addLecture = async (lecture) => {

    try {
        const response = await axios.post(`${baseUrl}/lectures`, lecture);

        console.log('Lecture added successfully:', response.data);

        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);

        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
};

export const updateLecture = async (lecture) => {
    const lectureId = lecture.code;
    const response = await axios.put(`${baseUrl}/lectures/${lectureId}`, lecture);
    const data = response.data;
    try {
        console.log(data)
        
    } catch (error) {
        console.error("Hata:", error);
    }
};

export const deleteLecture = async (lecture) => {
    const lectureId = lecture.code;
   

    try {
        await axios.delete(`${baseUrl}/lectures/${lectureId}`);
    
        
    } catch (error) {
        console.error("Hata:", error);
    }
};



