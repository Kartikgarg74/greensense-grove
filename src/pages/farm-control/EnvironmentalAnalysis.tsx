
import React from 'react';
import { 
  CloudSun, 
  Thermometer, 
  Wind, 
  Droplet, 
  Sun, 
  Leaf, 
  Download,
  CalendarIcon,
  LineChart
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EnvironmentalAnalysis = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            <div className="py-8 px-6 md:px-10">
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Environmental Analysis</h1>
                    <p className="text-gray-600 mt-1">Analyze environmental conditions affecting your crops.</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <span>Last 30 days</span>
                    </div>
                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Main Environmental Metrics */}
              <div className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-none">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-amber-800">Temperature</CardTitle>
                        <Thermometer className="w-5 h-5 text-amber-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-bold text-amber-900">27°C</span>
                        <span className="text-sm text-amber-700 pb-1">average</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-amber-700">Range:</span>
                          <span className="ml-1 text-amber-900">18°C - 34°C</span>
                        </div>
                        <div className="text-amber-900 font-semibold flex items-center gap-1">
                          <span>↑</span>
                          <span>3.2°C</span>
                        </div>
                      </div>
                      <div className="h-20 mt-4 flex items-center justify-center text-amber-300">
                        <LineChart className="w-full h-full" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-blue-800">Humidity</CardTitle>
                        <Droplet className="w-5 h-5 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-bold text-blue-900">74%</span>
                        <span className="text-sm text-blue-700 pb-1">average</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-blue-700">Range:</span>
                          <span className="ml-1 text-blue-900">56% - 89%</span>
                        </div>
                        <div className="text-blue-900 font-semibold flex items-center gap-1">
                          <span>↑</span>
                          <span>12%</span>
                        </div>
                      </div>
                      <div className="h-20 mt-4 flex items-center justify-center text-blue-300">
                        <LineChart className="w-full h-full" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-green-800">Soil Quality</CardTitle>
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-bold text-green-900">Good</span>
                        <span className="text-sm text-green-700 pb-1">overall</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-green-700">pH level:</span>
                          <span className="ml-1 text-green-900">6.8</span>
                        </div>
                        <div className="text-green-900 font-semibold flex items-center gap-1">
                          <span>↓</span>
                          <span>0.2</span>
                        </div>
                      </div>
                      <div className="h-20 mt-4 flex items-center justify-center text-green-300">
                        <LineChart className="w-full h-full" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Detailed Analysis */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
                <GlassCard className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-medium text-lg mb-4">Temperature Analysis</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-100">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                              <Thermometer className="w-4 h-4 text-amber-600" />
                            </div>
                            <h4 className="font-medium">Daily Temperature Variation</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Temperature varies by ~12°C between day and night, which is normal for the season. 
                            The current variations are favorable for most crops in your fields.
                          </p>
                          <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
                            <span className="text-gray-400">Temperature chart visualization</span>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg border border-gray-100">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                              <Sun className="w-4 h-4 text-red-600" />
                            </div>
                            <h4 className="font-medium">Heat Stress Analysis</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Five days showed temperatures above 32°C this month, which may cause mild stress 
                            to sensitive crops. Consider additional shading or irrigation during peak heat hours.
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-red-400 h-full" style={{ width: '15%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">15% heat stress risk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-4">Moisture Analysis</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-100">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <CloudSun className="w-4 h-4 text-blue-600" />
                            </div>
                            <h4 className="font-medium">Rainfall Distribution</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Total rainfall this month: 78mm. Distribution has been optimal with regular 
                            light showers. This has reduced irrigation needs by approximately 35%.
                          </p>
                          <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
                            <span className="text-gray-400">Rainfall chart visualization</span>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg border border-gray-100">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <Droplet className="w-4 h-4 text-green-600" />
                            </div>
                            <h4 className="font-medium">Soil Moisture Profile</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Soil moisture levels are within optimal range for most crops. The North field 
                            shows slightly lower levels and may need targeted irrigation.
                          </p>
                          <div className="grid grid-cols-4 gap-2 mt-3">
                            {["North", "South", "East", "West"].map((field, index) => (
                              <div key={field} className="flex flex-col items-center">
                                <div className="h-16 w-full bg-gray-100 rounded-md relative">
                                  <div 
                                    className="absolute bottom-0 w-full bg-blue-400 rounded-md"
                                    style={{ 
                                      height: `${field === "North" ? 50 : field === "South" ? 70 : field === "East" ? 65 : 60}%` 
                                    }}
                                  ></div>
                                </div>
                                <span className="text-xs mt-1">{field}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
              
              {/* Recommendations */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
                <div className="bg-green-50 border border-green-100 rounded-lg p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-green-800 mb-2">AI-Generated Recommendations</h3>
                      <div className="space-y-3">
                        <p className="text-green-700">
                          Based on current environmental conditions, we recommend the following actions:
                        </p>
                        <ul className="list-disc ml-5 space-y-1.5 text-green-700">
                          <li>Adjust irrigation in North field to increase soil moisture by 10-15%</li>
                          <li>Consider adding temporary shade structures during midday hours for heat-sensitive crops</li>
                          <li>Soil pH in East field is trending slightly acidic - monitor and consider lime application if it drops below 6.5</li>
                          <li>Current conditions are optimal for planting legumes and leafy greens</li>
                          <li>Schedule pesticide applications early morning or late evening when humidity is optimal and winds are calm</li>
                        </ul>
                        <div className="pt-2">
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm">
                            Apply Recommendations
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default EnvironmentalAnalysis;
