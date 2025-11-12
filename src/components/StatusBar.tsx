import { Wifi, Signal, Battery } from "lucide-react";

export const StatusBar = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 text-foreground z-50">
      {/* Left side - Time */}
      <div className="text-sm font-semibold">
        {currentTime}
      </div>

      {/* Notch spacer */}
      <div className="w-32" />

      {/* Right side - Icons */}
      <div className="flex items-center gap-1.5">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-5 h-5" />
      </div>
    </div>
  );
};
