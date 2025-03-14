
import React, { useState } from 'react';
import { Upload, Microscope, Flask, Leaf, ArrowRight, Activity, Database } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedIcon from '@/components/ui-elements/AnimatedIcon';

const SAMPLE_REPORTS = [
  { id: 1, name: 'Soil Sample #1243', date: '2 days ago', type: 'Clay Soil' },
  { id: 2, name: 'Soil Sample #1201', date: '1 week ago', type: 'Sandy Soil' },
  { id: 3, name: 'Soil Sample #1187', date: '3 weeks ago', type: 'Loamy Soil' }
];

const FertilizerAnalysis = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    soilType: string;
    ph: number;
    nutrients: { name: string; level: string; recommendation: string }[];
    recommendations: string[];
  }>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        soilType: 'Clay Loam',
        ph: 6.5,
        nutrients: [
          { name: 'Nitrogen (N)', level: 'Medium', recommendation: 'Add moderate nitrogen supplements' },
          { name: 'Phosphorus (P)', level: 'Low', recommendation: 'Increase phosphorus with organic matter' },
          { name: 'Potassium (K)', level: 'High', recommendation: 'No additional potassium needed' },
          { name: 'Organic Matter', level: 'Medium', recommendation: 'Add compost to increase organic content' }
        ],
        recommendations: [
          'Apply organic compost at 4-5 kg per square meter',
          'Consider bone meal for phosphorus deficiency',
          'Maintain current potassium levels',
          'Test again after 3 months of treatment'
        ]
      });
    }, 2000);
  };

  const resetAnalysis = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            {/* Hero Section */}
            <div className="relative bg-sky-50 py-8 md:py-12 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1600x800/e5f4fb/217594?text=Fertilizer+Analysis')] bg-cover bg-center opacity-10" />
              <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-sky-200/30 blur-[120px] -z-10" />
              
              <div className="container-standard relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-sky-100 text-sky-600 text-sm font-medium mb-4">
                    <Microscope className="w-4 h-4" />
                    <span>Fertilizer Analysis</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Optimize Your Soil with <span className="bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">Smart Analysis</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    Upload soil sample images or test results to receive AI-powered fertilizer recommendations tailored to your specific crop needs.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="py-8 px-6 md:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel - Analysis Tool */}
                <div className="lg:col-span-2">
                  <GlassCard className="p-5 h-full">
                    <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                      <TabsList className="w-full max-w-md mx-auto bg-muted/50">
                        <TabsTrigger value="upload" className="flex-1 flex items-center justify-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>Upload Sample Image</span>
                        </TabsTrigger>
                        <TabsTrigger value="manual" className="flex-1 flex items-center justify-center gap-2">
                          <Database className="h-4 w-4" />
                          <span>Enter Test Results</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upload" className="mt-6">
                        {!result ? (
                          <div className="text-center">
                            {isAnalyzing ? (
                              <div className="p-10">
                                <AnimatedIcon 
                                  icon={<Flask />} 
                                  animation="pulse" 
                                  size="xl" 
                                  className="mb-4 mx-auto text-sky-500" 
                                />
                                <h3 className="text-lg font-medium mb-2">Analyzing Soil Sample...</h3>
                                <p className="text-sm text-gray-600">
                                  Our AI is extracting nutrient information and preparing recommendations.
                                </p>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10">
                                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Soil Sample Image</h3>
                                <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                                  Upload a clear image of your soil sample or soil test report for AI analysis
                                </p>
                                <Button onClick={handleAnalyze} className="bg-sky-600 hover:bg-sky-700">
                                  <Upload className="mr-2 h-4 w-4" />
                                  Browse Files
                                </Button>
                                <input type="file" className="hidden" accept="image/*" />
                                
                                <div className="mt-8 max-w-lg mx-auto">
                                  <h4 className="font-medium text-gray-700 mb-3">The Soil Image Should:</h4>
                                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                                    <li className="flex items-start gap-2">
                                      <div className="mt-0.5 h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                                        <span className="text-xs">1</span>
                                      </div>
                                      <span>Be well-lit and clearly show the soil texture and color</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="mt-0.5 h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                                        <span className="text-xs">2</span>
                                      </div>
                                      <span>Include a small ruler or reference object for scale</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="mt-0.5 h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                                        <span className="text-xs">3</span>
                                      </div>
                                      <span>Avoid shadows or glare that could affect color accuracy</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="bg-white p-5 rounded-lg border border-sky-100">
                              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900">Soil Analysis Results</h3>
                                  <p className="text-gray-500">Sample analyzed on {new Date().toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" onClick={resetAnalysis}>
                                    Analyze New Sample
                                  </Button>
                                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                                    Download Report
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-sky-50 p-4 rounded-lg">
                                  <div className="text-sm text-sky-600 font-medium mb-1">Soil Type</div>
                                  <div className="text-lg font-medium">{result.soilType}</div>
                                </div>
                                <div className="bg-sky-50 p-4 rounded-lg">
                                  <div className="text-sm text-sky-600 font-medium mb-1">pH Level</div>
                                  <div className="text-lg font-medium">{result.ph}</div>
                                </div>
                                <div className="bg-sky-50 p-4 rounded-lg">
                                  <div className="text-sm text-sky-600 font-medium mb-1">Overall Quality</div>
                                  <div className="text-lg font-medium">Good</div>
                                </div>
                              </div>
                              
                              <h4 className="font-medium text-lg mb-3">Nutrient Analysis</h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                  <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-500">Nutrient</th>
                                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-500">Level</th>
                                      <th className="py-2 px-3 text-left text-sm font-medium text-gray-500">Recommendation</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {result.nutrients.map((nutrient, index) => (
                                      <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-2.5 px-3 text-sm text-gray-900 font-medium">{nutrient.name}</td>
                                        <td className="py-2.5 px-3 text-sm">
                                          <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                                            nutrient.level === 'Low' ? 'bg-red-100 text-red-700' :
                                            nutrient.level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                          }`}>
                                            {nutrient.level}
                                          </span>
                                        </td>
                                        <td className="py-2.5 px-3 text-sm text-gray-600">{nutrient.recommendation}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            
                            <div className="bg-sky-50 p-5 rounded-lg">
                              <h4 className="font-semibold text-lg mb-3 text-sky-700">Fertilizer Recommendations</h4>
                              <ul className="space-y-2">
                                {result.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <div className="mt-0.5 h-5 w-5 rounded-full bg-white flex items-center justify-center text-sky-600 flex-shrink-0">
                                      <span className="text-xs">{index + 1}</span>
                                    </div>
                                    <span className="text-gray-700">{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="manual" className="mt-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                          <h3 className="text-lg font-medium text-gray-800 mb-4">Enter Your Soil Test Results</h3>
                          <p className="text-gray-600 mb-6">
                            If you already have soil test results from a laboratory, enter the values below to receive customized fertilizer recommendations.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option>Select soil type</option>
                                <option>Sandy</option>
                                <option>Clay</option>
                                <option>Loamy</option>
                                <option>Silt</option>
                                <option>Clay Loam</option>
                                <option>Sandy Loam</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">pH Level</label>
                              <input type="number" step="0.1" min="0" max="14" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. 6.5" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (N) ppm</label>
                              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. 45" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (P) ppm</label>
                              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. 30" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (K) ppm</label>
                              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. 200" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Organic Matter %</label>
                              <input type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. 3.5" />
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Crop</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                              <option>Select crop type</option>
                              <option>Rice</option>
                              <option>Wheat</option>
                              <option>Corn</option>
                              <option>Potato</option>
                              <option>Tomato</option>
                              <option>Soybean</option>
                              <option>Cotton</option>
                            </select>
                          </div>
                          
                          <Button className="bg-sky-600 hover:bg-sky-700">Generate Recommendations</Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </GlassCard>
                </div>
                
                {/* Right Panel - Past Reports */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    <GlassCard className="p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Recent Analysis</h2>
                        <Button variant="ghost" size="sm" className="text-sky-600">
                          <Activity className="mr-1 h-4 w-4" />
                          View All
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {SAMPLE_REPORTS.map((report) => (
                          <div key={report.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-sky-50 transition-colors cursor-pointer">
                            <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                              <Flask className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">{report.name}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{report.date}</span>
                                <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                                <span>{report.type}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-5">
                      <h2 className="text-lg font-semibold mb-4">Ideal Nutrient Ranges</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-sm font-medium">Nitrogen (N)</h3>
                            <span className="text-xs text-gray-500">40-80 ppm</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-sm font-medium">Phosphorus (P)</h3>
                            <span className="text-xs text-gray-500">20-50 ppm</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full" style={{ width: '50%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-sm font-medium">Potassium (K)</h3>
                            <span className="text-xs text-gray-500">150-250 ppm</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="text-sm font-medium">Organic Matter</h3>
                            <span className="text-xs text-gray-500">3-5%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Button variant="outline" className="w-full">
                          <Leaf className="mr-2 h-4 w-4" />
                          View Detailed Guide
                        </Button>
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-5 bg-sky-50">
                      <div className="text-center">
                        <Microscope className="h-8 w-8 text-sky-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-sky-800 mb-2">Need Professional Testing?</h3>
                        <p className="text-sky-700 mb-4 text-sm">
                          For more accurate results, submit soil samples to our partner labs.
                        </p>
                        <Button className="bg-sky-600 hover:bg-sky-700">
                          Find Testing Labs
                        </Button>
                      </div>
                    </GlassCard>
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

export default FertilizerAnalysis;
