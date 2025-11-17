import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, RefreshCw } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BrowserApp = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("https://www.google.com");
  const [inputUrl, setInputUrl] = useState("https://www.google.com");
  const [key, setKey] = useState(0);

  const handleNavigate = () => {
    let newUrl = inputUrl;
    if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
      newUrl = "https://" + newUrl;
    }
    setUrl(newUrl);
    setInputUrl(newUrl);
  };

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50" />
      <StatusBar />

      <div className="relative z-10 pt-12 pb-4 px-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-1 text-primary font-normal"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold text-foreground">Browser</h1>
          <Button size="icon" variant="ghost" onClick={handleRefresh}>
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
              className="pl-10"
              placeholder="Enter URL or search..."
            />
          </div>
          <Button onClick={handleNavigate}>Go</Button>
        </div>
      </div>

      <div className="relative z-10 h-[calc(100vh-150px)]">
        <iframe
          key={key}
          src={url}
          className="w-full h-full border-0"
          title="Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default BrowserApp;