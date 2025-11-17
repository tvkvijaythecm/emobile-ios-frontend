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
    const interval = setInterval(() => setTime(new Date()), 1000);
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
    <div className="relative min-h-screen w-full bg-gradient-to-br from-background via-background/90 to-background/70 flex flex-col overflow-hidden">
      {/* Dynamic Island (Top Bar Placeholder) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/90 backdrop-blur-lg rounded-b-3xl z-50 shadow-md" />
      <StatusBar />

      {/* Header */}
      <div className="relative z-10 pt-12 pb-4 px-6 border-b border-border/50 backdrop-blur-md bg-background/40">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-lg font-semibold text-foreground tracking-wide">
            Clock
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center select-none">
        <div className="bg-foreground/5 backdrop-blur-md rounded-3xl p-10 shadow-inner border border-border/20 hover:border-border/40 transition-all duration-300">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-8xl md:text-9xl font-light text-foreground tabular-nums drop-shadow-lg transition-all duration-300">
              {hours}
            </span>
            <span className="text-8xl md:text-9xl font-light text-primary animate-pulse">
              :
            </span>
            <span className="text-8xl md:text-9xl font-light text-foreground tabular-nums drop-shadow-lg">
              {minutes}
            </span>
            <span className="text-8xl md:text-9xl font-light text-primary animate-pulse">
              :
            </span>
            <span className="text-8xl md:text-9xl font-light text-foreground tabular-nums drop-shadow-lg">
              {seconds}
            </span>
            {!is24Hour && (
              <span className="text-3xl font-medium text-muted-foreground ml-3 mt-2">
                {period}
              </span>
            )}
          </div>
          <p className="text-lg text-muted-foreground font-light tracking-wide">
            {date}
          </p>
        </div>

        {/* 12H / 24H Toggle */}
        <div className="flex items-center justify-center gap-4 mt-12 bg-foreground/5 px-5 py-2 rounded-full backdrop-blur-sm border border-border/30 shadow-sm">
          <span
            className={`text-sm ${
              !is24Hour ? "text-primary font-medium" : "text-foreground/60"
            }`}
          >
            12H
          </span>
          <Switch checked={is24Hour} onCheckedChange={setIs24Hour} />
          <span
            className={`text-sm ${
              is24Hour ? "text-primary font-medium" : "text-foreground/60"
            }`}
          >
            24H
          </span>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default ClockApp;
