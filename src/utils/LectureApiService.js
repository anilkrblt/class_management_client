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

export const getLecturesByRoomId = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/rooms/${id}`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const getLecturesByStudentId = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/students/${id}`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const getLecturesByInstructorId = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/instructors/${id}/lectures`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const getScheduleByInstructorId = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/instructors/${id}`);
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

export const updateLecture = async (lectureId, data) => {

    try {
        const response = await axios.put(`${baseUrl}/lectures/${lectureId}`, data,
            
        );
          console.log(response)
          
      } catch (error) {
          
      }
};

export const deleteLecture = async (lecture) => {

    try {
        await axios.delete(`${baseUrl}/lectures/${lecture}`);
    
        
    } catch (error) {
        console.error("Hata:", error);
    }
};

export const addInstructor = async (instructorId,lectureCode) => {
    try {
        const response = await axios.post(`${baseUrl}/lectures/api/lecture/assign?instructorId=${instructorId}&lectureCode=${lectureCode}`);
        console.log('Lecture added successfully:', response.data);
    } catch (error) {
        alert("Hata!" ,error)
    }
}

export const deleteInstructor = async (instructorId,lectureCode) => {
    try {
        const response = await axios.post(`${baseUrl}/lectures/api/lecture/assign?instructorId=${instructorId}` ,lectureCode);
        console.log('Lecture added successfully:', response.data);
    } catch (error) {
        alert("Hata!" ,error)
    }
}


