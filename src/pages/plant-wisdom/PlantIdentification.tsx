
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Leaf, Search, RotateCw, Clock, ArrowRight, SwitchCamera } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedIcon from '@/components/ui-elements/AnimatedIcon';
import { toast } from 'sonner';

const RECENT_SCANS = [
  { id: 1, name: 'Tulsi (Holy Basil)', date: '2 days ago', image: 'tulsi' },
  { id: 2, name: 'Aloe Vera', date: '5 days ago', image: 'aloe' },
  { id: 3, name: 'Ashwagandha', date: '1 week ago', image: 'ashwagandha' }
];

const PlantIdentification = () => {
  const [activeTab, setActiveTab] = useState('camera');
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [result, setResult] = useState<null | { name: string; confidence: number; description: string }>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clean up camera stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'camera' && !result && !capturedImage) {
      startCamera();
    } else if (activeTab !== 'camera' || result || capturedImage) {
      stopCamera();
    }
  }, [activeTab, result, capturedImage]);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error('Camera access is not supported in your browser');
        return;
      }

      const constraints = {
        video: { facingMode: facingMode }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const switchCamera = () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    // Stop current stream before switching
    stopCamera();
    
    // Small delay to ensure previous stream is fully stopped
    setTimeout(() => {
      startCamera();
    }, 300);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to image URL
      const imageUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCapturedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleIdentify = () => {
    setIsIdentifying(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsIdentifying(false);
      setResult({
        name: 'Tulsi (Holy Basil)',
        confidence: 98.5,
        description: 'Tulsi, also known as Holy Basil, is a sacred plant in Hindu belief. It has numerous health benefits including adaptogenic stress relief, natural immunity support, and respiratory health promotion.'
      });
    }, 2000);
  };

  const resetIdentification = () => {
    setResult(null);
    setCapturedImage(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            {/* Hero Section */}
            <div className="relative bg-green-50 py-8 md:py-12 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1600x800/e5f6eb/217549?text=Plant+Identification')] bg-cover bg-center opacity-10" />
              <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-green-200/30 blur-[120px] -z-10" />
              
              <div className="container-standard relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-green-100 text-green-600 text-sm font-medium mb-4">
                    <Search className="w-4 h-4" />
                    <span>Plant Identification</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Identify Plants with <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Gemini AI</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    Take a photo or upload an image to instantly identify plants and discover their Ayurvedic properties and traditional uses.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="py-8 px-6 md:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel - Identification Tool */}
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
                            {isIdentifying ? (
                              <div className="p-10">
                                <AnimatedIcon 
                                  icon={<RotateCw />} 
                                  animation="pulse" 
                                  size="xl" 
                                  className="mb-4 mx-auto animate-spin" 
                                />
                                <h3 className="text-lg font-medium mb-2">Identifying Plant...</h3>
                                <p className="text-sm text-gray-600">
                                  Our AI is analyzing the image to identify the plant and its properties.
                                </p>
                              </div>
                            ) : capturedImage ? (
                              <div className="flex flex-col items-center">
                                <div className="aspect-video relative max-w-2xl w-full mx-auto mb-6 rounded-lg overflow-hidden">
                                  <img 
                                    src={capturedImage} 
                                    alt="Captured plant" 
                                    className="w-full h-full object-contain bg-black"
                                  />
                                </div>
                                <div className="flex gap-3 justify-center">
                                  <Button onClick={handleIdentify} className="px-6">
                                    <Search className="mr-2 h-4 w-4" />
                                    Identify Plant
                                  </Button>
                                  <Button variant="outline" onClick={resetIdentification}>
                                    Retake Photo
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="aspect-video max-w-2xl mx-auto bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center mb-6 overflow-hidden relative">
                                  {isCameraActive ? (
                                    <>
                                      <video 
                                        ref={videoRef} 
                                        autoPlay 
                                        playsInline 
                                        className="absolute inset-0 w-full h-full object-cover"
                                      />
                                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
                                        <Button 
                                          onClick={captureImage}
                                          className="w-12 h-12 rounded-full flex items-center justify-center"
                                        >
                                          <Camera className="h-6 w-6" />
                                        </Button>
                                        <Button 
                                          variant="secondary" 
                                          onClick={switchCamera}
                                          className="w-10 h-10 rounded-full flex items-center justify-center"
                                        >
                                          <SwitchCamera className="h-5 w-5" />
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-center p-6">
                                      <Camera className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                      <h3 className="text-lg font-medium text-gray-300 mb-2">Camera Preview</h3>
                                      <p className="text-sm text-gray-400 mb-4">
                                        Position the plant in the frame for best results
                                      </p>
                                      <Button onClick={startCamera}>
                                        <Camera className="mr-2 h-4 w-4" />
                                        Start Camera
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="max-w-xl mx-auto">
                                  <h3 className="text-lg font-semibold mb-3">Tips for Best Results:</h3>
                                  <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                      <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <span className="text-xs">1</span>
                                      </div>
                                      <span>Ensure good lighting for accurate identification</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <span className="text-xs">2</span>
                                      </div>
                                      <span>Focus on distinctive features like leaves, flowers, or fruits</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <div className="mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <span className="text-xs">3</span>
                                      </div>
                                      <span>Avoid blurry images for more accurate results</span>
                                    </li>
                                  </ul>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-square bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                              <div className="p-4 text-center">
                                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
                                  <Leaf className="h-10 w-10 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-green-800">{result.name}</h3>
                                <p className="text-sm text-green-600 font-medium">
                                  {result.confidence}% confidence
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-xl mb-3">Plant Information</h3>
                              <p className="text-gray-700 mb-4">{result.description}</p>
                              
                              <h4 className="font-medium text-lg mb-2">Ayurvedic Properties:</h4>
                              <ul className="list-disc list-inside text-gray-700 mb-6">
                                <li>Supports respiratory health</li>
                                <li>Adaptogenic - helps body adapt to stress</li>
                                <li>Natural immunity booster</li>
                                <li>Anti-inflammatory properties</li>
                              </ul>
                              
                              <div className="flex gap-3">
                                <Button>
                                  <Leaf className="mr-2 h-4 w-4" />
                                  View Detailed Information
                                </Button>
                                <Button variant="outline" onClick={resetIdentification}>
                                  Try Another
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="upload" className="mt-6">
                        {!capturedImage ? (
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-700 mb-2">Upload a Plant Image</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Drag and drop an image here or click to browse
                            </p>
                            <Button onClick={() => fileInputRef.current?.click()}>
                              <Upload className="mr-2 h-4 w-4" />
                              Browse Files
                            </Button>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                            />
                          </div>
                        ) : !result ? (
                          <div className="flex flex-col items-center">
                            <div className="aspect-video relative max-w-2xl w-full mx-auto mb-6 rounded-lg overflow-hidden">
                              <img 
                                src={capturedImage} 
                                alt="Uploaded plant" 
                                className="w-full h-full object-contain bg-black"
                              />
                            </div>
                            <div className="flex gap-3 justify-center">
                              <Button onClick={handleIdentify} className="px-6">
                                <Search className="mr-2 h-4 w-4" />
                                Identify Plant
                              </Button>
                              <Button variant="outline" onClick={resetIdentification}>
                                Choose Another Image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-square bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                              <div className="p-4 text-center">
                                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
                                  <Leaf className="h-10 w-10 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-green-800">{result.name}</h3>
                                <p className="text-sm text-green-600 font-medium">
                                  {result.confidence}% confidence
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold text-xl mb-3">Plant Information</h3>
                              <p className="text-gray-700 mb-4">{result.description}</p>
                              
                              <h4 className="font-medium text-lg mb-2">Ayurvedic Properties:</h4>
                              <ul className="list-disc list-inside text-gray-700 mb-6">
                                <li>Supports respiratory health</li>
                                <li>Adaptogenic - helps body adapt to stress</li>
                                <li>Natural immunity booster</li>
                                <li>Anti-inflammatory properties</li>
                              </ul>
                              
                              <div className="flex gap-3">
                                <Button>
                                  <Leaf className="mr-2 h-4 w-4" />
                                  View Detailed Information
                                </Button>
                                <Button variant="outline" onClick={resetIdentification}>
                                  Try Another
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>

                    {/* Hidden canvas for image capture */}
                    <canvas ref={canvasRef} className="hidden" />
                  </GlassCard>
                </div>
                
                {/* Right Panel - Recent Scans */}
                <div className="lg:col-span-1">
                  <GlassCard className="p-5 h-full">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Recent Scans</h2>
                      <Button variant="ghost" size="sm" className="text-green-600">
                        <Clock className="mr-1 h-4 w-4" />
                        View All
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {RECENT_SCANS.map((scan) => (
                        <div key={scan.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-green-50 transition-colors cursor-pointer">
                          <div className="h-14 w-14 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                            <Leaf className="h-7 w-7" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{scan.name}</h3>
                            <p className="text-xs text-gray-500">{scan.date}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h3 className="font-semibold mb-3">Common Plants</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Tulsi', 'Neem', 'Aloe Vera', 'Ashwagandha', 'Brahmi', 'Ginger', 'Turmeric'].map((tag) => (
                          <div 
                            key={tag} 
                            className="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-600 text-sm rounded-full cursor-pointer transition-colors"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
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

export default PlantIdentification;
