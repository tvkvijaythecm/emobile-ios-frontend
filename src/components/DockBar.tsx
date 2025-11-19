import { Phone, Globe, MessageSquare, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface DockIconProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  route: string;
}

const DockIcon = ({ icon: Icon, label, color, route }: DockIconProps) => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => {
      navigate(route);
    }, 100);
  };

  return (
    <div 
      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-100 cursor-pointer ${
        isPressed ? "scale-90" : "scale-100"
      }`}
      style={{ backgroundColor: color }}
      onClick={handleClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>
  );
};

export const DockBar = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
      <div className="bg-white/30 backdrop-blur-2xl rounded-[2rem] px-6 py-3 shadow-2xl border border-white/30">
        <div className="flex justify-around items-center gap-4">
          <DockIcon icon={Phone} label="Phone" color="hsl(142, 72%, 45%)" route="/app/phone" />
          <DockIcon icon={Globe} label="Browser" color="hsl(211, 100%, 50%)" route="/app/browser" />
          <DockIcon icon={MessageSquare} label="Messages" color="hsl(142, 72%, 45%)" route="/app/messages" />
          <DockIcon icon={Music} label="Music" color="hsl(0, 92%, 60%)" route="/app/music" />
        </div>
      </div>
    </div>
  );
};
