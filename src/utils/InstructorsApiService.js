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

export const addExtraLecture = async (lecture) => {
    try {
        const response = await axios.post(`${baseUrl}/reservations/lecturereservation`, lecture,
        );
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);

        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
}

export const changeLectureRoomTime = async (id, lecture) =>{
    try {
        const response = await axios.put(`${baseUrl}/lecturesessions/${id}`, lecture,         
        );
        console.log('Lecture added successfully:', response.data);
    
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);
    
        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
}

export const deleteLectureSession = async (id, lecture) =>{
    try {
        const response = await axios.delete(`${baseUrl}/lecturesessions/${id}`,         
        );
        console.log('Lecture added successfully:', response.data);
    
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);
    
        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
}