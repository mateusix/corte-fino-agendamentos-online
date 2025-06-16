
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

// IMPORTAÇÃO QUE FALTAVA:
import { AppointmentProvider } from "./context/AppointmentContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppointmentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="agendar" element={<BookingPage />} />
              <Route path="meus-agendamentos" element={<AppointmentsPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppointmentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
