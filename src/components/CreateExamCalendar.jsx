import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

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
      />
    </div>
  );
};

export default CreateExamCalendar;
