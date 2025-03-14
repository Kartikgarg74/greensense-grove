
import React from 'react';
import { 
  Sprout, 
  Upload, 
  Microscope, 
  FileText, 
  ArrowRight, 
  History, 
  Database 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import FeatureCard from '@/components/dashboard/FeatureCard';

const CropInsight = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            {/* Hero Section */}
            <div className="relative bg-sky-50 py-10 md:py-16 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1600x800/d3eafa/0a6cb7?text=Crop+Analysis')] bg-cover bg-center opacity-10" />
              <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-sky-200/30 blur-[120px] -z-10" />
              
              <div className="container-standard relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-sky-100 text-sky-600 text-sm font-medium mb-4">
                    <Sprout className="w-4 h-4" />
                    <span>CropInsight Center</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    AI-Powered <span className="bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">Crop Analysis</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    Detect plant diseases, analyze soil samples, and receive personalized recommendations for optimal crop health.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="/crop-insight/disease" 
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Disease Detection</span>
                    </a>
                    
                    <a 
                      href="/crop-insight/fertilizer" 
                      className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <Microscope className="w-4 h-4" />
                      <span>Fertilizer Analysis</span>
                    </a>
                    
                    <a 
                      href="/crop-insight/recommendations" 
                      className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Recommendations</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="py-12 px-6 md:px-10">
              {/* Upload Section */}
              <div className="mb-12">
                <GlassCard className="p-6 md:p-8">
                  <div className="text-center max-w-xl mx-auto">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Analyze Your Crops</h2>
                    <p className="text-gray-600 mb-6">
                      Upload images of your plants or crops to detect diseases, analyze nutrient deficiencies, and get actionable recommendations.
                    </p>
                    
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 mb-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-600 mb-1">Drag and drop your image here</p>
                        <p className="text-xs text-gray-500">or browse your files</p>
                        <input type="file" className="hidden" accept="image/*" />
                      </div>
                    </div>
                    
                    <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors">
                      Start Analysis
                    </button>
                  </div>
                </GlassCard>
              </div>
              
              {/* Recent Analysis */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Analysis</h2>
                  <a href="/crop-insight/history" className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1">
                    <span>View history</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["Tomato Leaf", "Rice Plant", "Wheat Crop"].map((crop, index) => (
                    <GlassCard key={index} hoverEffect className="overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={`https://placehold.co/600x400/d3eafa/0a6cb7?text=${crop}`}
                          alt={crop}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 px-2 py-1 bg-sky-600 text-white text-xs font-medium rounded">
                          {index === 0 ? 'Disease Detected' : 'Healthy'}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{crop}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {index === 0 
                            ? 'Early blight detected, treatment recommended' 
                            : 'No issues detected, optimal health'}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Analyzed 2 days ago
                          </div>
                          <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              
              {/* Key Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Analysis Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    title="Disease Detection"
                    description="Identify plant diseases early with our AI-powered image analysis."
                    icon={<Microscope />}
                    linkTo="/crop-insight/disease"
                    colorScheme="blue"
                  />
                  
                  <FeatureCard
                    title="Fertilizer Analysis"
                    description="Get personalized fertilizer recommendations based on soil composition."
                    icon={<Database />}
                    linkTo="/crop-insight/fertilizer"
                    colorScheme="green"
                  />
                  
                  <FeatureCard
                    title="Analysis History"
                    description="Access your past analysis reports and track improvements over time."
                    icon={<History />}
                    linkTo="/crop-insight/history"
                    colorScheme="amber"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CropInsight;
