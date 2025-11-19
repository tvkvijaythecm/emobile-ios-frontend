import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const WallpaperPage = () => {
  const navigate = useNavigate();
  const [selectedWallpaper, setSelectedWallpaper] = useState(0);
  const [currentWallpaper, setCurrentWallpaper] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('selectedWallpaper');
    const wallpaperId = saved ? parseInt(saved) : 0;
    setSelectedWallpaper(wallpaperId);
    setCurrentWallpaper(wallpaperId);
  }, []);

  const wallpapers = [
    {
      id: 0,
      name: "Default",
      gradient: `linear-gradient(135deg, 
        hsl(195, 100%, 50%) 0%,
        hsl(180, 60%, 55%) 20%,
        hsl(45, 100%, 65%) 40%,
        hsl(25, 100%, 60%) 60%,
        hsl(200, 80%, 60%) 80%,
        hsl(210, 90%, 40%) 100%)`
    },
    {
      id: 1,
      name: "Sunset",
      gradient: `linear-gradient(135deg, 
        hsl(330, 100%, 60%) 0%,
        hsl(15, 100%, 60%) 50%,
        hsl(45, 100%, 60%) 100%)`
    },
    {
      id: 2,
      name: "Ocean",
      gradient: `linear-gradient(135deg, 
        hsl(200, 90%, 40%) 0%,
        hsl(200, 80%, 60%) 50%,
        hsl(195, 100%, 50%) 100%)`
    },
    {
      id: 3,
      name: "Forest",
      gradient: `linear-gradient(135deg, 
        hsl(140, 60%, 30%) 0%,
        hsl(120, 50%, 50%) 50%,
        hsl(90, 60%, 60%) 100%)`
    },
    {
      id: 4,
      name: "Purple Haze",
      gradient: `linear-gradient(135deg, 
        hsl(270, 80%, 40%) 0%,
        hsl(290, 70%, 50%) 50%,
        hsl(310, 80%, 60%) 100%)`
    }
  ];

  const handleApply = () => {
    localStorage.setItem('selectedWallpaper', selectedWallpaper.toString());
    setCurrentWallpaper(selectedWallpaper);
    navigate("/app/settings");
  };

  const handleBack = () => {
    navigate("/app/settings");
  };

  return (
    <div className="relative w-full min-h-screen bg-background animate-bounce-in">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />

      <StatusBar />

      {/* Navigation Bar */}
      <div className="relative z-10 pt-12 pb-4 px-6 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-primary font-normal"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-foreground">Wallpaper</h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Wallpaper Selection */}
      <div className="relative z-10 pb-24 pt-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        <div className="px-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                onClick={() => setSelectedWallpaper(wallpaper.id)}
                className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
                  selectedWallpaper === wallpaper.id
                    ? "border-primary scale-95"
                    : "border-transparent"
                }`}
              >
                <div
                  className="aspect-[9/16] w-full"
                  style={{ background: wallpaper.gradient }}
                />
                <div className="text-sm text-center py-2 bg-card font-medium">
                  {wallpaper.name}
                  {currentWallpaper === wallpaper.id && (
                    <span className="text-xs text-muted-foreground ml-1">(Current)</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleApply}
            className="w-full"
            size="lg"
          >
            Apply Wallpaper
          </Button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default WallpaperPage;
