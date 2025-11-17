import { useNavigate } from "react-router-dom";
import { ArrowLeft, Code, Mail, Globe, Github } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";

const AboutPage = () => {
  const navigate = useNavigate();

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
            <span>Settings</span>
          </button>
          <h1 className="text-lg font-semibold text-foreground">About</h1>
          <div className="w-16" />
        </div>
      </div>

      {/* About Content */}
      <div className="relative z-10 pb-24 pt-6 overflow-y-auto px-4" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        
        {/* App Info */}
        <div className="bg-card rounded-xl p-6 mb-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Code className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">eMobile</h2>
          <p className="text-sm text-muted-foreground mb-1">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground">Build 2024.11.17</p>
        </div>

        {/* Developer Info */}
        <div className="bg-card rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Developer Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Developed with</p>
                <p className="text-sm text-muted-foreground">React, TypeScript, Tailwind CSS</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Contact</p>
                <p className="text-sm text-muted-foreground">developer@emobile.app</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Website</p>
                <p className="text-sm text-muted-foreground">www.emobile.app</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Github className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Open Source</p>
                <p className="text-sm text-muted-foreground">Built with Lovable & Fullstack JavaScript</p>
              </div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="bg-card rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Credits & Acknowledgments</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This iOS interface clone was created as a demonstration of modern web technologies. 
            Special thanks to the open-source community and all the amazing libraries that made this possible.
          </p>
        </div>

        {/* Legal */}
        <div className="text-center text-xs text-muted-foreground space-y-2">
          <p>eMobile is not affiliated with Apple Inc.</p>
          <p>iOS is a trademark of Apple Inc.</p>
          <p className="mt-4">© 2024 eMobile. All rights reserved.</p>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full z-20" />
    </div>
  );
};

export default AboutPage;
