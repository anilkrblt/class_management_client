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
    const data = response.data; // API'den gelen orijinal data

    // Dizi mi kontrolü
    if (Array.isArray(data)) {
      // 2. şekilde gelen veriyi 1. şekle dönüştürüyoruz
      const transformedData = transformToFirstFormat(data);

      console.log("Dönüştürülen veri:", transformedData);
      return transformedData;
    } else {
      console.error("Beklenmedik veri formatı:", data);
      return [];
    }
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const updateRoom = async (room) => {
    const roomId = room.roomId;
    const response = await axios.put(`${baseUrl}/rooms/${roomId}`, room);
    const data = response.data;
    try {
        console.log(data)
        
    } catch (error) {
        
    }
};

export const deleteRoom = async (room) => {

    try {
        console.log(room.roomId)
        
    } catch (error) {
        
    }
};


export const addRoom = async (room) => {

    try {
        console.log(room)
        
    } catch (error) {
        
    }
};


