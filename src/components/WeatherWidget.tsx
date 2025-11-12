import { MapPin, Sun } from "lucide-react";

export const WeatherWidget = () => {
  const hours = [
    { time: "10 AM", temp: "70°", icon: "☀️" },
    { time: "11 AM", temp: "74°", icon: "☀️" },
    { time: "12 PM", temp: "78°", icon: "☀️" },
    { time: "1 PM", temp: "81°", icon: "☀️" },
    { time: "2 PM", temp: "84°", icon: "☀️" },
    { time: "3 PM", temp: "85°", icon: "☀️" },
  ];

  return (
    <div className="bg-blue-500/80 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/20 col-span-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm">Sunnyvale</span>
            <MapPin className="w-3 h-3" />
          </div>
          <div className="text-5xl font-light">70°</div>
        </div>
        <div className="text-right">
          <Sun className="w-8 h-8 mb-1" />
          <div className="text-lg">Sunny</div>
          <div className="text-sm opacity-80">H:85° L:58°</div>
        </div>
      </div>
      <div className="flex justify-between text-center text-sm border-t border-white/30 pt-3">
        {hours.map((hour, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="text-xs opacity-80">{hour.time}</div>
            <div className="text-lg">{hour.icon}</div>
            <div className="text-sm">{hour.temp}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-center mt-2 opacity-80">Weather</div>
    </div>
  );
};
