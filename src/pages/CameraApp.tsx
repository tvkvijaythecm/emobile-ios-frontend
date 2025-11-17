import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Video, RotateCw, Download, X } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CameraApp = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: mode === "video"
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast.error("Unable to access camera");
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleBack = () => {
    stopCamera();
    navigate("/home");
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoUrl = canvas.toDataURL("image/jpeg");
        setCapturedMedia(photoUrl);
        setMediaType("photo");
        toast.success("Photo captured!");
      }
    }
  };

  const startRecording = async () => {
    if (!stream) return;

    try {
      // Stop current stream and get new one with audio
      stopCamera();
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: true
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        setCapturedMedia(videoUrl);
        setMediaType("video");
        toast.success("Video recorded!");
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      toast.error("Unable to start recording");
      console.error("Recording error:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const downloadMedia = () => {
    if (capturedMedia) {
      const a = document.createElement("a");
      a.href = capturedMedia;
      a.download = `${mediaType === "photo" ? "photo" : "video"}-${Date.now()}.${mediaType === "photo" ? "jpg" : "webm"}`;
      a.click();
      toast.success("Media downloaded!");
    }
  };

  const closePreview = () => {
    if (capturedMedia && mediaType === "video") {
      URL.revokeObjectURL(capturedMedia);
    }
    setCapturedMedia(null);
    setMediaType(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-black animate-bounce-in overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />

      <StatusBar />

      {/* Camera View */}
      {!capturedMedia ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Top Controls */}
          <div className="absolute top-12 left-0 right-0 z-30 flex items-center justify-between px-6 pt-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-white font-normal bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={switchCamera}
              className="bg-black/30 backdrop-blur-sm p-3 rounded-full"
            >
              <RotateCw className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 z-30 pb-8">
            {/* Mode Selector */}
            <div className="flex justify-center gap-8 mb-6">
              <button
                onClick={() => setMode("photo")}
                className={`text-sm font-semibold transition-all ${
                  mode === "photo" ? "text-yellow-400 scale-110" : "text-white/60"
                }`}
              >
                PHOTO
              </button>
              <button
                onClick={() => setMode("video")}
                className={`text-sm font-semibold transition-all ${
                  mode === "video" ? "text-yellow-400 scale-110" : "text-white/60"
                }`}
              >
                VIDEO
              </button>
            </div>

            {/* Capture Button */}
            <div className="flex justify-center">
              {mode === "photo" ? (
                <button
                  onClick={capturePhoto}
                  className="w-20 h-20 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm active:scale-95 transition-transform"
                />
              ) : (
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                    isRecording ? "bg-red-500" : "bg-white/20 backdrop-blur-sm"
                  } active:scale-95`}
                >
                  {isRecording && (
                    <div className="w-8 h-8 bg-white rounded-sm" />
                  )}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Preview */}
          <div className="absolute inset-0 bg-black">
            {mediaType === "photo" ? (
              <img src={capturedMedia} alt="Captured" className="w-full h-full object-contain" />
            ) : (
              <video src={capturedMedia} controls className="w-full h-full object-contain" />
            )}
          </div>

          {/* Preview Controls */}
          <div className="absolute top-12 left-0 right-0 z-30 flex items-center justify-between px-6 pt-4">
            <button
              onClick={closePreview}
              className="bg-black/50 backdrop-blur-sm p-3 rounded-full"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={downloadMedia}
              className="bg-black/50 backdrop-blur-sm p-3 rounded-full"
            >
              <Download className="w-6 h-6 text-white" />
            </button>
          </div>
        </>
      )}

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-20" />
    </div>
  );
};

export default CameraApp;
