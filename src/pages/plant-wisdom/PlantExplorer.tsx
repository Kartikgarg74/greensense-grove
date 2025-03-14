
import React, { useState } from 'react';
import { Search, Leaf, RotateCw, ZoomIn, ZoomOut, Info } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedIcon from '@/components/ui-elements/AnimatedIcon';

const PLACEHOLDER_PLANT_MODELS = [
  { id: 1, name: 'Tulsi (Holy Basil)', scientificName: 'Ocimum sanctum', category: 'Herb', model: 'tulsi' },
  { id: 2, name: 'Neem', scientificName: 'Azadirachta indica', category: 'Tree', model: 'neem' },
  { id: 3, name: 'Aloe Vera', scientificName: 'Aloe barbadensis miller', category: 'Succulent', model: 'aloe' },
  { id: 4, name: 'Ashwagandha', scientificName: 'Withania somnifera', category: 'Herb', model: 'ashwagandha' },
  { id: 5, name: 'Brahmi', scientificName: 'Bacopa monnieri', category: 'Herb', model: 'brahmi' },
  { id: 6, name: 'Amla', scientificName: 'Phyllanthus emblica', category: 'Tree', model: 'amla' },
];

const PlantExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(PLACEHOLDER_PLANT_MODELS[0]);
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredPlants = PLACEHOLDER_PLANT_MODELS.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || plant.category.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            {/* Hero Section */}
            <div className="relative bg-green-50 py-8 md:py-12 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1600x800/e5f6eb/217549?text=3D+Plant+Explorer')] bg-cover bg-center opacity-10" />
              <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-green-200/30 blur-[120px] -z-10" />
              
              <div className="container-standard relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-green-100 text-green-600 text-sm font-medium mb-4">
                    <Leaf className="w-4 h-4" />
                    <span>3D Plant Explorer</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Explore Ayurvedic <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Plants in 3D</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    Discover the rich healing properties of Ayurvedic herbs through interactive 3D models. Rotate, zoom, and learn about their traditional and modern uses.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="py-8 px-6 md:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel - Plant List */}
                <div className="lg:col-span-1">
                  <GlassCard className="p-5 h-full">
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Search plants..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
                      <TabsList className="w-full bg-muted/50">
                        <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                        <TabsTrigger value="Herb" className="flex-1">Herbs</TabsTrigger>
                        <TabsTrigger value="Tree" className="flex-1">Trees</TabsTrigger>
                        <TabsTrigger value="Succulent" className="flex-1">Succulents</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <div className="space-y-2 overflow-y-auto max-h-[600px] pr-2">
                      {filteredPlants.length > 0 ? (
                        filteredPlants.map((plant) => (
                          <div
                            key={plant.id}
                            className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-green-50 ${
                              selectedPlant.id === plant.id ? 'bg-green-50 border border-green-100' : 'bg-white border border-gray-100'
                            }`}
                            onClick={() => setSelectedPlant(plant)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <Leaf className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{plant.name}</h3>
                                <p className="text-xs text-gray-500 italic">{plant.scientificName}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-gray-500">No plants found. Try a different search term.</p>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>
                
                {/* Right Panel - 3D Model Viewer */}
                <div className="lg:col-span-2">
                  <GlassCard className="p-5 h-full">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedPlant.name}</h2>
                        <p className="text-sm text-gray-500 italic">{selectedPlant.scientificName}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* 3D Model Viewer Placeholder */}
                    <div className="aspect-[4/3] bg-green-50 rounded-lg flex items-center justify-center border border-green-100 mb-4">
                      <div className="text-center">
                        <AnimatedIcon 
                          icon={<Leaf />} 
                          animation="float" 
                          size="xl" 
                          className="mb-4 mx-auto" 
                        />
                        <h3 className="text-lg font-medium text-green-700 mb-2">3D Model Placeholder</h3>
                        <p className="text-sm text-gray-600 max-w-md mx-auto">
                          In the actual implementation, this would be a Google Model Viewer with 3D models of the selected plant.
                        </p>
                      </div>
                    </div>
                    
                    {/* Plant Information */}
                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="text-lg font-semibold mb-2">Ayurvedic Properties</h3>
                      <p className="text-gray-700 mb-4">
                        This section would contain detailed information about the Ayurvedic properties, uses, and benefits of the selected plant. 
                        For each plant, specific information would be populated based on the extensive Ayurvedic knowledge base.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Traditional Uses</h4>
                          <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                            <li>Respiratory support</li>
                            <li>Stress management</li>
                            <li>Immunity enhancement</li>
                            <li>Digestive health</li>
                          </ul>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Modern Applications</h4>
                          <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                            <li>Adaptogenic supplements</li>
                            <li>Herbal teas and extracts</li>
                            <li>Essential oils</li>
                            <li>Natural medicines</li>
                          </ul>
                        </div>
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

export default PlantExplorer;
