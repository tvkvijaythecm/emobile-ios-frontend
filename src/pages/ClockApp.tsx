import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import { Switch } from "@/components/ui/switch";

const ClockApp = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let period = "";

    if (!is24Hour) {
      period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
    }

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
      period,
    };
  };

  const { hours, minutes, seconds, period } = formatTime(time);
  const date = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <h1 className="text-lg font-semibold text-foreground">Clock</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-200px)] px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-9xl font-light text-foreground tabular-nums">
              {hours}
            </span>
            <span className="text-9xl font-light text-foreground animate-pulse">
              :
            </span>
            <span className="text-9xl font-light text-foreground tabular-nums">
              {minutes}
            </span>
            <span className="text-9xl font-light text-foreground animate-pulse">
              :
            </span>
            <span className="text-9xl font-light text-foreground tabular-nums">
              {seconds}
            </span>
            {!is24Hour && (
              <span className="text-4xl font-light text-muted-foreground ml-4">
                {period}
              </span>
            )}
          </div>
          <p className="text-xl text-muted-foreground">{date}</p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <span className="text-sm text-foreground">12H</span>
          <Switch checked={is24Hour} onCheckedChange={setIs24Hour} />
          <span className="text-sm text-foreground">24H</span>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default ClockApp;