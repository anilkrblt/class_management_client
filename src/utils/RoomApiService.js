import axios from "axios";
const baseUrl = "http://localhost:5132/api"

// numeric roomType -> Türkçe tip
function mapRoomType(roomType) {
  switch (roomType) {
    case 0:
      return "Amfi";
    case 2:
      return "Elektrik Laboratuvarı";
    case 5:
      return "Sınıf";
    default:
      return "Sınıf"; // Varsayılan
  }
}

function transformToFirstFormat(rooms) {
  return rooms.map((room) => {
    return {
      // Burada roomId ekleniyor:
      roomId: room.roomId,
      className: room.name,
      capacity: String(room.capacity), // string dönüştürme
      examCapacity: String(room.examCapacity), // string dönüştürme
      block: room.buildingName,
      type: mapRoomType(room.roomType),
      classProperty: "", // API'de karşılığı yoksa boş bırakılabilir
      projection: room.isProjectorWorking ? "Var" : "Yok",
      isClosed: !room.isActive,
    };
  });
}

// GET fonksiyonu
export const getAllRooms = async () => {
  try {
      const response = await axios.get(`${baseUrl}/rooms`);
      return response.data;
  } catch (error) {
      console.error("Hata:", error);
      return [];
  }
};

export const updateRoom = async (roomId, data) => {
    try {
      const response = await axios.put(`${baseUrl}/rooms/${roomId}`, data);
        console.log(response)
        
    } catch (error) {
        
    }
};

export const deleteRoom = async (room) => {

  try {
      await axios.delete(`${baseUrl}/rooms/${room}`);
  
      
  } catch (error) {
      console.error("Hata:", error);
  }
};


export const addRoom = async (room) => {

  try {
    const response = await axios.post(`${baseUrl}/rooms`, room);

    console.log('Lecture added successfully:', response.data);

    return response.data; // Gerekirse yanıtı döndürün
} catch (error) {
    // Hataları yakalayın ve işlem yapın
    console.error('Error adding lecture:', error);

    // Hata mesajını döndürmek isterseniz:
    throw error;
}
};


