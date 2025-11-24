import { StatusBar } from "@/components/StatusBar";
import { DockBar } from "@/components/DockBar";
import { AppIcon } from "@/components/AppIcon";
import { SearchBar } from "@/components/SearchBar";
import { CalendarWidget } from "@/components/CalendarWidget";
import { WeatherWidget } from "@/components/WeatherWidget";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Lock, 
  Calendar, 
  Image, 
  Camera, 
  Mail, 
  FileText, 
  CheckSquare, 
  Clock,
  Newspaper,
  Tv,
  Podcast,
  ShoppingBag,
  Map,
  Heart,
  Calculator,
  Settings,
  Globe,
  Loader2
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState(`linear-gradient(135deg, 
    hsl(195, 100%, 50%) 0%,
    hsl(180, 60%, 55%) 20%,
    hsl(45, 100%, 65%) 40%,
    hsl(25, 100%, 60%) 60%,
    hsl(200, 80%, 60%) 80%,
    hsl(210, 90%, 40%) 100%)`);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [shutdownProgress, setShutdownProgress] = useState(0);

  const wallpapers = [
    `linear-gradient(135deg, 
      hsl(195, 100%, 50%) 0%,
      hsl(180, 60%, 55%) 20%,
      hsl(45, 100%, 65%) 40%,
      hsl(25, 100%, 60%) 60%,
      hsl(200, 80%, 60%) 80%,
      hsl(210, 90%, 40%) 100%)`,
    `linear-gradient(135deg, 
      hsl(330, 100%, 60%) 0%,
      hsl(15, 100%, 60%) 50%,
      hsl(45, 100%, 60%) 100%)`,
    `linear-gradient(135deg, 
      hsl(200, 90%, 40%) 0%,
      hsl(200, 80%, 60%) 50%,
      hsl(195, 100%, 50%) 100%)`,
    `linear-gradient(135deg, 
      hsl(140, 60%, 30%) 0%,
      hsl(120, 50%, 50%) 50%,
      hsl(90, 60%, 60%) 100%)`,
    `linear-gradient(135deg, 
      hsl(270, 80%, 40%) 0%,
      hsl(290, 70%, 50%) 50%,
      hsl(310, 80%, 60%) 100%)`
  ];

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('selectedWallpaper');
    if (savedWallpaper) {
      setWallpaper(wallpapers[parseInt(savedWallpaper)]);
    }
  }, []);

  useEffect(() => {
    if (isShuttingDown) {
      const interval = setInterval(() => {
        setShutdownProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => navigate("/"), 300);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isShuttingDown, navigate]);

  const handlePowerOff = () => {
    setIsShuttingDown(true);
  };

  const apps = [
    { icon: Lock, label: "Lock", color: "hsl(240, 5%, 15%)", route: "/" },
    { icon: Calendar, label: "Calendar", color: "hsl(0, 92%, 60%)", route: "/app/calendar" },
    { icon: Image, label: "Photos", color: "hsl(211, 100%, 50%)", route: "/app/photos" },
    { icon: Camera, label: "Camera", color: "hsl(240, 5%, 65%)", route: "/app/camera" },
    { icon: Mail, label: "Mail", color: "hsl(211, 100%, 50%)", route: "/app/mail" },
    { icon: FileText, label: "Notes", color: "hsl(48, 100%, 50%)", route: "/app/notes" },
    { icon: CheckSquare, label: "Reminders", color: "hsl(0, 92%, 60%)", route: "/app/reminders" },
    { icon: Clock, label: "Clock", color: "hsl(240, 5%, 15%)", route: "/app/clock" },
    { icon: Newspaper, label: "News", color: "hsl(0, 92%, 60%)", route: "/app/news" },
    { icon: Tv, label: "TV", color: "hsl(0, 0%, 10%)", route: "/app/tv" },
    { icon: Podcast, label: "Podcasts", color: "hsl(270, 81%, 60%)", route: "/app/podcasts" },
    { icon: ShoppingBag, label: "App Store", color: "hsl(211, 100%, 50%)", route: "/app/appstore" },
    { icon: Map, label: "Maps", color: "hsl(142, 72%, 45%)", route: "/app/maps" },
    { icon: Heart, label: "Health", color: "hsl(0, 92%, 60%)", route: "/app/health" },
    { icon: Calculator, label: "Calculator", color: "hsl(25, 100%, 60%)", route: "/app/calculator" },
    { icon: Settings, label: "Settings", color: "hsl(240, 5%, 65%)", route: "/app/settings" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Wallpaper Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{ background: wallpaper }}
      />

      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 sm:w-32 sm:h-7 md:w-40 md:h-8 bg-black rounded-b-3xl z-50" />

      <StatusBar />

      {/* Main Content */}
      <div className="relative z-10 pt-14 pb-28 px-4 sm:pt-16 sm:pb-32 sm:px-6 md:pt-20 md:pb-36">
        {/* Widgets Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <CalendarWidget />
          <WeatherWidget />
          <AppIcon icon={Lock} label="Lock" color="hsl(240, 5%, 15%)" route="/" />
          <AppIcon icon={Calendar} label="Calendar" color="hsl(0, 92%, 60%)" route="/app/calendar" />
          <AppIcon icon={Image} label="Photos" color="hsl(211, 100%, 50%)" route="/app/photos" />
          <AppIcon icon={Camera} label="Camera" color="hsl(240, 5%, 65%)" route="/app/camera" />
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 sm:gap-y-6 sm:gap-x-3 md:gap-y-8 md:gap-x-4 mb-4 sm:mb-6">
          {apps.slice(4).map((app, index) => (
            <AppIcon
              key={index}
              icon={app.icon}
              label={app.label}
              color={app.color}
              route={app.route}
            />
          ))}
        </div>

        <SearchBar />
      </div>

      <DockBar />

      {/* Power Button - Right Side */}
      <button
        onClick={handlePowerOff}
        className="absolute right-0 top-32 sm:top-36 md:top-40 w-1 h-12 sm:h-14 md:h-16 bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-150 z-50 rounded-l-sm border-l border-white/10"
        aria-label="Power off"
      />

      {/* Shutdown Overlay */}
      {isShuttingDown && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-lg animate-fade-in">
          <div className="flex flex-col items-center gap-6">
            <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white animate-spin" />
            <div className="w-32 sm:w-40 md:w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${shutdownProgress}%` }}
              />
            </div>
            <p className="text-white text-sm sm:text-base md:text-lg font-light">Shutting down...</p>
          </div>
        </div>
      )}

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 sm:w-28 sm:h-1 md:w-32 md:h-1 bg-foreground/30 rounded-full" />
    </div>
  );
};

export default Home;
