
import React from 'react';
import { 
  Sprout, 
  FileText, 
  Map, 
  Calendar,
  CloudSun,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CropRecommendations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            <div className="py-8 px-6 md:px-10">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Crop Recommendations</h1>
                <p className="text-gray-600 mt-1">Get AI-powered recommendations for optimal crop selection.</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Analyze Your Farm Data</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                          <option>Select soil type</option>
                          <option>Clay</option>
                          <option>Sandy</option>
                          <option>Loamy</option>
                          <option>Silty</option>
                          <option>Peaty</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">pH Level</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                          <option>Select pH range</option>
                          <option>Acidic (below 6.0)</option>
                          <option>Neutral (6.0 - 7.0)</option>
                          <option>Alkaline (above 7.0)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Climate Zone</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                          <option>Select climate zone</option>
                          <option>Tropical</option>
                          <option>Subtropical</option>
                          <option>Temperate</option>
                          <option>Arid</option>
                          <option>Mediterranean</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Water Availability</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                          <option>Select water availability</option>
                          <option>Limited</option>
                          <option>Moderate</option>
                          <option>Abundant</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Farm Location</label>
                        <div className="h-36 bg-gray-100 rounded-md flex items-center justify-center">
                          <Map className="w-6 h-6 text-gray-400 mr-2" />
                          <span className="text-gray-500">Map widget will be displayed here</span>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <button className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors">
                          Generate Recommendations
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </div>
                
                <div>
                  <GlassCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Seasonal Insights</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                        <Calendar className="w-8 h-8 text-sky-600" />
                        <div>
                          <h3 className="font-medium">Current Season</h3>
                          <p className="text-sm text-gray-600">Monsoon (Jun-Sep)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Sprout className="w-8 h-8 text-green-600" />
                        <div>
                          <h3 className="font-medium">Ideal Planting Time</h3>
                          <p className="text-sm text-gray-600">July - August</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                        <CloudSun className="w-8 h-8 text-amber-600" />
                        <div>
                          <h3 className="font-medium">Weather Forecast</h3>
                          <p className="text-sm text-gray-600">Moderate rainfall expected</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-4">Top Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {["Rice", "Maize", "Pulses"].map((crop, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle>{crop}</CardTitle>
                      <CardDescription>
                        {index === 0 ? '95% match to your conditions' : 
                         index === 1 ? '87% match to your conditions' : 
                         '82% match to your conditions'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Water requirement:</span>
                          <span className="font-medium">{index === 0 ? 'High' : index === 1 ? 'Moderate' : 'Low'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Growth period:</span>
                          <span className="font-medium">{index === 0 ? '120-150 days' : index === 1 ? '90-120 days' : '60-90 days'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Yield potential:</span>
                          <span className="font-medium">{index === 0 ? 'High' : index === 1 ? 'Very High' : 'Moderate'}</span>
                        </div>
                        
                        <div className="pt-2">
                          <button className="w-full text-sm text-sky-600 hover:text-sky-700 flex items-center justify-center gap-1 mt-2">
                            <span>View detailed report</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CropRecommendations;
