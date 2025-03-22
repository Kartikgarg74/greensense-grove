
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Code, 
  Server, 
  Users, 
  Database, 
  ArrowRight 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui-elements/GlassCard';

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container-standard">
          {/* Hero Section */}
          <div className="mb-10 py-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">GreenSense AI Documentation</h1>
              <p className="text-lg text-gray-600">
                Comprehensive guides and resources to help you get the most out of GreenSense AI platform.
              </p>
            </div>
          </div>
          
          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">User Guides</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Step-by-step guides to help you navigate and use all features of the GreenSense AI platform.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Getting Started Guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Plant Identification Guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Disease Detection Manual</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">IoT Dashboard Walkthrough</span>
                </li>
              </ul>
              <Link to="/documentation/user-guides" className="text-green-600 font-medium flex items-center gap-1 hover:underline">
                <span>View all guides</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">API References</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Technical documentation on the APIs used in GreenSense AI, including Google ML Kit integration.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="text-gray-700">Google ML Kit Image Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="text-gray-700">Plant Disease Recognition API</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="text-gray-700">MongoDB Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="text-gray-700">Geospatial Mapping APIs</span>
                </li>
              </ul>
              <Link to="/documentation/api-reference" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                <span>View API docs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Server className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-semibold">System Architecture</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Detailed information about the GreenSense AI system architecture and technologies.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span className="text-gray-700">Frontend Technologies</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span className="text-gray-700">Backend Services</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span className="text-gray-700">Database Structure</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span className="text-gray-700">IoT Integration</span>
                </li>
              </ul>
              <Link to="/documentation/architecture" className="text-amber-600 font-medium flex items-center gap-1 hover:underline">
                <span>View architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </div>
          
          {/* Google ML Kit Section */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center">
                <img src="https://placehold.co/64x64/eef7ff/4285f4?text=ML" alt="Google ML Kit" className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Google ML Kit Integration</h2>
                <p className="text-gray-600 mb-4">
                  GreenSense AI leverages Google's ML Kit for powerful on-device machine learning capabilities. 
                  Our integration includes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Image Labeling</h3>
                    <p className="text-sm text-gray-600">
                      Used for identifying plants and their parts with high accuracy. The ML Kit Image Labeling API
                      recognizes thousands of objects, places, and actions.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Object Detection & Tracking</h3>
                    <p className="text-sm text-gray-600">
                      Detects and tracks multiple objects in the image frame, which helps in identifying specific 
                      plant diseases and deficiencies.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Text Recognition</h3>
                    <p className="text-sm text-gray-600">
                      Extracts text from fertilizer packaging and other agricultural products to provide 
                      detailed analysis and recommendations.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Custom Models</h3>
                    <p className="text-sm text-gray-600">
                      We've trained custom TensorFlow Lite models for specific agricultural use cases, 
                      deployed through ML Kit's model interpreter.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://developers.google.com/ml-kit" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    ML Kit Documentation
                  </a>
                  <Link
                    to="/documentation/ml-kit-examples"
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    View Examples
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* MongoDB Integration Section */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-green-50 flex items-center justify-center">
                <Database className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">MongoDB Integration</h2>
                <p className="text-gray-600 mb-4">
                  GreenSense AI uses MongoDB for reliable, scalable, and flexible data storage. Our connection string:
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
                  mongodb+srv://deepanshusnpt:122ZUNw9w6PNKUpt@farmer.lxen6.mongodb.net/
                </div>
                <p className="text-gray-600 mb-4">
                  Our MongoDB integration includes:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                    <span className="text-gray-700">User authentication and profile management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                    <span className="text-gray-700">Storage of plant identification and disease detection results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                    <span className="text-gray-700">IoT sensor data collection and analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
                    <span className="text-gray-700">Crop recommendation history and analytics</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/documentation/mongodb-schema"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Database Schema
                  </Link>
                  <Link
                    to="/documentation/data-visualization"
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Data Visualization
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documentation;
