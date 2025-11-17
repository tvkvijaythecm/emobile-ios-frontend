import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import LockScreen from "./pages/LockScreen";
import Home from "./pages/Home";
import AppPage from "./pages/AppPage";
import SettingsApp from "./pages/SettingsApp";
import AboutPage from "./pages/AboutPage";
import CameraApp from "./pages/CameraApp";
import ClockApp from "./pages/ClockApp";
import NotesApp from "./pages/NotesApp";
import BrowserApp from "./pages/BrowserApp";
import CalculatorApp from "./pages/CalculatorApp";
import TVApp from "./pages/TVApp";
import CalendarApp from "./pages/CalendarApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LockScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/app/settings" element={<SettingsApp />} />
            <Route path="/app/about" element={<AboutPage />} />
            <Route path="/app/camera" element={<CameraApp />} />
            <Route path="/app/clock" element={<ClockApp />} />
            <Route path="/app/notes" element={<NotesApp />} />
            <Route path="/app/browser" element={<BrowserApp />} />
            <Route path="/app/calculator" element={<CalculatorApp />} />
            <Route path="/app/tv" element={<TVApp />} />
            <Route path="/app/calendar" element={<CalendarApp />} />
            <Route path="/app/:appName" element={<AppPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
