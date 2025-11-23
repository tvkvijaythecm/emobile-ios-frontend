import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BootScreen = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Navigate to lock screen after fade out completes
    const navTimer = setTimeout(() => {
      navigate("/lock");
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Monkey Logo with Apple-style animation */}
      <div className="flex flex-col items-center gap-8">
        <div 
          className="animate-scale-in"
          style={{
            animationDelay: "0.3s",
            animationFillMode: "backwards"
          }}
        >
          <div className="text-8xl sm:text-9xl md:text-[12rem] animate-pulse">
            🐵
          </div>
        </div>
        
        {/* Loading bar */}
        <div 
          className="w-48 sm:w-56 md:w-64 h-1 bg-white/20 rounded-full overflow-hidden animate-fade-in"
          style={{
            animationDelay: "1s",
            animationFillMode: "backwards"
          }}
        >
          <div 
            className="h-full bg-white rounded-full animate-[loading_1.5s_ease-in-out]"
            style={{
              animation: "loading 1.5s ease-in-out forwards",
              animationDelay: "1s"
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
