import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";

const TVApp = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />
      <StatusBar />

      <div className="relative z-10 pt-12 pb-4 px-6">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-1 text-blue-500 font-normal"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="relative z-10 h-[calc(100vh-100px)]">
        <iframe
          src="https://tv.garden"
          className="w-full h-full border-0"
          title="TV"
          allow="autoplay; fullscreen"
        />
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-20" />
    </div>
  );
};

export default TVApp;