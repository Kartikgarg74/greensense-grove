
import React, { useState } from 'react';
import { Camera, Upload, Microscope, Bug, RotateCw, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedIcon from '@/components/ui-elements/AnimatedIcon';

const RECENT_SCANS = [
  { id: 1, name: 'Tomato Plant', date: '3 days ago', result: 'Early Blight Detected' },
  { id: 2, name: 'Rice Crop', date: '1 week ago', result: 'Healthy' },
  { id: 3, name: 'Wheat Field', date: '2 weeks ago', result: 'Rust Disease Detected' }
];

const COMMON_DISEASES = [
  { id: 1, name: 'Early Blight', crops: 'Tomato, Potato', severity: 'High' },
  { id: 2, name: 'Powdery Mildew', crops: 'Cucumber, Squash', severity: 'Medium' },
  { id: 3, name: 'Leaf Spot', crops: 'Pepper, Spinach', severity: 'Medium' },
  { id: 4, name: 'Rust', crops: 'Wheat, Beans', severity: 'High' },
  { id: 5, name: 'Bacterial Wilt', crops: 'Tomato, Eggplant', severity: 'High' }
];

const DiseaseDetection = () => {
  const [activeTab, setActiveTab] = useState('camera');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    disease: string;
    confidence: number;
    cropType: string;
    severity: string;
    description: string;
    treatments: string[];
    preventions: string[];
  }>(null);

  const handleDetect = () => {
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        disease: 'Early Blight',
        confidence: 94.8,
        cropType: 'Tomato',
        severity: 'Medium',
        description: 'Early blight is a common fungal disease that affects tomatoes. It produces dark spots with concentric rings, typically on lower leaves first. The disease is caused by Alternaria solani and can spread quickly in warm, humid conditions.',
        treatments: [
          'Remove and destroy infected leaves',
          'Apply organic fungicide like copper-based solutions',
          'Ensure proper spacing between plants for air circulation',
          'Consider neem oil spray for organic treatment'
        ],
        preventions: [
          'Rotate crops annually - avoid planting tomatoes in the same location for 3-4 years',
          'Use disease-resistant tomato varieties',
          'Water at the base of plants to keep foliage dry',
          'Apply mulch to prevent soil splash onto leaves'
        ]
      });
    }, 2000);
  };

  const resetDetection = () => {
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
            <div className="relative bg-red-50 py-8 md:py-12 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1600x800/fdf2f2/c53030?text=Disease+Detection')] bg-cover bg-center opacity-10" />
              <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-red-200/30 blur-[120px] -z-10" />
              
              <div className="container-standard relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-red-100 text-red-600 text-sm font-medium mb-4">
                    <Bug className="w-4 h-4" />
                    <span>Disease Detection</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Detect Plant Diseases with <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">AI Precision</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    Take a photo of your plants to instantly identify diseases, assess severity, and receive targeted treatment recommendations.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="py-8 px-6 md:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel - Detection Tool */}
                <div className="lg:col-span-2">
                  <GlassCard className="p-5 h-full">
                    <Tabs defaultValue="camera" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                      <TabsList className="w-full max-w-[400px] mx-auto bg-muted/50">
                        <TabsTrigger value="camera" className="flex-1 flex items-center justify-center gap-2">
                          <Camera className="h-4 w-4" />
                          <span>Camera</span>
                        </TabsTrigger>
                        <TabsTrigger value="upload" className="flex-1 flex items-center justify-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>Upload</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="camera" className="mt-6">
                        {!result ? (
                          <div className="text-center">
                            {isAnalyzing ? (
                              <div className="p-10">
                                <AnimatedIcon 
                                  icon={<RotateCw />} 
                                  animation="pulse" 
                                  size="xl" 
                                  className="mb-4 mx-auto animate-spin" 
                                />
                                <h3 className="text-lg font-medium mb-2">Analyzing Plant...</h3>
                                <p className="text-sm text-gray-600">
                                  Our AI is examining the image to identify potential diseases.
                                </p>
                              </div>
                            ) : (
                              <>
                                <div className="aspect-video max-w-2xl mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-6">
                                  <div className="text-center p-6">
                                    <Camera className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Camera Preview</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                      Focus on the affected area of the plant
                                    </p>
                                    <Button onClick={handleDetect} className="bg-red-600 hover:bg-red-700">
                                      <Camera className="mr-2 h-4 w-4" />
                                      Capture & Detect
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="max-w-xl mx-auto">
                                  <h3 className="text-lg font-semibold mb-3">Tips for Accurate Detection:</h3>
                                  <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                      <div className="mt-1 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                                        <span className="text-xs">1</span>
                                      </div>
                                      <span>Focus on leaves or stems showing signs of disease</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="mt-1 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                                        <span className="text-xs">2</span>
                                      </div>
                                      <span>Ensure good lighting for accurate analysis</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="mt-1 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                                        <span className="text-xs">3</span>
                                      </div>
                                      <span>Capture multiple views for more comprehensive detection</span>
                                    </li>
                                  </ul>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
                              <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3">
                                  <div className="aspect-square bg-red-50 rounded-lg flex items-center justify-center border border-red-100">
                                    <div className="p-4 text-center">
                                      <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
                                        <Bug className="h-8 w-8 text-red-500" />
                                      </div>
                                      <h3 className="text-xl font-semibold text-red-800 mb-1">{result.disease}</h3>
                                      <p className="text-sm font-medium">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                                          result.severity === 'High' ? 'bg-red-100 text-red-700' :
                                          result.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                          'bg-green-100 text-green-700'
                                        }`}>
                                          {result.severity} Severity
                                        </span>
                                      </p>
                                      <p className="text-sm text-red-600 mt-2">
                                        {result.confidence}% confidence
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="md:w-2/3">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h3 className="text-xl font-semibold text-gray-900">{result.disease} on {result.cropType}</h3>
                                      <p className="text-gray-500 text-sm">Detected on {new Date().toLocaleDateString()}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={resetDetection}>
                                      Detect Another
                                    </Button>
                                  </div>
                                  
                                  <div className="mb-4">
                                    <h4 className="font-medium text-gray-700 mb-2">About This Disease:</h4>
                                    <p className="text-gray-600 text-sm">{result.description}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mb-3 text-red-600">
                                    <AlertCircle className="h-4 w-4" />
                                    <span className="text-sm font-medium">Action Required</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Treatment Recommendations</h3>
                                <ul className="space-y-2">
                                  {result.treatments.map((treatment, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="mt-0.5 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                                        <span className="text-xs">{index + 1}</span>
                                      </div>
                                      <span className="text-sm text-gray-700">{treatment}</span>
                                    </li>
                                  ))}
                                </ul>
                                
                                <Button className="mt-4 w-full bg-red-600 hover:bg-red-700">
                                  View Detailed Treatment Guide
                                </Button>
                              </div>
                              
                              <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Prevention Tips</h3>
                                <ul className="space-y-2">
                                  {result.preventions.map((prevention, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <span className="text-xs">{index + 1}</span>
                                      </div>
                                      <span className="text-sm text-gray-700">{prevention}</span>
                                    </li>
                                  ))}
                                </ul>
                                
                                <Button variant="outline" className="mt-4 w-full">
                                  Add to Calendar Reminders
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="upload" className="mt-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
                          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Plant Image</h3>
                          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                            Upload a clear image of the affected plant area for AI disease detection
                          </p>
                          <Button className="bg-red-600 hover:bg-red-700">
                            <Upload className="mr-2 h-4 w-4" />
                            Browse Files
                          </Button>
                          <input type="file" className="hidden" accept="image/*" />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </GlassCard>
                </div>
                
                {/* Right Panel - Recent Scans & Info */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    <GlassCard className="p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Recent Scans</h2>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Clock className="mr-1 h-4 w-4" />
                          View All
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {RECENT_SCANS.map((scan) => (
                          <div key={scan.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-red-50 transition-colors cursor-pointer">
                            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                              <Microscope className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">{scan.name}</h3>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-gray-500">{scan.date}</span>
                                <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                                <span className={`${
                                  scan.result.includes('Detected') ? 'text-red-600' : 'text-green-600'
                                }`}>{scan.result}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-5">
                      <h2 className="text-lg font-semibold mb-4">Common Plant Diseases</h2>
                      
                      <div className="space-y-3">
                        {COMMON_DISEASES.map((disease) => (
                          <div key={disease.id} className="p-3 bg-white rounded-lg border border-gray-100 hover:border-red-200 cursor-pointer transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-800">{disease.name}</h3>
                                <p className="text-xs text-gray-500">Affects: {disease.crops}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                disease.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                              }`}>
                                {disease.severity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Button variant="outline" className="w-full">
                          <Bug className="mr-2 h-4 w-4" />
                          View Disease Encyclopedia
                        </Button>
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-5 bg-red-50">
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Need Expert Advice?</h3>
                        <p className="text-red-700 mb-4 text-sm">
                          Connect with plant pathologists for difficult cases or severe infestations.
                        </p>
                        <Button className="bg-red-600 hover:bg-red-700">
                          Connect with Specialists
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

export default DiseaseDetection;
