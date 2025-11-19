import { useState, useEffect } from "react";

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

export const CalendarWidget = () => {
  const [todayEvents, setTodayEvents] = useState<string[]>([]);
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dayNumber = today.getDate();

  useEffect(() => {
    const todayStr = today.toISOString().split('T')[0];
    const events = malaysianHolidays2024
      .filter(h => h.date === todayStr)
      .map(h => h.name);
    setTodayEvents(events);
  }, []);

  // Find upcoming events
  const upcomingEvents = malaysianHolidays2024.filter(h => {
    const eventDate = new Date(h.date);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/30 col-span-2">
      <div className="text-red-500 text-xs font-semibold mb-1">{dayName}</div>
      <div className="text-3xl font-light mb-2">{dayNumber}</div>
      {todayEvents.length > 0 ? (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-red-500">🎉</span>
          <span className="text-foreground/70 font-semibold">{todayEvents[0]}</span>
        </div>
      ) : upcomingEvents.length > 0 ? (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-500">📅</span>
          <span className="text-foreground/70">{upcomingEvents.length} upcoming</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-500">✓</span>
          <span className="text-foreground/70">No events</span>
        </div>
      )}
    </div>
  );
};
