import { Phone, Compass, MessageSquare, Music } from "lucide-react";
import { AppIcon } from "./AppIcon";

export const DockBar = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
      <div className="bg-white/30 backdrop-blur-2xl rounded-[2rem] px-6 py-3 shadow-2xl border border-white/30">
        <div className="flex justify-around items-center gap-4">
          <AppIcon icon={Phone} label="Phone" color="hsl(142, 72%, 45%)" route="/app/phone" />
          <AppIcon icon={Compass} label="Safari" color="hsl(211, 100%, 50%)" route="/app/safari" />
          <AppIcon icon={MessageSquare} label="Messages" color="hsl(142, 72%, 45%)" route="/app/messages" />
          <AppIcon icon={Music} label="Music" color="hsl(0, 92%, 60%)" route="/app/music" />
        </div>
      </div>
    </div>
  );
};
