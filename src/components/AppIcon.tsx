import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  color: string;
  route: string;
}

export const AppIcon = ({ icon: Icon, label, color, route }: AppIconProps) => {
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
      className="flex flex-col items-center gap-1 sm:gap-1.5 cursor-pointer"
      onClick={handleClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <div 
        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-100 ${
          isPressed ? "scale-90" : "scale-100"
        }`}
        style={{ backgroundColor: color }}
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
      </div>
      <span className="text-[10px] sm:text-xs text-foreground font-medium text-center max-w-[60px] sm:max-w-[70px] leading-tight">
        {label}
      </span>
    </div>
  );
};
