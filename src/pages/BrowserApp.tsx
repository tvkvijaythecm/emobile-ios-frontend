import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, RefreshCw, Globe, Lock } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const BrowserApp = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("https://www.google.com");
  const [inputUrl, setInputUrl] = useState("https://www.google.com");
  const [key, setKey] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSites = [
    { name: "Google", url: "https://www.google.com", icon: "🔍" },
    { name: "YouTube", url: "https://www.youtube.com", icon: "▶️" },
    { name: "GitHub", url: "https://github.com", icon: "💻" },
    { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
    { name: "Wikipedia", url: "https://wikipedia.org", icon: "📚" },
    { name: "Reddit", url: "https://reddit.com", icon: "🤖" },
  ];

  const handleNavigate = (targetUrl?: string) => {
    let newUrl = targetUrl || inputUrl;
    if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
      newUrl = "https://" + newUrl;
    }
    setUrl(newUrl);
    setInputUrl(newUrl);
    setShowSuggestions(false);
  };

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const isSecure = url.startsWith("https://");

  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 sm:w-32 sm:h-7 md:w-40 md:h-8 bg-black rounded-b-3xl z-50" />
      <StatusBar />

      {/* Browser Toolbar */}
      <div 
        className="relative z-10 pt-12 pb-4 px-4 sm:px-6 backdrop-blur-lg border-b"
        style={{ 
          background: `hsl(var(--browser-toolbar))`,
          borderColor: `hsl(var(--glass-border))`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-1 text-primary font-normal hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
          <h1 className="text-base sm:text-lg font-semibold" style={{ color: `hsl(var(--browser-toolbar-foreground))` }}>
            Browser
          </h1>
          <Button size="icon" variant="ghost" onClick={handleRefresh} className="h-8 w-8 sm:h-10 sm:w-10">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* URL Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            {isSecure ? (
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            ) : (
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            )}
            <Input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
              onFocus={() => setShowSuggestions(true)}
              className="pl-8 sm:pl-10 text-xs sm:text-sm backdrop-blur-xl"
              style={{ background: `hsl(var(--site-card))` }}
              placeholder="Enter URL or search..."
            />
          </div>
          <Button onClick={() => handleNavigate()} size="sm" className="text-xs sm:text-sm">
            Go
          </Button>
        </div>

        {/* Popular Sites */}
        {showSuggestions && (
          <Card 
            className="absolute left-4 right-4 sm:left-6 sm:right-6 top-full mt-2 p-3 sm:p-4 backdrop-blur-xl z-50 animate-fade-in"
            style={{ background: `hsl(var(--site-card))` }}
          >
            <div className="text-xs sm:text-sm font-medium mb-3" style={{ color: `hsl(var(--browser-toolbar-foreground))` }}>
              Popular Sites
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {popularSites.map((site) => (
                <button
                  key={site.url}
                  onClick={() => handleNavigate(site.url)}
                  className="flex items-center gap-2 p-2 sm:p-3 rounded-lg transition-all hover:scale-105"
                  style={{ 
                    background: `hsl(var(--site-card))`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `hsl(var(--site-card-hover))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `hsl(var(--site-card))`;
                  }}
                >
                  <span className="text-lg sm:text-xl">{site.icon}</span>
                  <span className="text-xs sm:text-sm font-medium" style={{ color: `hsl(var(--browser-toolbar-foreground))` }}>
                    {site.name}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Browser Content */}
      <div className="relative z-10 h-[calc(100vh-140px)] sm:h-[calc(100vh-150px)]">
        <iframe
          key={key}
          src={url}
          className="w-full h-full border-0"
          title="Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 sm:w-28 sm:h-1 md:w-32 md:h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default BrowserApp;