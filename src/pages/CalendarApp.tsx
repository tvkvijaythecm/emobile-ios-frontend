import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import { Button } from "@/components/ui/button";

const malaysianHolidays2024 = [
  { date: "2024-11-17", name: "Deepavali" },
  { date: "2024-12-25", name: "Christmas" },
  { date: "2025-01-01", name: "New Year" },
  { date: "2025-01-25", name: "Thaipusam" },
  { date: "2025-01-29", name: "Chinese New Year" },
  { date: "2025-03-31", name: "Hari Raya Aidilfitri" },
  { date: "2025-05-01", name: "Labour Day" },
  { date: "2025-06-07", name: "Hari Raya Aidiladha" },
  { date: "2025-08-31", name: "Merdeka Day" },
  { date: "2025-09-16", name: "Malaysia Day" },
];

const CalendarApp = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getHolidayForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return malaysianHolidays2024.find(h => h.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />
      <StatusBar />

      <div className="relative z-10 pt-12 pb-4 px-6 border-b border-border">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-1 text-primary font-normal"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-foreground">Calendar</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-foreground">
            {monthNames[month]} {year}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const holiday = getHolidayForDate(day);
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg border ${
                  today
                    ? "bg-primary text-primary-foreground border-primary"
                    : holiday
                    ? "bg-red-500/10 border-red-500/30"
                    : "border-border"
                }`}
              >
                <span className={`text-sm ${today ? "font-bold" : ""}`}>{day}</span>
                {holiday && <span className="text-[8px] text-red-500">🎉</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Malaysian Holidays</h3>
          {malaysianHolidays2024
            .filter(h => {
              const holidayDate = new Date(h.date);
              return holidayDate.getMonth() === month && holidayDate.getFullYear() === year;
            })
            .map((holiday) => (
              <div
                key={holiday.date}
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
              >
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{holiday.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(holiday.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default CalendarApp;