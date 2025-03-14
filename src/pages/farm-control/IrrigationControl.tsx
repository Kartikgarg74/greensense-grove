
import React, { useState } from 'react';
import { 
  Droplet, 
  Clock, 
  Layers, 
  ToggleRight, 
  Calendar, 
  DropletIcon, 
  CloudRain,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const IrrigationControl = () => {
  const [zoneStatus, setZoneStatus] = useState({
    "North Field": true,
    "South Field": false,
    "East Field": false,
    "Greenhouse": true,
  });

  const toggleZone = (zone: string) => {
    setZoneStatus(prev => ({
      ...prev,
      [zone]: !prev[zone]
    }));
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Irrigation Control</h1>
                    <p className="text-gray-600 mt-1">Manage and monitor your irrigation systems.</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium flex items-center">
                      <DropletIcon className="w-4 h-4 mr-1" />
                      <span>Water conservation mode active</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Water Usage Overview */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Water Usage Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Today's Usage</CardTitle>
                      <CardDescription>428 liters used</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Daily target:</span>
                          <span className="font-medium">500 liters</span>
                        </div>
                        <Progress value={85} className="h-2" />
                        <p className="text-xs text-green-600">15% below daily target</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Weekly Usage</CardTitle>
                      <CardDescription>2,843 liters used</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Weekly target:</span>
                          <span className="font-medium">3,500 liters</span>
                        </div>
                        <Progress value={81} className="h-2" />
                        <p className="text-xs text-green-600">19% below weekly target</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Water Tank Level</CardTitle>
                      <CardDescription>Primary reservoir</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Current level:</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                        <p className="text-xs text-blue-600">Estimated 4 days remaining</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Zone Controls */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Irrigation Zones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(zoneStatus).map(([zone, active]) => (
                    <GlassCard key={zone} className="p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-lg">{zone}</h3>
                        <button 
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}
                          onClick={() => toggleZone(zone)}
                        >
                          {active ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Droplet className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">Moisture level:</span>
                          </div>
                          <span className="text-sm font-medium">
                            {zone === "North Field" ? "42%" : 
                             zone === "South Field" ? "68%" : 
                             zone === "East Field" ? "55%" : "73%"}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span className="text-sm">Last watered:</span>
                          </div>
                          <span className="text-sm font-medium">
                            {zone === "North Field" ? "2 hours ago" : 
                             zone === "South Field" ? "Yesterday" : 
                             zone === "East Field" ? "3 days ago" : "30 min ago"}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-earth-500" />
                            <span className="text-sm">Irrigation mode:</span>
                          </div>
                          <span className="text-sm font-medium">
                            {zone === "North Field" ? "Drip irrigation" : 
                             zone === "South Field" ? "Sprinkler" : 
                             zone === "East Field" ? "Sprinkler" : "Drip irrigation"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-5 flex space-x-2">
                        <button 
                          className={`flex-1 py-2 text-center text-sm font-medium rounded-md ${
                            active ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'
                          } transition-colors`}
                          onClick={() => toggleZone(zone)}
                        >
                          {active ? 'Stop Irrigation' : 'Start Irrigation'}
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              
              {/* Weather Advisory */}
              <div className="mb-10">
                <GlassCard className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <CloudRain className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Weather Advisory</h2>
                      <p className="text-gray-600">Upcoming weather conditions affecting irrigation.</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-800">Rainfall expected in the next 24 hours</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          Forecasts predict 32mm of rainfall. Irrigation schedules have been automatically adjusted to conserve water.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {['Today', 'Tomorrow', 'Wednesday', 'Thursday'].map((day, index) => (
                      <div key={day} className="p-3 bg-white rounded-lg border border-gray-100">
                        <p className="text-sm font-medium">{day}</p>
                        <div className="mt-1 flex items-center">
                          <CloudRain className={`w-5 h-5 ${index === 0 || index === 1 ? 'text-blue-500' : 'text-gray-300'}`} />
                          <span className="ml-1 text-xs">{index === 0 ? '32mm' : index === 1 ? '18mm' : '0mm'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
              
              {/* Scheduling */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Irrigation Schedule</h2>
                <GlassCard className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600">Configure automated irrigation schedules for your zones.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="font-medium">North Field Morning Schedule</h3>
                          <p className="text-xs text-gray-500">Drip irrigation, 25 min duration</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm mr-2">Active</span>
                          <ToggleRight className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-gray-500">Schedule:</span>
                          <span className="ml-2">Daily at 6:30 AM</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">Edit</button>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="font-medium">Greenhouse Schedule</h3>
                          <p className="text-xs text-gray-500">Drip irrigation, 10 min duration</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm mr-2">Active</span>
                          <ToggleRight className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-gray-500">Schedule:</span>
                          <span className="ml-2">Twice daily at 7:00 AM and 5:00 PM</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">Edit</button>
                      </div>
                    </div>
                    
                    <button className="mt-2 py-2 w-full bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      + Add New Schedule
                    </button>
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

export default IrrigationControl;
