import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import OtpVerification from "./pages/OtpVerification";
import VotePage from "./pages/VotePage";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import HowToVote from "./pages/HowToVote";
import Support from "./pages/Support";
import Candidates from "./pages/Candidates";
import Admin from "./pages/Admin";
import TechnicalSupport from "./pages/TechnicalSupport";
import AuthRequired from "./components/AuthRequired";

const queryClient = new QueryClient();

const App = () => {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={
                <AuthRequired>
                  <Dashboard />
                </AuthRequired>
              } />
              <Route path="/verify" element={<OtpVerification />} />
              <Route path="/vote" element={
                <AuthRequired>
                  <VotePage />
                </AuthRequired>
              } />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/how-to-vote" element={<HowToVote />} />
              <Route path="/support" element={<Support />} />
              <Route path="/technical-support" element={<TechnicalSupport />} />
              <Route path="/candidates/:electionId" element={
                <AuthRequired>
                  <Candidates />
                </AuthRequired>
              } />
              <Route path="/admin" element={
                <AuthRequired>
                  <Admin />
                </AuthRequired>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
