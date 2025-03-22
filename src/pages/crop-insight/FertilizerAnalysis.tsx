
import React, { useState } from 'react';
import { 
  Sprout, 
  Upload, 
  Microscope, 
  BarChart, 
  FileText, 
  Beaker,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample fertilizer data for comparison
const sampleFertilizers = [
  {
    id: 1,
    name: "SuperGrow Premium",
    npk: "10-5-5",
    nitrogen: 10,
    phosphorus: 5,
    potassium: 5,
    calcium: 2.1,
    magnesium: 1.5,
    sulfur: 0.8,
    type: "Synthetic",
    price: 25,
    suitableFor: ["Vegetables", "Fruit trees", "Ornamentals"]
  },
  {
    id: 2,
    name: "OrganicPlus",
    npk: "5-3-3",
    nitrogen: 5,
    phosphorus: 3,
    potassium: 3,
    calcium: 3.2,
    magnesium: 0.9,
    sulfur: 1.2,
    type: "Organic",
    price: 32,
    suitableFor: ["Organic crops", "Vegetables", "Herbs"]
  },
  {
    id: 3,
    name: "BoostNGrow",
    npk: "20-20-20",
    nitrogen: 20,
    phosphorus: 20,
    potassium: 20,
    calcium: 0,
    magnesium: 0,
    sulfur: 0.5,
    type: "Synthetic",
    price: 19,
    suitableFor: ["Flowering plants", "Fruiting plants", "High-yield crops"]
  },
  {
    id: 4,
    name: "SoilMender",
    npk: "8-2-4",
    nitrogen: 8,
    phosphorus: 2,
    potassium: 4,
    calcium: 5.0,
    magnesium: 2.1,
    sulfur: 3.0,
    type: "Organic",
    price: 28,
    suitableFor: ["Root vegetables", "Leafy greens", "Soil improvement"]
  }
];

const FertilizerAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('analyze');
  const [selectedFertilizers, setSelectedFertilizers] = useState<number[]>([]);
  const [compareView, setCompareView] = useState<boolean>(false);
  
  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis completion after 2 seconds
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const toggleFertilizerSelection = (id: number) => {
    if (selectedFertilizers.includes(id)) {
      setSelectedFertilizers(selectedFertilizers.filter(fid => fid !== id));
    } else {
      if (selectedFertilizers.length < 3) {
        setSelectedFertilizers([...selectedFertilizers, id]);
      }
    }
  };

  const startComparison = () => {
    if (selectedFertilizers.length > 1) {
      setCompareView(true);
    }
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
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="analyze">Analyze</TabsTrigger>
                  <TabsTrigger value="compare">Compare</TabsTrigger>
                </TabsList>
                
                <TabsContent value="analyze">
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
                              
                              <div className="flex gap-3">
                                <button className="flex-1 py-2 bg-white border border-sky-200 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium">
                                  View Detailed Report
                                </button>
                                <button 
                                  className="flex-1 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-medium"
                                  onClick={() => {
                                    setActiveTab('compare'); 
                                    setSelectedFertilizers([1]);
                                  }}
                                >
                                  Compare with Others
                                </button>
                              </div>
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
                        { id: 1, name: "SuperGrow Premium", type: "10-5-5", date: "2 days ago" },
                        { id: 2, name: "OrganicPlus", type: "5-3-3", date: "1 week ago" },
                        { id: 3, name: "BoostNGrow", type: "20-20-20", date: "2 weeks ago" }
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
                </TabsContent>
                
                <TabsContent value="compare">
                  {!compareView ? (
                    <>
                      <h2 className="text-xl font-semibold mb-4">Select Fertilizers to Compare</h2>
                      <p className="text-gray-600 mb-6">Choose up to 3 fertilizers to compare their nutrient content, price, and suitability.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {sampleFertilizers.map(fertilizer => (
                          <div 
                            key={fertilizer.id} 
                            className={`relative bg-white p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedFertilizers.includes(fertilizer.id) 
                                ? 'border-sky-500 shadow-md' 
                                : 'border-gray-200 hover:border-sky-300'
                            }`}
                            onClick={() => toggleFertilizerSelection(fertilizer.id)}
                          >
                            {selectedFertilizers.includes(fertilizer.id) && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                                <Beaker className="w-5 h-5 text-sky-600" />
                              </div>
                              <div>
                                <h3 className="font-medium">{fertilizer.name}</h3>
                                <p className="text-xs text-gray-500">NPK: {fertilizer.npk}</p>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Type:</span>
                                <span className="font-medium">{fertilizer.type}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Price:</span>
                                <span className="font-medium">${fertilizer.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Selected: {selectedFertilizers.length}/3 fertilizers
                        </p>
                        <Button 
                          onClick={startComparison}
                          disabled={selectedFertilizers.length < 2} 
                          className="bg-sky-600 hover:bg-sky-700 text-white"
                        >
                          Compare Selected
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Fertilizer Comparison</h2>
                        <Button 
                          variant="outline" 
                          onClick={() => setCompareView(false)}
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Change Selection
                        </Button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                          <thead className="bg-gray-50 text-gray-700">
                            <tr>
                              <th className="py-3 px-4 text-left text-sm font-medium">Properties</th>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <th key={id} className="py-3 px-4 text-left text-sm font-medium">
                                    {fertilizer?.name}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">NPK Ratio</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.npk}
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Nitrogen (N)</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.nitrogen}%
                                  </td>
                                );
                              })}
                            </tr>
                            <tr>
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Phosphorus (P)</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.phosphorus}%
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Potassium (K)</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.potassium}%
                                  </td>
                                );
                              })}
                            </tr>
                            <tr>
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Calcium (Ca)</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.calcium}%
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Magnesium (Mg)</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.magnesium}%
                                  </td>
                                );
                              })}
                            </tr>
                            <tr>
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Sulfur (S)</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.sulfur}%
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Type</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.type}
                                  </td>
                                );
                              })}
                            </tr>
                            <tr>
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Price</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    ${fertilizer?.price}
                                  </td>
                                );
                              })}
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium text-gray-700">Suitable For</td>
                              {selectedFertilizers.map(id => {
                                const fertilizer = sampleFertilizers.find(f => f.id === id);
                                return (
                                  <td key={id} className="py-3 px-4 text-sm">
                                    {fertilizer?.suitableFor.join(", ")}
                                  </td>
                                );
                              })}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Recommendation</h3>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                          <p className="text-sm text-blue-800">
                            Based on the comparison, <strong>{sampleFertilizers.find(f => f.id === selectedFertilizers[0])?.name}</strong> is ideal for general purpose gardening, while <strong>{sampleFertilizers.find(f => f.id === selectedFertilizers[1])?.name}</strong> is better for specific uses in organic farming. If you're looking for an all-purpose fertilizer with balanced nutrients, <strong>{sampleFertilizers.find(f => f.id === selectedFertilizers[0])?.name}</strong> offers the best value for money.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button variant="outline" className="text-gray-700">
                          Download Comparison (PDF)
                        </Button>
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FertilizerAnalysis;
