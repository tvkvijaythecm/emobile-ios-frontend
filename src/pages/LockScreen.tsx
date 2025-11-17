import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "@/components/StatusBar";
import { toast } from "sonner";

const LockScreen = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [shake, setShake] = useState(false);
  const correctPasscode = "1234";

  const handleNumberClick = (num: string) => {
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
    setPasscode(passcode.slice(0, -1));
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

      {/* Lock Screen Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-screen pt-32 pb-12">
        {/* Hello Text */}
        <div className="text-center">
          <h1 
            className="text-8xl font-light text-white"
            style={{ 
              fontFamily: "cursive",
              textShadow: "0 2px 20px rgba(0,0,0,0.1)"
            }}
          >
            hello
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
          <div className="space-y-4">
            {numbers.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-16">
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
                    className={`w-20 h-20 rounded-full text-white text-2xl font-light transition-all duration-100 active:scale-90 ${
                      num === "" 
                        ? "opacity-0 cursor-default" 
                        : "bg-white/20 backdrop-blur-xl hover:bg-white/30 active:bg-white/40"
                    }`}
                  >
                    {num}
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
