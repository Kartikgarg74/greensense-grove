
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PlantWisdom from "./pages/PlantWisdom";
import CropInsight from "./pages/CropInsight";
import FarmControl from "./pages/FarmControl";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// PlantWisdom sub-pages
import PlantExplorer from "./pages/plant-wisdom/PlantExplorer";
import PlantIdentification from "./pages/plant-wisdom/PlantIdentification";
import KnowledgeBase from "./pages/plant-wisdom/KnowledgeBase";

// CropInsight sub-pages
import FertilizerAnalysis from "./pages/crop-insight/FertilizerAnalysis";
import DiseaseDetection from "./pages/crop-insight/DiseaseDetection";
import CropRecommendations from "./pages/crop-insight/CropRecommendations";

// FarmControl sub-pages
import IoTDashboard from "./pages/farm-control/IoTDashboard";
import IrrigationControl from "./pages/farm-control/IrrigationControl";
import EnvironmentalAnalysis from "./pages/farm-control/EnvironmentalAnalysis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* PlantWisdom Hub Routes */}
          <Route path="/plant-wisdom" element={<PlantWisdom />} />
          <Route path="/plant-wisdom/explorer" element={<PlantExplorer />} />
          <Route path="/plant-wisdom/identification" element={<PlantIdentification />} />
          <Route path="/plant-wisdom/knowledge-base" element={<KnowledgeBase />} />
          
          {/* CropInsight Center Routes */}
          <Route path="/crop-insight" element={<CropInsight />} />
          <Route path="/crop-insight/fertilizer" element={<FertilizerAnalysis />} />
          <Route path="/crop-insight/disease" element={<DiseaseDetection />} />
          <Route path="/crop-insight/recommendations" element={<CropRecommendations />} />
          
          {/* FarmControl System Routes */}
          <Route path="/farm-control" element={<FarmControl />} />
          <Route path="/farm-control/dashboard" element={<IoTDashboard />} />
          <Route path="/farm-control/irrigation" element={<IrrigationControl />} />
          <Route path="/farm-control/environment" element={<EnvironmentalAnalysis />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
