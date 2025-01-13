import axios from "axios";
export const baseUrl = "http://localhost:5132/api";
export const baseUrl2 = "http://localhost:5132/";

export const getAllClubEvents = async () => {
    try {
        const response = await axios.get(`${baseUrl}/reservations/clubreservations`);
        return response.data;

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const createClubEvent = async (event) => {

    try {
        const response = await axios.post(`${baseUrl}/reservations/clubreservation`, event,
            { headers: {
                'Content-Type': 'multipart/form-data', 
              },}
        );
    
    
        return response.data; // Gerekirse yanıtı döndürün
    } catch (error) {
        // Hataları yakalayın ve işlem yapın
        console.error('Error adding lecture:', error);
    
        // Hata mesajını döndürmek isterseniz:
        throw error;
    }
};

export const changeRequest = async (id, request) => {

    try {
      const response = await axios.put(`${baseUrl}/reservations/clubreservation/updatestatus/${id}`, request,
        { headers: {
            'Content-Type': 'application/json',
          },}
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

export const getClubsById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/clubs/${id}`);
        return response.data;

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};