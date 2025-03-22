
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Droplet, 
  Thermometer, 
  Wind, 
  Sun, 
  Activity,
  ToggleLeft,
  ChevronDown,
  ChevronUp,
  Settings,
  AlertTriangle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import StatCard from '@/components/dashboard/StatCard';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import mongoDBService, { SensorData } from '@/services/MongoDBService';

// Mock IoT device data
const mockDevices = [
  { id: "dev-001", name: "Soil Moisture Sensor", zone: "North Field", battery: 82, status: "Active", online: true },
  { id: "dev-002", name: "Weather Station", zone: "Central", battery: 75, status: "Active", online: true },
  { id: "dev-003", name: "Irrigation Controller", zone: "All Fields", battery: "N/A", status: "Active", online: true },
  { id: "dev-004", name: "pH Sensor", zone: "South Field", battery: 31, status: "Low Battery", online: true },
  { id: "dev-005", name: "Light Sensor", zone: "Greenhouse", battery: 65, status: "Active", online: true },
  { id: "dev-006", name: "Water Flow Meter", zone: "Irrigation System", battery: "N/A", status: "Active", online: true }
];

const IoTDashboard = () => {
  const [devices, setDevices] = useState(mockDevices);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching sensor data
  useEffect(() => {
    const fetchSensorData = async () => {
      setIsLoading(true);
      
      try {
        const now = new Date();
        let startDate;
        
        // Calculate start date based on selected timeframe
        switch (selectedTimeframe) {
          case '24h':
            startDate = new Date(now);
            startDate.setDate(startDate.getDate() - 1);
            break;
          case '7d':
            startDate = new Date(now);
            startDate.setDate(startDate.getDate() - 7);
            break;
          case '30d':
            startDate = new Date(now);
            startDate.setDate(startDate.getDate() - 30);
            break;
          default:
            startDate = new Date(now);
            startDate.setDate(startDate.getDate() - 1);
        }
        
        // Fetch soil moisture data for the first device
        const data = await mongoDBService.getSensorData(
          'user123', 
          'dev-001', 
          'moisture', 
          startDate, 
          now
        );
        
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch sensor data',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSensorData();
  }, [selectedTimeframe]);

  const toggleDeviceExpansion = (deviceId: string) => {
    if (expandedDevice === deviceId) {
      setExpandedDevice(null);
    } else {
      setExpandedDevice(deviceId);
    }
  };

  const updateDeviceStatus = (deviceId: string, status: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, status } 
        : device
    ));
    
    toast({
      title: 'Status Updated',
      description: `Device status has been updated to "${status}"`,
    });
  };

  const toggleDeviceOnline = (deviceId: string, online: boolean) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, online } 
        : device
    ));
    
    toast({
      title: online ? 'Device Activated' : 'Device Deactivated',
      description: `The device has been ${online ? 'activated' : 'deactivated'} successfully`,
    });
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
                    <h1 className="text-2xl md:text-3xl font-bold">IoT Dashboard</h1>
                    <p className="text-gray-600 mt-1">Real-time monitoring of your farm sensors and systems.</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-lg p-2 flex items-center gap-2 border border-gray-200">
                      <span className="text-sm font-medium">Last update:</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Live</span>
                    </div>
                    <select 
                      className="p-2 bg-white border border-gray-200 rounded-lg text-sm"
                      onChange={(e) => {
                        // Filter devices based on selection
                        console.log("Selected filter:", e.target.value);
                      }}
                    >
                      <option value="all">All Devices</option>
                      <option value="active">Active Only</option>
                      <option value="critical">Critical Alerts</option>
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
                      <button 
                        className={`px-3 py-1.5 text-sm font-medium rounded-md hover:bg-earth-100 transition-colors ${
                          selectedTimeframe === '24h' ? 'bg-earth-50 text-earth-600' : 'bg-white text-gray-600'
                        }`}
                        onClick={() => setSelectedTimeframe('24h')}
                      >
                        24 Hours
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-sm font-medium rounded-md hover:bg-earth-100 transition-colors ${
                          selectedTimeframe === '7d' ? 'bg-earth-50 text-earth-600' : 'bg-white text-gray-600'
                        }`}
                        onClick={() => setSelectedTimeframe('7d')}
                      >
                        7 Days
                      </button>
                      <button 
                        className={`px-3 py-1.5 text-sm font-medium rounded-md hover:bg-earth-100 transition-colors ${
                          selectedTimeframe === '30d' ? 'bg-earth-50 text-earth-600' : 'bg-white text-gray-600'
                        }`}
                        onClick={() => setSelectedTimeframe('30d')}
                      >
                        30 Days
                      </button>
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-earth-200 border-t-earth-600 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="h-64 bg-white rounded-lg border border-gray-100 flex items-center justify-center">
                      <Activity className="w-16 h-16 text-gray-300" />
                      <span className="ml-2 text-gray-400">Chart visualization will appear here</span>
                    </div>
                  )}
                </GlassCard>
              </div>
              
              {/* Device Status */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Device Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {devices.map((device) => (
                    <GlassCard key={device.id} className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{device.name}</h3>
                          <p className="text-sm text-gray-500">Zone: {device.zone}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          device.status === 'Active' ? 'bg-green-100 text-green-600' : 
                          device.status === 'Low Battery' ? 'bg-amber-100 text-amber-600' : 
                          device.status === 'Offline' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {device.status}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={device.online}
                            onCheckedChange={(checked) => toggleDeviceOnline(device.id, checked)}
                          />
                          <span className="text-sm">{device.online ? 'Online' : 'Offline'}</span>
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
                        
                        <button 
                          className="p-1 rounded hover:bg-gray-100"
                          onClick={() => toggleDeviceExpansion(device.id)}
                        >
                          {expandedDevice === device.id ? (
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      
                      {expandedDevice === device.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="space-y-4">
                            {/* Device Details */}
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium mb-2">Device Details</h4>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-gray-500">Device ID:</span>
                                  <p className="font-medium">{device.id}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Type:</span>
                                  <p className="font-medium">IoT Sensor</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Last Calibrated:</span>
                                  <p className="font-medium">2 months ago</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Firmware:</span>
                                  <p className="font-medium">v2.4.1</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Update Status */}
                            <div>
                              <Label htmlFor={`status-${device.id}`} className="text-sm font-medium mb-2 block">
                                Update Device Status
                              </Label>
                              <div className="flex gap-2">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                      <span>{device.status}</span>
                                      <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0" align="start">
                                    <div className="flex flex-col">
                                      <button 
                                        className="px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors"
                                        onClick={() => updateDeviceStatus(device.id, 'Active')}
                                      >
                                        Active
                                      </button>
                                      <button 
                                        className="px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors"
                                        onClick={() => updateDeviceStatus(device.id, 'Maintenance')}
                                      >
                                        Maintenance
                                      </button>
                                      <button 
                                        className="px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors"
                                        onClick={() => updateDeviceStatus(device.id, 'Low Battery')}
                                      >
                                        Low Battery
                                      </button>
                                      <button 
                                        className="px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors"
                                        onClick={() => updateDeviceStatus(device.id, 'Offline')}
                                      >
                                        Offline
                                      </button>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Settings className="w-4 h-4 mr-2" />
                                <span>Configure</span>
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                <span>Test Alerts</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
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
