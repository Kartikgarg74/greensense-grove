
import React from 'react';
import { 
  BarChart, 
  Droplet, 
  Thermometer, 
  Wind, 
  Sun, 
  Activity,
  ToggleLeft,
  ChevronDown
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import StatCard from '@/components/dashboard/StatCard';

const IoTDashboard = () => {
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
                    <h1 className="text-2xl md:text-3xl font-bold">IoT Dashboard</h1>
                    <p className="text-gray-600 mt-1">Real-time monitoring of your farm sensors and systems.</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-lg p-2 flex items-center gap-2 border border-gray-200">
                      <span className="text-sm font-medium">Last update:</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Live</span>
                    </div>
                    <select className="p-2 bg-white border border-gray-200 rounded-lg text-sm">
                      <option>All Devices</option>
                      <option>Active Only</option>
                      <option>Critical Alerts</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Current Readings */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Current Readings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Soil Moisture"
                    value="62%"
                    icon={<Droplet />}
                    change={{ value: 8, type: 'decrease' }}
                    colorScheme="blue"
                  />
                  
                  <StatCard
                    title="Temperature"
                    value="27°C"
                    icon={<Thermometer />}
                    change={{ value: 3, type: 'increase' }}
                    colorScheme="amber"
                  />
                  
                  <StatCard
                    title="Humidity"
                    value="78%"
                    icon={<Droplet />}
                    change={{ value: 4, type: 'increase' }}
                    colorScheme="green"
                  />
                  
                  <StatCard
                    title="Light Intensity"
                    value="923 lux"
                    icon={<Sun />}
                    change={{ value: 12, type: 'increase' }}
                    colorScheme="default"
                  />
                </div>
              </div>
              
              {/* Sensor Readings Chart */}
              <div className="mb-10">
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Sensor Readings Over Time</h2>
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1.5 text-sm font-medium bg-earth-50 text-earth-600 rounded-md hover:bg-earth-100 transition-colors">
                        24 Hours
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium bg-white text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                        7 Days
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium bg-white text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                        30 Days
                      </button>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-white rounded-lg border border-gray-100 flex items-center justify-center">
                    <Activity className="w-16 h-16 text-gray-300" />
                    <span className="ml-2 text-gray-400">Chart visualization will appear here</span>
                  </div>
                </GlassCard>
              </div>
              
              {/* Device Status */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Device Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[
                    { name: "Soil Moisture Sensor", zone: "North Field", battery: 82, status: "Active" },
                    { name: "Weather Station", zone: "Central", battery: 75, status: "Active" },
                    { name: "Irrigation Controller", zone: "All Fields", battery: "N/A", status: "Active" },
                    { name: "pH Sensor", zone: "South Field", battery: 31, status: "Low Battery" },
                    { name: "Light Sensor", zone: "Greenhouse", battery: 65, status: "Active" },
                    { name: "Water Flow Meter", zone: "Irrigation System", battery: "N/A", status: "Active" }
                  ].map((device, index) => (
                    <GlassCard key={index} className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{device.name}</h3>
                          <p className="text-sm text-gray-500">Zone: {device.zone}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          device.status === 'Active' ? 'bg-green-100 text-green-600' : 
                          device.status === 'Low Battery' ? 'bg-amber-100 text-amber-600' : 
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {device.status}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ToggleLeft className="w-5 h-5 text-green-500" />
                          <span className="text-sm">Online</span>
                        </div>
                        
                        {device.battery !== "N/A" && (
                          <div className="text-sm flex items-center gap-1">
                            <span>Battery:</span>
                            <span className={`font-medium ${
                              Number(device.battery) > 50 ? 'text-green-600' : 
                              Number(device.battery) > 20 ? 'text-amber-600' : 
                              'text-red-600'
                            }`}>
                              {device.battery}%
                            </span>
                          </div>
                        )}
                        
                        <button className="p-1 rounded hover:bg-gray-100">
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              
              {/* System Health */}
              <div>
                <h2 className="text-xl font-semibold mb-4">System Health</h2>
                <GlassCard className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white rounded-lg border border-gray-100">
                      <h3 className="font-medium mb-2">Network Status</h3>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Strong Connection</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Last check: 2 minutes ago
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border border-gray-100">
                      <h3 className="font-medium mb-2">Gateway Status</h3>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Online</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Last restart: 3 days ago
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border border-gray-100">
                      <h3 className="font-medium mb-2">Data Sync</h3>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Latest data synchronized</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Last sync: 5 minutes ago
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default IoTDashboard;
