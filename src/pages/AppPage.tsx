import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";

const AppPage = () => {
  const navigate = useNavigate();
  const { appName } = useParams();

  const handleBack = () => {
    navigate("/home");
  };

  const displayName = appName
    ? appName.charAt(0).toUpperCase() + appName.slice(1)
    : "App";

  return (
    <div className="relative w-full min-h-screen bg-background animate-bounce-in">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />

      <StatusBar />

      {/* Navigation Bar */}
      <div className="relative z-10 pt-12 pb-4 px-6 border-b border-border">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-primary font-normal"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-foreground">{displayName}</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Empty Content Area */}
      <div className="relative z-10 flex items-center justify-center h-[calc(100vh-120px)]">
        <p className="text-muted-foreground text-sm">App content goes here</p>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default AppPage;
