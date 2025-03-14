
import React, { useState } from 'react';
import { 
  Sprout, 
  Upload, 
  Microscope, 
  BarChart, 
  FileText, 
  Beaker,
  ChevronDown
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FertilizerAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis completion after 2 seconds
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            <div className="py-8 px-6 md:px-10">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Fertilizer Analysis</h1>
                <p className="text-gray-600 mt-1">Analyze fertilizer components and get personalized recommendations.</p>
              </div>
              
              {/* Upload Section */}
              <div className="mb-10">
                <GlassCard className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Analyze Fertilizer</h2>
                      <p className="text-gray-600 mb-6">
                        Upload an image of your fertilizer package or input the details manually to get a complete analysis and usage recommendations.
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="fertilizer-image">Upload Fertilizer Package Image</Label>
                          <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="flex flex-col items-center">
                              <Upload className="w-10 h-10 text-gray-400 mb-3" />
                              <p className="text-sm text-gray-600 mb-1">Drag and drop your image here</p>
                              <p className="text-xs text-gray-500">or browse your files</p>
                              <Input id="fertilizer-image" type="file" className="hidden" accept="image/*" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex-grow h-px bg-gray-200"></div>
                          <span className="mx-4 text-sm text-gray-500">or enter details manually</span>
                          <div className="flex-grow h-px bg-gray-200"></div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="npk-ratio">NPK Ratio</Label>
                            <Input id="npk-ratio" placeholder="e.g., 10-5-5" className="mt-1" />
                          </div>
                          
                          <div>
                            <Label htmlFor="fertilizer-name">Fertilizer Name/Brand</Label>
                            <Input id="fertilizer-name" placeholder="e.g., SuperGrow Premium" className="mt-1" />
                          </div>
                          
                          <div>
                            <Label htmlFor="fertilizer-type">Fertilizer Type</Label>
                            <select id="fertilizer-type" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                              <option>Select type</option>
                              <option>Organic</option>
                              <option>Synthetic</option>
                              <option>Slow-release</option>
                              <option>Liquid</option>
                              <option>Granular</option>
                            </select>
                          </div>
                        </div>
                        
                        <button 
                          onClick={startAnalysis}
                          disabled={isAnalyzing}
                          className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-sky-50 p-6 rounded-lg border border-sky-100">
                      <div className="flex items-center gap-3 mb-4">
                        <Beaker className="w-6 h-6 text-sky-600" />
                        <h2 className="text-xl font-semibold text-sky-800">Analysis Results</h2>
                      </div>
                      
                      {isAnalyzing ? (
                        <div className="flex flex-col items-center justify-center h-64">
                          <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
                          <p className="mt-4 text-sky-700">Analyzing your fertilizer...</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2 text-sky-700">NPK Composition</h3>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-3 bg-white rounded-lg text-center">
                                <div className="text-lg font-bold text-sky-600">10%</div>
                                <div className="text-xs text-gray-500">Nitrogen (N)</div>
                              </div>
                              <div className="p-3 bg-white rounded-lg text-center">
                                <div className="text-lg font-bold text-sky-600">5%</div>
                                <div className="text-xs text-gray-500">Phosphorus (P)</div>
                              </div>
                              <div className="p-3 bg-white rounded-lg text-center">
                                <div className="text-lg font-bold text-sky-600">5%</div>
                                <div className="text-xs text-gray-500">Potassium (K)</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-2 text-sky-700">Secondary Nutrients</h3>
                            <div className="p-3 bg-white rounded-lg">
                              <ul className="text-sm space-y-1">
                                <li className="flex justify-between">
                                  <span>Calcium (Ca)</span>
                                  <span className="font-medium">2.1%</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Magnesium (Mg)</span>
                                  <span className="font-medium">1.5%</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Sulfur (S)</span>
                                  <span className="font-medium">0.8%</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-2 text-sky-700">Usage Recommendation</h3>
                            <div className="p-3 bg-white rounded-lg">
                              <p className="text-sm text-gray-600">
                                This balanced fertilizer is suitable for general garden use. Apply 2-3 kg per 100 square meters every 4-6 weeks during the growing season.
                              </p>
                            </div>
                          </div>
                          
                          <button className="w-full py-2 bg-white border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium">
                            View Detailed Report
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </div>
              
              {/* Previous Analyses */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Previous Analyses</h2>
                <div className="space-y-4">
                  {[
                    { name: "SuperGrow Premium", type: "10-5-5", date: "2 days ago" },
                    { name: "OrganicPlus", type: "5-3-3", date: "1 week ago" },
                    { name: "BoostNGrow", type: "20-20-20", date: "2 weeks ago" }
                  ].map((analysis, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-sky-200 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                            <Microscope className="w-5 h-5 text-sky-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{analysis.name}</h3>
                            <p className="text-sm text-gray-500">NPK: {analysis.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{analysis.date}</span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Comparison Charts */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Nutrient Comparison</h2>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compare Fertilizer Compositions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-64">
                      <BarChart className="w-16 h-16 text-gray-300" />
                      <span className="ml-2 text-gray-400">Comparison chart will appear here</span>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded transition-colors text-sm">
                        Compare Selected Fertilizers
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FertilizerAnalysis;
