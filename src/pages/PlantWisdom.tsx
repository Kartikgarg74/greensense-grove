
import React from 'react';
import { 
  Leaf, 
  Search, 
  BookOpen, 
  Camera, 
  Info, 
  ArrowRight, 
  MapPin, 
  Compass 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import FeatureCard from '@/components/dashboard/FeatureCard';

const PlantWisdom = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            {/* Hero Section */}
            <div className="relative bg-greensense-50 py-10 md:py-16 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1600x800/e9f7ef/1a5d1a?text=Plants+Background')] bg-cover bg-center opacity-10" />
              <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-greensense-200/30 blur-[120px] -z-10" />
              
              <div className="container-standard relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-greensense-100 text-greensense-600 text-sm font-medium mb-4">
                    <Leaf className="w-4 h-4" />
                    <span>PlantWisdom Hub</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Discover the World of <span className="text-gradient">Medicinal Plants</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    Explore our 3D plant models, identify unknown species, and access traditional Ayurvedic knowledge all in one place.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="/plant-wisdom/explorer" 
                      className="px-5 py-2.5 bg-greensense-600 hover:bg-greensense-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Compass className="w-4 h-4" />
                      <span>3D Explorer</span>
                    </a>
                    
                    <a 
                      href="/plant-wisdom/identification" 
                      className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Identify Plants</span>
                    </a>
                    
                    <a 
                      href="/plant-wisdom/knowledge-base" 
                      className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Knowledge Base</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="py-12 px-6 md:px-10">
              {/* Search Bar */}
              <div className="mb-10">
                <div className="relative max-w-2xl mx-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-greensense-500 focus:border-transparent"
                    placeholder="Search for plants, herbs, remedies..."
                  />
                </div>
              </div>
              
              {/* Featured Plants */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Featured Plants</h2>
                  <a href="/plant-wisdom/explorer" className="text-sm text-greensense-600 hover:text-greensense-700 flex items-center gap-1">
                    <span>View all</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {["Tulsi", "Ashwagandha", "Neem", "Turmeric"].map((plant, index) => (
                    <GlassCard key={index} hoverEffect className="overflow-hidden">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={`https://placehold.co/400x400/e9f7ef/1a5d1a?text=${plant}`}
                          alt={plant}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{plant}</h3>
                        <p className="text-sm text-gray-600 mb-3">Medicinal plant with multiple benefits</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>South Asia</span>
                          </div>
                          <button className="text-greensense-600 hover:text-greensense-700">
                            <Info className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              
              {/* Key Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Explore Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    title="3D Plant Explorer"
                    description="Interact with detailed 3D models of medicinal plants and learn about their structure."
                    icon={<Compass />}
                    linkTo="/plant-wisdom/explorer"
                    colorScheme="green"
                  />
                  
                  <FeatureCard
                    title="Plant Identification"
                    description="Use our AI-powered tool to identify plants from photos with high accuracy."
                    icon={<Camera />}
                    linkTo="/plant-wisdom/identification"
                    colorScheme="blue"
                  />
                  
                  <FeatureCard
                    title="Ayurvedic Knowledge Base"
                    description="Access traditional wisdom about plant properties, uses, and preparations."
                    icon={<BookOpen />}
                    linkTo="/plant-wisdom/knowledge-base"
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

export default PlantWisdom;
