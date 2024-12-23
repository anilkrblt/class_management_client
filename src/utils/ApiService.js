import axios from "axios"

const getAllRooms = async () => {
    //   roomName , capacity,examCapacity , projectStatus, classType, classDepartment, buildingName
    // isActive // o günkü olan derslerin adı ve ders saati bilgisi hocası ve bölümüyle birlikte...

    try {
        const response = await axios.get('https://api.example.com/data/');
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error('Hata:', error);
    }

}

const getAllComplaints = () => {
    // instructorName, studentname, content, roomName, contentPhoto, status, createdAt, updatedAt, 
}


const getAllLectures = () => {
    // instructorNameForLecture, dersAdı, derskodu, bölüm, sınıf, dönem, departman
}

const getExam = () =>{
    // ders adı bölüm saat sınıflar tarih, bölüm, sınıf, dönem?
}

const getUserInformation = () => {
    // ad soyad, öğrencino, personelno, eposta,fuckülte, bölüm, sınıf
}

const getClubEventsReservation = () => {
    // öğrenci adı soyadı, sınıf, tarih, başlangıç saat, bitiş saati
    // detaylar, eventslink, clubName, clupIcon, kulüp adı, etkinlik adı, afiş
}

const putClubReservationConfirm = () => {
    // etkinlik isteğini kabul etmek
}

const putClubReservationDecline = () => {
    // etkinlik isteğini reddetmek
}

const postCreateClubEvent = () => {
    // kulüp adı, etkinlik adı, sınıf,  tarih, başlangıç saat, bitiş saati, link
}


const postComplaint = async (title, place, details, photos, id,type) => {
    try {
        // Gönderilecek veri
        const payload = {
            id,
            type,
            title,
            place,
            details,
            photos // Eğer photos bir dosya ise FormData kullanmanız gerekebilir
        };

        // POST isteği
        const response = await axios.post('https://api.example.com/complaints', payload);

        console.log('Şikayet gönderildi:', response.data);
        return response.data; // Yanıtı döndürebilirsiniz
    } catch (error) {
        console.error('Şikayet gönderilirken hata oluştu:', error);
        if (error.response) {
            console.error('Sunucu Hatası:', error.response.data);
        } else if (error.request) {
            console.error('İstek Hatası:', error.request);
        } else {
            console.error('Hata Mesajı:', error.message);
        }
        throw error; // Hata fırlatmak isteyebilirsiniz
    }
}

const postExtraLesson = async (lectureCode, date, startTime, endTime, room) => {
    try {
      // Gönderilecek veri
      const payload = {
        lectureCode,
        date,
        startTime,
        endTime,
        room
      };
  
      // POST isteği
      const response = await axios.post('https://api.example.com/extra-lessons', payload);
  
      console.log('Ek ders başarıyla kaydedildi:', response.data);
      return response.data; // Yanıtı döndürebilirsiniz
    } catch (error) {
      console.error('Ek ders eklenirken hata oluştu:', error);
      if (error.response) {
        console.error('Sunucu Hatası:', error.response.data);
      } else if (error.request) {
        console.error('İstek Hatası:', error.request);
      } else {
        console.error('Hata Mesajı:', error.message);
      }
      throw error; // Hata fırlatmak isteyebilirsiniz
    }
  };

  const putChangeLessonTime = () =>{
    // ders adı, başlangıç saati, bitiş saati, gün, sınıf
  }

  const deleteLesson = () => {
    //ders adı, başlangıç saati, bitiş saati
    //  tarih ders iptal olsun
  }
const postClassroom = async () => {
   // sınıf adı, kapasitesi, sınav kapasitesi, sınıf özelliği, block, derslik tipi(sınıf,amfi)
   //yeni sınıf oluştur projeksiyon ve isactive default true olsun
  }


  const putClassroom = async () => {
    // sınıf adı, kapasitesi, sınav kapasitesi, sınıf özelliği, block, derslik tipi(sınıf,amfi)
    //projeksiyon ve isActive update olabilecek
   }
  const postLesson = () => {
    //ders adı, ders kodu, bölüm, sınıf, dönem, öğretim üyesi 
  }


  
