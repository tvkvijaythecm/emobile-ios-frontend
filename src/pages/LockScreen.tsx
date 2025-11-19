import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "@/components/StatusBar";
import { toast } from "sonner";

const LockScreen = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [shake, setShake] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [wallpaper, setWallpaper] = useState(`linear-gradient(135deg, 
    hsl(195, 100%, 50%) 0%,
    hsl(180, 60%, 55%) 20%,
    hsl(45, 100%, 65%) 40%,
    hsl(25, 100%, 60%) 60%,
    hsl(200, 80%, 60%) 80%,
    hsl(210, 90%, 40%) 100%)`);
  const correctPasscode = "1234";

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
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('selectedWallpaper');
    if (savedWallpaper) {
      setWallpaper(wallpapers[parseInt(savedWallpaper)]);
    }
  }, []);

  const playKeypadSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBWKs5PKxYhUEV6zn9b9rHwI7j9rzxnQmBSSE0fPZiToHEGS57OihTwwQUrTo8KtXDwZZrOTvvGchAzCJ0fPWgyoHJG+/8N+NQwoVZLjq7qVSEARPqOLxvW0bBSuD0PPSfSsGHXPD8duIOgsVZb3r8KdUDwRPqOPwvWojBS+A0fPWgiwGHG/A8N2PRAkTZbzs8KdUDAJPpuPwvm0bBSx+0PPXgywGH3PB8NySRAkSY77p8KlUEANQqOPuvmweBDCB0fLWgisGHm6/8N+RQwgUZLvq8KdUDAJNpuPxvmwbBTCA0fPWgywGH3PC8N2RQwkTZL3p8KlSEARRqOTuvWsjBDCF0fPWgiwHH3PA8N2SQwkSZb3s8KhTEARRp+PvvmwhBDGB0fPWhSwHHm+/8N+RQgkSZL3q8KhUDwRRp+TvvmwhBDCB0fPWhSwHH2/A8N6PQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBTCB0PPWhSwHHnC/8N6QQgkSZL7q8KhUDwRRp+TvvmwhBQ==');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleNumberClick = (num: string) => {
    playKeypadSound();
    if (passcode.length < 4) {
      const newPasscode = passcode + num;
      setPasscode(newPasscode);

      // Check if passcode is complete
      if (newPasscode.length === 4) {
        setTimeout(() => {
          if (newPasscode === correctPasscode) {
            navigate("/home");
          } else {
            setShake(true);
            toast.error("Incorrect passcode");
            setTimeout(() => {
              setPasscode("");
              setShake(false);
            }, 500);
          }
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    playKeypadSound();
    setPasscode(passcode.slice(0, -1));
  };

  const formatTime = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "⌫"],
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Wallpaper Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{ background: wallpaper }}
      />

      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />

      <StatusBar />

      {/* Lock Screen Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-screen pt-20 pb-12">
        {/* Time, Date and eMobile Text - Moved higher */}
        <div className="text-center mt-8">
          <div className="text-7xl font-light text-white mb-2">
            {formatTime()}
          </div>
          <div className="text-lg font-medium text-white/90 mb-4">
            {formatDate()}
          </div>
          <h1 
            className="text-5xl font-light text-white"
            style={{ 
              fontFamily: "cursive",
              textShadow: "0 2px 20px rgba(0,0,0,0.1)"
            }}
          >
            Hello eMobile
          </h1>
        </div>

        {/* Passcode Section */}
        <div className="w-full max-w-sm px-8">
          {/* Instruction */}
          <p className="text-white text-center text-sm mb-6 font-medium">
            Enter Passcode
          </p>

          {/* Passcode Dots */}
          <div className={`flex justify-center gap-4 mb-12 ${shake ? "animate-wiggle" : ""}`}>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ${
                  index < passcode.length ? "bg-white" : "bg-transparent"
                }`}
              />
            ))}
          </div>

          {/* Number Pad */}
          <div className="space-y-6">
            {numbers.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-8">
                {row.map((num, colIndex) => (
                  <button
                    key={colIndex}
                    onClick={() => {
                      if (num === "⌫") {
                        handleDelete();
                      } else if (num !== "") {
                        handleNumberClick(num);
                      }
                    }}
                    disabled={num === ""}
                    className={`
                      w-20 h-20 
                      rounded-full 
                      text-white 
                      text-2xl 
                      font-light 
                      transition-all 
                      duration-100 
                      active:scale-90 
                      flex 
                      items-center 
                      justify-center
                      select-none
                      ${
                        num === "" 
                          ? "opacity-0 cursor-default pointer-events-none" 
                          : "bg-white/20 backdrop-blur-xl hover:bg-white/30 active:bg-white/40 border border-white/10 shadow-lg"
                      }
                    `}
                    style={{
                      aspectRatio: "1/1"
                    }}
                  >
                    {num === "⌫" ? (
                      <svg 
                        className="w-8 h-8 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" 
                        />
                      </svg>
                    ) : (
                      num
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="text-white/80 text-sm text-center font-medium">
          <p>Password: 1234</p>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-20" />
    </div>
  );
};

export default LockScreen;
