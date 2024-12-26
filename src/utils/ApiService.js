import axios from "axios";

const getAllRooms = async () => {
  //   roomName , capacity,examCapacity , projectStatus, classType, classDepartment, buildingName
  // isActive // o günkü olan derslerin adı ve ders saati bilgisi hocası ve bölümüyle birlikte...

  try {
    const response = await axios.get("http://localhost:5132/api/rooms");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
  } 
}; 
export default getAllRooms;

const getAllComplaints = async () => {
  // instructorName, studentname, content, roomName, contentPhoto, status, createdAt, updatedAt,
  try {
    const response = await axios.get("https://api.example.com/data/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
  }
};

const getAllLectures = async () => {
  // instructorNameForLecture, dersAdı, derskodu, bölüm, sınıf, dönem, departman
  try {
    const response = await axios.get("https://api.example.com/data/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
  }
};

const getExam = async () => {
  // ders adı bölüm saat sınıflar tarih, bölüm, sınıf, dönem?
  try {
    const response = await axios.get("https://api.example.com/data/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
  }
};

const getUserInformation = async () => {
  // ad soyad, öğrencino, personelno, eposta,fuckülte, bölüm, sınıf
  try {
    const response = await axios.get("https://api.example.com/data/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
  }
};

const getClubEventsReservation = async () => {
  // öğrenci adı soyadı, sınıf, tarih, başlangıç saat, bitiş saati
  // detaylar, eventslink, clubName, clupIcon, kulüp adı, etkinlik adı, afiş
  try {
    const response = await axios.get("https://api.example.com/data/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Hata:", error);
  }
};

const putClubReservationConfirm = async (id, updatedData) => {
  // etkinlik isteğini kabul etmek reddetmek
  const url = `https://api.example.com/classrooms/${id}`; // Güncelleme URL'si

  try {
    const response = await axios.put(url, updatedData, {
      headers: {
        "Content-Type": "application/json", // JSON formatında veri gönderimi
      },
    });

    console.log("Başarılı güncelleme:", response.data);
  } catch (error) {
    console.error("Güncelleme hatası:", error);
  }
};

const postCreateClubEvent = async (
  clubId,
  eventName,
  roomId,
  date,
  startTime,
  endTime,
  details,
  banner,
  link
) => {
  //  kulüp adı, etkinlik adı, sınıf,  tarih, başlangıç saat, bitiş saati, link
  try {
    // Gönderilecek veri
    const payload = {
      clubId,
      eventName,
      roomId,
      date,
      startTime,
      endTime,
      details,
      banner,
      link,
    };

    // POST isteği
    const response = await axios.post(
      "https://api.example.com/extra-lessons",
      payload
    );

    console.log("Ek ders başarıyla kaydedildi:", response.data);
    return response.data; // Yanıtı döndürebilirsiniz
  } catch (error) {
    console.error("Ek ders eklenirken hata oluştu:", error);
    if (error.response) {
      console.error("Sunucu Hatası:", error.response.data);
    } else if (error.request) {
      console.error("İstek Hatası:", error.request);
    } else {
      console.error("Hata Mesajı:", error.message);
    }
    throw error; // Hata fırlatmak isteyebilirsiniz
  }
};

const postComplaint = async (title, place, details, photos, id, type) => {
  try {
    // Gönderilecek veri
    const payload = {
      id,
      type,
      title,
      place,
      details,
      photos, // Eğer photos bir dosya ise FormData kullanmanız gerekebilir
    };

    // POST isteği
    const response = await axios.post(
      "https://api.example.com/complaints",
      payload
    );

    console.log("Şikayet gönderildi:", response.data);
    return response.data; // Yanıtı döndürebilirsiniz
  } catch (error) {
    console.error("Şikayet gönderilirken hata oluştu:", error);
    if (error.response) {
      console.error("Sunucu Hatası:", error.response.data);
    } else if (error.request) {
      console.error("İstek Hatası:", error.request);
    } else {
      console.error("Hata Mesajı:", error.message);
    }
    throw error; // Hata fırlatmak isteyebilirsiniz
  }
};

const postExtraLesson = async (lectureCode, date, startTime, endTime, room) => {
  try {
    // Gönderilecek veri
    const payload = {
      lectureCode,
      date,
      startTime,
      endTime,
      room,
    };

    // POST isteği
    const response = await axios.post(
      "https://api.example.com/extra-lessons",
      payload
    );

    console.log("Ek ders başarıyla kaydedildi:", response.data);
    return response.data; // Yanıtı döndürebilirsiniz
  } catch (error) {
    console.error("Ek ders eklenirken hata oluştu:", error);
    if (error.response) {
      console.error("Sunucu Hatası:", error.response.data);
    } else if (error.request) {
      console.error("İstek Hatası:", error.request);
    } else {
      console.error("Hata Mesajı:", error.message);
    }
    throw error; // Hata fırlatmak isteyebilirsiniz
  }
};

const putChangeLessonTime = async (id, updatedData) => {
  // ders adı, başlangıç saati, bitiş saati, gün, sınıf
  const url = `https://api.example.com/classrooms/${id}`; // Güncelleme URL'si

  try {
    const response = await axios.put(url, updatedData, {
      headers: {
        "Content-Type": "application/json", // JSON formatında veri gönderimi
      },
    });

    console.log("Başarılı güncelleme:", response.data);
  } catch (error) {
    console.error("Güncelleme hatası:", error);
  }
};

const deleteLesson = async (id) => {
  //ders adı, başlangıç saati, bitiş saati
  //  tarih ders iptal olsun
  const url = `https://api.example.com/classrooms/${id}`; // Silinecek öğenin URL'si

  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json", // Opsiyonel, API gerektiriyorsa eklenebilir
      },
    });

    console.log("Başarılı silme:", response.data);
  } catch (error) {
    console.error("Silme hatası:", error);
  }
};

