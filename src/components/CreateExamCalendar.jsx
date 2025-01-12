import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import moment from 'moment';
moment.locale('tr');
const localizer = momentLocalizer(moment);
const CreateExamCalendar = ({ selectedDates, setSelectedDates }) => {
  const formatDate = (date) =>
    date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = formatDate(slotInfo.start);
    if (!selectedDates.includes(selectedDate)) {
      setSelectedDates((prevDates) => [...prevDates, selectedDate]);
    }
  };

  const handleSelectEvent = (event) => {
    const dateToRemove = event.start.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setSelectedDates((prevDates) =>
      prevDates.filter((date) => date !== dateToRemove)
    );
  };

  return (
    <div style={{ height: "500px" }}>
      <Calendar
localizer={localizer}
        events={selectedDates.map((date) => ({
          start: new Date(date.split(".").reverse().join("-")), // Tarihi uygun formata çevir
          end: new Date(date.split(".").reverse().join("-")),   // Tarihi uygun formata çevir
          title: "Seçildi", // Takvimde her seçilen tarihe "Seçildi" başlığı ver
        }))}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={["month"]}
        defaultView="month"
        style={{ height: 500 }}
        messages={{
          today: 'Bugün',
          previous: 'Önceki',
          next: 'Sonraki',
          day: 'Günlük',
          week: 'Hafta',
          month: 'Ay',
          agenda: 'Ajanda',
          date: 'Tarih',
          time: 'Saat',
          event: 'Etkinlik',
          work_week: "Haftalık",
        }}
      />
    </div>
  );
};

export default CreateExamCalendar;
