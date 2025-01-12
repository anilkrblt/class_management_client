import axios from "axios";
const baseUrl = "http://localhost:5132/api"


export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/students/${id}`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const getInstructorById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/instructors/${id}`);
        return response.data;
    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};