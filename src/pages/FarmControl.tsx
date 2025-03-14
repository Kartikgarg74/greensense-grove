
import React from 'react';
import { 
  BarChart, 
  Droplet, 
  Sun, 
  Wind, 
  Thermometer, 
  ArrowRight, 
  Settings, 
  Bell, 
  ChevronsUpDown 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import FeatureCard from '@/components/dashboard/FeatureCard';
import StatCard from '@/components/dashboard/StatCard';

const FarmControl = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            {/* Hero Section */}
            <div className="relative bg-earth-50 py-10 md:py-16 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1600x800/efe5d6/6c4e33?text=Farm+Control')] bg-cover bg-center opacity-10" />
              <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-earth-200/30 blur-[120px] -z-10" />
              
              <div className="container-standard relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-earth-100 text-earth-600 text-sm font-medium mb-4">
                    <BarChart className="w-4 h-4" />
                    <span>FarmControl System</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Smart Farming <span className="bg-gradient-to-r from-earth-700 to-earth-500 bg-clip-text text-transparent">IoT Dashboard</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    Monitor and control your farm's environmental conditions in real-time with our advanced IoT monitoring system.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="/farm-control/dashboard" 
                      className="px-5 py-2.5 bg-earth-600 hover:bg-earth-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <BarChart className="w-4 h-4" />
                      <span>IoT Dashboard</span>
                    </a>
                    
                    <a 
                      href="/farm-control/irrigation" 
                      className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <Droplet className="w-4 h-4" />
                      <span>Irrigation Control</span>
                    </a>
                    
                    <a 
                      href="/farm-control/environment" 
                      className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 flex items-center gap-2 transition-colors"
                    >
                      <Thermometer className="w-4 h-4" />
                      <span>Environmental Analysis</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="py-12 px-6 md:px-10">
              {/* Environmental Metrics */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Environmental Metrics</h2>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Last updated: 5 min ago</span>
                    <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                      <ChevronsUpDown className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Temperature"
                    value="24°C"
                    icon={<Thermometer />}
                    change={{ value: 2, type: 'increase' }}
                    colorScheme="amber"
                  />
                  
                  <StatCard
                    title="Humidity"
                    value="68%"
                    icon={<Droplet />}
                    change={{ value: 5, type: 'decrease' }}
                    colorScheme="blue"
                  />
                  
                  <StatCard
                    title="Soil Moisture"
                    value="42%"
                    icon={<Droplet />}
                    change={{ value: 8, type: 'decrease' }}
                    colorScheme="green"
                  />
                  
                  <StatCard
                    title="Light Intensity"
                    value="876 lux"
                    icon={<Sun />}
                    change={{ value: 12, type: 'increase' }}
                    colorScheme="default"
                  />
                </div>
              </div>
              
              {/* IoT Devices */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">IoT Devices</h2>
                  <a href="/farm-control/devices" className="text-sm text-earth-600 hover:text-earth-700 flex items-center gap-1">
                    <span>Manage devices</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "Irrigation System", status: "Active", type: "Control" },
                    { name: "Weather Station", status: "Active", type: "Sensor" },
                    { name: "Soil Sensors", status: "Active", type: "Sensor" },
                    { name: "Greenhouse Controls", status: "Inactive", type: "Control" },
                    { name: "Water Quality Sensor", status: "Active", type: "Sensor" },
                    { name: "Solar Power Monitor", status: "Active", type: "Sensor" }
                  ].map((device, index) => (
                    <GlassCard key={index} hoverEffect className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{device.name}</h3>
                            <p className="text-sm text-gray-600">{device.type}</p>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            device.status === 'Active' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {device.status}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                              <Settings className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                              <Bell className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                          <button className="text-earth-600 hover:text-earth-700 text-sm font-medium">
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
                <h2 className="text-2xl font-bold mb-6">Control Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    title="Irrigation Control"
                    description="Schedule and automate your irrigation systems for optimal water usage."
                    icon={<Droplet />}
                    linkTo="/farm-control/irrigation"
                    colorScheme="blue"
                  />
                  
                  <FeatureCard
                    title="Environmental Monitoring"
                    description="Track temperature, humidity, and other environmental factors."
                    icon={<Thermometer />}
                    linkTo="/farm-control/environment"
                    colorScheme="amber"
                  />
                  
                  <FeatureCard
                    title="Alert Configuration"
                    description="Set up custom alerts for critical environmental changes."
                    icon={<Bell />}
                    linkTo="/farm-control/alerts"
                    colorScheme="green"
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

export default FarmControl;
