import { Wifi, Signal, Battery } from "lucide-react";

export const StatusBar = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="absolute top-0 left-0 right-0 h-10 sm:h-11 md:h-12 flex items-center justify-between px-4 sm:px-6 md:px-8 text-foreground z-50">
      {/* Left side - Time */}
      <div className="text-xs sm:text-sm font-semibold">
        {currentTime}
      </div>

      {/* Notch spacer */}
      <div className="w-24 sm:w-28 md:w-32" />

      {/* Right side - Icons */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        <Signal className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
        <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
        <Battery className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
      </div>
    </div>
  );
};
