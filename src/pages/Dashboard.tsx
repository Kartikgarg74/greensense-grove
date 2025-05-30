
import React, { useState } from 'react';
import { 
  Leaf, 
  Sprout, 
  BarChart, 
  CloudSun, 
  DropletIcon, 
  Thermometer, 
  Users, 
  LayoutDashboard,
  ScanLine,
  LineChart,
  Wrench,
  Bell,
  ArrowRight,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui-elements/GlassCard';
import StatCard from '@/components/dashboard/StatCard';
import FeatureCard from '@/components/dashboard/FeatureCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  
  const notifications = [
    {
      id: 1,
      title: "Low Soil Moisture Detected",
      message: "Field 3 moisture levels have dropped below 40%. Consider irrigation.",
      time: "10 minutes ago",
      type: "warning"
    },
    {
      id: 2,
      title: "Temperature Alert",
      message: "Greenhouse temperature has exceeded optimal range (28°C).",
      time: "1 hour ago",
      type: "alert"
    },
    {
      id: 3,
      title: "System Update",
      message: "New disease detection models have been added to the system.",
      time: "2 hours ago",
      type: "info"
    }
  ];

  const handleScanPlant = () => {
    setScanDialogOpen(true);
  };

  const navigateToFeature = (path: string) => {
    setScanDialogOpen(false);
    navigate(path);
  };

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
    
    // If opening notifications, mark them as read
    if (!notificationsVisible) {
      // In a real app, you would call an API to mark notifications as read
      console.log('Marking notifications as read');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            <div className="p-6 md:p-10">
              {/* Welcome header */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Welcome back, User</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening with your farm today.</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <button 
                        className="p-2 rounded-full bg-greensense-50 hover:bg-greensense-100 transition-colors relative"
                        onClick={toggleNotifications}
                      >
                        <Bell className="w-5 h-5 text-greensense-600" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                          {notifications.length}
                        </span>
                      </button>
                      
                      {notificationsVisible && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                          <div className="p-3 border-b border-gray-100">
                            <h3 className="font-medium">Notifications</h3>
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                            {notifications.map(notification => (
                              <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                                <div className="flex items-start gap-3">
                                  <div className={`w-2 h-2 rounded-full mt-2 ${
                                    notification.type === 'warning' ? 'bg-amber-500' : 
                                    notification.type === 'alert' ? 'bg-red-500' : 
                                    'bg-blue-500'
                                  }`}></div>
                                  <div>
                                    <h4 className="font-medium text-sm">{notification.title}</h4>
                                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-3 border-t border-gray-100 text-center">
                            <button className="text-xs text-greensense-600 font-medium hover:underline">
                              View All Notifications
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <button 
                      className="flex items-center gap-2 px-4 py-2 bg-greensense-600 hover:bg-greensense-700 text-white rounded-lg transition-colors"
                      onClick={handleScanPlant}
                    >
                      <ScanLine className="w-4 h-4" />
                      <span>Scan Plants</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Soil Moisture"
                  value="68%"
                  icon={<DropletIcon />}
                  change={{ value: 12, type: 'increase' }}
                  colorScheme="blue"
                />
                
                <StatCard
                  title="Temperature"
                  value="24°C"
                  icon={<Thermometer />}
                  change={{ value: 3, type: 'decrease' }}
                  colorScheme="amber"
                />
                
                <StatCard
                  title="Plants Analyzed"
                  value="32"
                  icon={<Leaf />}
                  change={{ value: 8, type: 'increase' }}
                  colorScheme="green"
                />
                
                <StatCard
                  title="Active Sensors"
                  value="18"
                  icon={<BarChart />}
                  change={{ value: 2, type: 'increase' }}
                  colorScheme="default"
                />
              </div>
              
              {/* Main content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Left column - Chart */}
                <div className="lg:col-span-2">
                  <GlassCard className="overflow-hidden h-full">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Farm Performance</h3>
                        <div className="flex items-center gap-3">
                          <button className="px-2.5 py-1.5 text-xs font-medium bg-greensense-50 text-greensense-600 rounded-md hover:bg-greensense-100 transition-colors">
                            Daily
                          </button>
                          <button className="px-2.5 py-1.5 text-xs font-medium bg-white text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                            Weekly
                          </button>
                          <button className="px-2.5 py-1.5 text-xs font-medium bg-white text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                            Monthly
                          </button>
                        </div>
                      </div>
                      
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <LineChart className="w-16 h-16 text-gray-300" />
                        <span className="ml-2 text-gray-400">Chart Visualization</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
                
                {/* Right column - Activity */}
                <div>
                  <GlassCard className="overflow-hidden h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-greensense-100 flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-greensense-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Plant Identified: Basil</p>
                            <p className="text-xs text-gray-500">Today, 9:45 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                            <DropletIcon className="w-4 h-4 text-sky-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Irrigation System Activated</p>
                            <p className="text-xs text-gray-500">Today, 8:30 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Alert: Low Soil Moisture</p>
                            <p className="text-xs text-gray-500">Yesterday, 5:15 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-earth-100 flex items-center justify-center">
                            <Users className="w-4 h-4 text-earth-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Shared Analysis with Team</p>
                            <p className="text-xs text-gray-500">Yesterday, 2:30 PM</p>
                          </div>
                        </div>
                      </div>
                      
                      <button className="mt-6 w-full py-2 text-sm text-center text-greensense-600 hover:text-greensense-700 flex items-center justify-center gap-1">
                        <span>View All Activity</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </GlassCard>
                </div>
              </div>
              
              {/* Quick Actions */}
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                <FeatureCard
                  title="Plant Identification"
                  description="Identify plants and access information quickly."
                  icon={<Leaf />}
                  linkTo="/plant-wisdom/identification"
                  colorScheme="green"
                />
                
                <FeatureCard
                  title="Disease Detection"
                  description="Detect and diagnose plant diseases."
                  icon={<ScanLine />}
                  linkTo="/crop-insight/disease"
                  colorScheme="blue"
                />
                
                <FeatureCard
                  title="IoT Dashboard"
                  description="Monitor all your farm sensors in real-time."
                  icon={<LayoutDashboard />}
                  linkTo="/farm-control/dashboard"
                  colorScheme="amber"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Plant</DialogTitle>
            <DialogDescription>
              What would you like to do with your plant scan?
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div 
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
              onClick={() => navigateToFeature('/crop-insight/disease')}
            >
              <div className="mb-3 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Detect Disease</h3>
              <p className="text-sm text-gray-500">
                Identify diseases affecting your plant and get treatment recommendations.
              </p>
            </div>
            
            <div 
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
              onClick={() => navigateToFeature('/plant-wisdom/identification')}
            >
              <div className="mb-3 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Identify Plant</h3>
              <p className="text-sm text-gray-500">
                Identify the plant species and learn about its characteristics and uses.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setScanDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
