import { MapPin, Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const fetchWeather = async () => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=3.1390&longitude=101.6869&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&timezone=Asia/Singapore&forecast_days=1`
  );
  if (!response.ok) throw new Error("Failed to fetch weather");
  return response.json();
};

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="w-8 h-8" />;
  if (code <= 3) return <Cloud className="w-8 h-8" />;
  if (code <= 67) return <CloudRain className="w-8 h-8" />;
  return <CloudSnow className="w-8 h-8" />;
};

const getWeatherDescription = (code: number) => {
  if (code === 0) return "Clear";
  if (code <= 3) return "Cloudy";
  if (code <= 67) return "Rainy";
  return "Stormy";
};

export const WeatherWidget = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    refetchInterval: 600000, // Refetch every 10 minutes
  });

  const currentTemp = data?.current?.temperature_2m 
    ? Math.round(data.current.temperature_2m) 
    : 70;
  
  const currentWeatherCode = data?.current?.weather_code ?? 0;
  
  const hours = data?.hourly ? 
    [0, 1, 2, 3, 4, 5].map(i => {
      const hour = new Date();
      hour.setHours(hour.getHours() + i);
      return {
        time: hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: `${Math.round(data.hourly.temperature_2m[hour.getHours()])}°`,
        code: data.hourly.weather_code[hour.getHours()]
      };
    }) :
    [
      { time: "10 AM", temp: "70°", code: 0 },
      { time: "11 AM", temp: "74°", code: 0 },
      { time: "12 PM", temp: "78°", code: 0 },
      { time: "1 PM", temp: "81°", code: 0 },
      { time: "2 PM", temp: "84°", code: 0 },
      { time: "3 PM", temp: "85°", code: 0 },
    ];

  const highTemp = hours.reduce((max, h) => {
    const temp = parseInt(h.temp);
    return temp > max ? temp : max;
  }, 0);
  
  const lowTemp = hours.reduce((min, h) => {
    const temp = parseInt(h.temp);
    return temp < min ? temp : min;
  }, 999);

  return (
    <div className="bg-blue-500/80 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/20 col-span-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm">Kuala Lumpur</span>
            <MapPin className="w-3 h-3" />
          </div>
          <div className="text-5xl font-light">{currentTemp}°</div>
        </div>
        <div className="text-right">
          {getWeatherIcon(currentWeatherCode)}
          <div className="text-lg">{getWeatherDescription(currentWeatherCode)}</div>
          <div className="text-sm opacity-80">H:{highTemp}° L:{lowTemp}°</div>
        </div>
      </div>
      <div className="flex justify-between text-center text-sm border-t border-white/30 pt-3">
        {hours.map((hour, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="text-xs opacity-80">{hour.time}</div>
            <div className="text-lg">{hour.code === 0 ? "☀️" : hour.code <= 3 ? "☁️" : "🌧️"}</div>
            <div className="text-sm">{hour.temp}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-center mt-2 opacity-80">Weather</div>
    </div>
  );
};
