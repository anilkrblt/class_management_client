import axios from "axios";

const transformData = (rooms) => {
  const events = [];

  rooms.forEach((room) => {
    room.lectures.forEach((lecture) => {
      // Gün bilgisi ve başlangıç tarihi
      const daysMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      };

      const today = new Date();
      const todayDayIndex = today.getDay();
      const lectureDayIndex = daysMap[lecture.dayOfWeek];

      // Hedef günü hesapla
      const diff = (lectureDayIndex - todayDayIndex + 7) % 7;
      const lectureDate = new Date();
      lectureDate.setDate(today.getDate() + diff);

      // Saatleri ayarla
      const [startHour, startMinute, startSecond] = lecture.startTime.split(":").map(Number);
      const [endHour, endMinute, endSecond] = lecture.endTime.split(":").map(Number);

      const startDate = new Date(lectureDate);
      startDate.setHours(startHour, startMinute, startSecond);

      const endDate = new Date(lectureDate);
      endDate.setHours(endHour, endMinute, endSecond);

      // Event nesnesini oluştur
      events.push({
        title: lecture.lectureName,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        rule: {
          freq: 2, // Haftalık tekrar
          interval: 1,
          count: 12, // 12 tekrar
        },
        location: `${room.buildingName} Blok ${room.name}`,
      });
    });
  });

  return events;
};

const getAllRooms = async () => {
  try {
    const response = await axios.get("http://localhost:5132/api/rooms");

    console.log(response.data)

    if (response.data && Array.isArray(response.data)) {
      const transformedData = transformData(response.data);
      console.log(transformData)
      return transformedData;
    } else {
      console.error("Beklenmedik veri formatı:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export default getAllRooms;
