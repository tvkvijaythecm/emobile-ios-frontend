export const CalendarWidget = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dayNumber = today.getDate();

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/30 col-span-2 row-span-2">
      <div className="text-red-500 text-xs font-semibold mb-1">{dayName}</div>
      <div className="text-5xl font-light mb-2">{dayNumber}</div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-blue-500">⛱️</span>
        <span className="text-foreground/70">4 all-day</span>
      </div>
    </div>
  );
};
