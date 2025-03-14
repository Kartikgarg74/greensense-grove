
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* PlantWisdom Hub Routes */}
            <Route path="/plant-wisdom" element={
              <ProtectedRoute>
                <PlantWisdom />
              </ProtectedRoute>
            } />
            <Route path="/plant-wisdom/explorer" element={
              <ProtectedRoute>
                <PlantExplorer />
              </ProtectedRoute>
            } />
            <Route path="/plant-wisdom/identification" element={
              <ProtectedRoute>
                <PlantIdentification />
              </ProtectedRoute>
            } />
            <Route path="/plant-wisdom/knowledge-base" element={
              <ProtectedRoute>
                <KnowledgeBase />
              </ProtectedRoute>
            } />
            
            {/* CropInsight Center Routes */}
            <Route path="/crop-insight" element={
              <ProtectedRoute>
                <CropInsight />
              </ProtectedRoute>
            } />
            <Route path="/crop-insight/fertilizer" element={
              <ProtectedRoute>
                <FertilizerAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/crop-insight/disease" element={
              <ProtectedRoute>
                <DiseaseDetection />
              </ProtectedRoute>
            } />
            <Route path="/crop-insight/recommendations" element={
              <ProtectedRoute>
                <CropRecommendations />
              </ProtectedRoute>
            } />
            
            {/* FarmControl System Routes */}
            <Route path="/farm-control" element={
              <ProtectedRoute>
                <FarmControl />
              </ProtectedRoute>
            } />
            <Route path="/farm-control/dashboard" element={
              <ProtectedRoute>
                <IoTDashboard />
              </ProtectedRoute>
            } />
            <Route path="/farm-control/irrigation" element={
              <ProtectedRoute>
                <IrrigationControl />
              </ProtectedRoute>
            } />
            <Route path="/farm-control/environment" element={
              <ProtectedRoute>
                <EnvironmentalAnalysis />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