const deleteRoom = async (id) => {
  //ders adı, başlangıç saati, bitiş saati
  //  tarih ders iptal olsun
  const url = `https://api.example.com/classrooms/${id}`; // Silinecek öğenin URL'si

  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json", // Opsiyonel, API gerektiriyorsa eklenebilir
      },
    });

    console.log("Başarılı silme:", response.data);
  } catch (error) {
    console.error("Silme hatası:", error);
  }
};

const postClassroom = async (
  classId,
  className,
  capacity,
  examCapacity,
  property,
  block,
  classType
) => {
  // sınıf adı, kapasitesi, sınav kapasitesi, sınıf özelliği, block, derslik tipi(sınıf,amfi)
  //yeni sınıf oluştur projeksiyon ve isactive default true olsun

  try {
    // Gönderilecek veri
    const payload = {
      classId,
      className,
      capacity,
      examCapacity,
      property,
      block,
      classType,
      isProjection: true,
      isActive: true,
    };

    // POST isteği
    const response = await axios.post(
      "https://api.example.com/extra-lessons",
      payload
    );

    console.log("Ek ders başarıyla kaydedildi:", response.data);
    return response.data; // Yanıtı döndürebilirsiniz
  } catch (error) {
    console.error("Ek ders eklenirken hata oluştu:", error);
    if (error.response) {
      console.error("Sunucu Hatası:", error.response.data);
    } else if (error.request) {
      console.error("İstek Hatası:", error.request);
    } else {
      console.error("Hata Mesajı:", error.message);
    }
    throw error; // Hata fırlatmak isteyebilirsiniz
  }
};

const putClassroom = async (id, updatedData) => {
  // sınıf adı, kapasitesi, sınav kapasitesi, sınıf özelliği, block, derslik tipi(sınıf,amfi)
  //projeksiyon ve isActive update olabilecek

  // `id` güncellenecek sınıfın kimliği, `updatedData` güncellenmek istenen özellikleri içeren obje
  const url = `https://api.example.com/classrooms/${id}`; // Güncelleme URL'si

  try {
    const response = await axios.put(url, updatedData, {
      headers: {
        "Content-Type": "application/json", // JSON formatında veri gönderimi
      },
    });

    console.log("Başarılı güncelleme:", response.data);
  } catch (error) {
    console.error("Güncelleme hatası:", error);
  }
};

const postLesson = async (
  lectureCode,
  lectureName,
  department,
  grade,
  session,
  instructorId
) => {
  //ders adı, ders kodu, bölüm, sınıf, dönem, öğretim üyesi
  try {
    // Gönderilecek veri
    const payload = {
      lectureCode,
      lectureName,
      department,
      grade,
      session,
      instructorId,
    };

    // POST isteği
    const response = await axios.post(
      "https://api.example.com/extra-lessons",
      payload
    );

    console.log("Ek ders başarıyla kaydedildi:", response.data);
    return response.data; // Yanıtı döndürebilirsiniz
  } catch (error) {
    console.error("Ek ders eklenirken hata oluştu:", error);
    if (error.response) {
      console.error("Sunucu Hatası:", error.response.data);
    } else if (error.request) {
      console.error("İstek Hatası:", error.request);
    } else {
      console.error("Hata Mesajı:", error.message);
    }
    throw error; // Hata fırlatmak isteyebilirsiniz
  }
};
