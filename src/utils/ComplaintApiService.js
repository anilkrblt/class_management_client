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

export const getComplaintsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/complaints/ByUser/${userId}`);
        return response.data;

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
};

export const createComplaint = async (complaint) => {

    try {
        const response = await axios.post(`${baseUrl}/complaints`, complaint,
           { headers: {
                'Content-Type': 'multipart/form-data',  // Dosya yüklemesi için doğru Content-Type
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

export const updateComplaint = async (id, complaint) =>{
    try {
        const response = await axios.put(`${baseUrl}/complaints/${id}/update-status`, complaint,
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

export const deleteComplaint = async (id) => {
  
    try {
      const response = await axios.delete(`${baseUrl}/complaints/${id}`)

  
      console.log("Başarılı silme:", response.data);
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };
