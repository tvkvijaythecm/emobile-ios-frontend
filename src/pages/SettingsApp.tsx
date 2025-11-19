import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Moon, Sun, Smartphone, Info, HardDrive, Cpu, Battery, Wifi, Edit2, Image as ImageIcon } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SettingsApp = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [deviceName, setDeviceName] = useState("My iPhone");
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(0);

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

  const handleWallpaperChange = (wallpaperId: number) => {
    setSelectedWallpaper(wallpaperId);
    localStorage.setItem('selectedWallpaper', wallpaperId.toString());
  };

  const handleBack = () => {
    navigate("/home");
  };

  const deviceInfo = {
    model: "iNano eMobile",
    version: "iEO 1.0",
    storage: {
      used: "128 GB",
      total: "1 TB"
    },
    processor: "e14 Pro",
    battery: "98%",
    serialNumber: "KS28102103"
  };

  const SettingRow = ({ 
    icon: Icon, 
    label, 
    value, 
    onClick, 
    iconColor = "hsl(240, 5%, 65%)",
    showChevron = true 
  }: { 
    icon: any; 
    label: string; 
    value?: string; 
    onClick?: () => void;
    iconColor?: string;
    showChevron?: boolean;
  }) => (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between py-3 px-4 ${onClick ? 'cursor-pointer active:bg-muted/50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconColor }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-muted-foreground text-sm">{value}</span>}
        {showChevron && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
      </div>
    </div>
  );

  const SettingSection = ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <div className="mb-6">
      {title && <h2 className="text-xs font-semibold text-muted-foreground px-4 mb-2 uppercase">{title}</h2>}
      <div className="bg-card rounded-xl overflow-hidden divide-y divide-border">
        {children}
      </div>
    </div>
  );

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
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Settings Content */}
      <div className="relative z-10 pb-24 pt-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {/* Profile Section */}
        <div className="px-4 mb-6">
          <div className="bg-card rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-semibold">
              {deviceName.charAt(0)}
            </div>
            <div className="flex-1">
              {isEditingName ? (
                <Input
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                  className="text-lg font-semibold mb-1"
                />
              ) : (
                <h2 className="text-lg font-semibold text-foreground">{deviceName}</h2>
              )}
              <p className="text-sm text-muted-foreground">Apple ID, iCloud, Media & Purchases</p>
            </div>
            {!isEditingName && (
              <button onClick={() => setIsEditingName(true)}>
                <Edit2 className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Appearance Section */}
        <SettingSection title="Appearance">
          <div className="flex items-center justify-between py-3 px-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "hsl(240, 5%, 65%)" }}
              >
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-white" />
                ) : (
                  <Sun className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="text-foreground">Dark Mode</span>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </SettingSection>

        {/* Wallpaper Section */}
        <SettingSection title="Wallpaper">
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {wallpapers.map((wallpaper) => (
                <div
                  key={wallpaper.id}
                  onClick={() => handleWallpaperChange(wallpaper.id)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    selectedWallpaper === wallpaper.id
                      ? "border-primary scale-95"
                      : "border-transparent"
                  }`}
                >
                  <div
                    className="aspect-[9/16] w-full"
                    style={{ background: wallpaper.gradient }}
                  />
                  <div className="text-xs text-center py-1 bg-card">
                    {wallpaper.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SettingSection>

        {/* Device Information */}
        <SettingSection title="Device">
          <SettingRow 
            icon={Smartphone} 
            label="Device Name" 
            value={deviceName}
            iconColor="hsl(211, 100%, 50%)"
            onClick={() => setIsEditingName(true)}
          />
          <SettingRow 
            icon={Info} 
            label="Model" 
            value={deviceInfo.model}
            iconColor="hsl(240, 5%, 65%)"
          />
          <SettingRow 
            icon={Info} 
            label="Software Version" 
            value={deviceInfo.version}
            iconColor="hsl(240, 5%, 65%)"
          />
          <SettingRow 
            icon={Info} 
            label="Serial Number" 
            value={deviceInfo.serialNumber}
            iconColor="hsl(240, 5%, 65%)"
            showChevron={false}
          />
        </SettingSection>

        {/* Specifications */}
        <SettingSection title="Specifications">
          <SettingRow 
            icon={Cpu} 
            label="Processor" 
            value={deviceInfo.processor}
            iconColor="hsl(0, 0%, 40%)"
            showChevron={false}
          />
          <SettingRow 
            icon={HardDrive} 
            label="Storage" 
            value={deviceInfo.storage.total}
            iconColor="hsl(174, 100%, 39%)"
          />
          <SettingRow 
            icon={Battery} 
            label="Battery Health" 
            value={deviceInfo.battery}
            iconColor="hsl(142, 72%, 45%)"
          />
          <SettingRow 
            icon={Wifi} 
            label="Network" 
            value="5G"
            iconColor="hsl(211, 100%, 50%)"
            showChevron={false}
          />
        </SettingSection>

        {/* General Settings */}
        <SettingSection title="General">
          <SettingRow 
            icon={Info} 
            label="About" 
            iconColor="hsl(240, 5%, 65%)"
            onClick={() => navigate("/app/about")}
          />
          <SettingRow 
            icon={Smartphone} 
            label="Software Update" 
            iconColor="hsl(0, 92%, 60%)"
          />
        </SettingSection>

        {/* Footer Info */}
        <div className="px-4 mt-8 text-center text-xs text-muted-foreground">
          <p>eMobile Â· Version 1.0</p>
          <p className="mt-1">Â© 2024 Apple Inc. All rights reserved.</p>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default SettingsApp;
