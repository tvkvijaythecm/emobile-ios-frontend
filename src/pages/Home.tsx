import { StatusBar } from "@/components/StatusBar";
import { DockBar } from "@/components/DockBar";
import { AppIcon } from "@/components/AppIcon";
import { SearchBar } from "@/components/SearchBar";
import { CalendarWidget } from "@/components/CalendarWidget";
import { WeatherWidget } from "@/components/WeatherWidget";
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
  Globe
} from "lucide-react";

const Home = () => {
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
    { icon: Globe, label: "Browser", color: "hsl(211, 100%, 50%)", route: "/app/browser" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Wallpaper Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, 
            hsl(195, 100%, 50%) 0%,
            hsl(180, 60%, 55%) 20%,
            hsl(45, 100%, 65%) 40%,
            hsl(25, 100%, 60%) 60%,
            hsl(200, 80%, 60%) 80%,
            hsl(210, 90%, 40%) 100%)`
        }}
      />

      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />

      <StatusBar />

      {/* Main Content */}
      <div className="relative z-10 pt-16 pb-32 px-6">
        {/* Widgets Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <CalendarWidget />
          <AppIcon icon={Lock} label="Lock" color="hsl(240, 5%, 15%)" route="/" />
          <AppIcon icon={Calendar} label="Calendar" color="hsl(0, 92%, 60%)" route="/app/calendar" />
          <AppIcon icon={Image} label="Photos" color="hsl(211, 100%, 50%)" route="/app/photos" />
          <AppIcon icon={Camera} label="Camera" color="hsl(240, 5%, 65%)" route="/app/camera" />
          <WeatherWidget />
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-4 gap-y-6 gap-x-3 mb-6">
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

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full" />
    </div>
  );
};

export default Home;
