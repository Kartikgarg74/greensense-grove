
import React from 'react';
import { Leaf, Sprout, CloudSun } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container-standard">
          {/* Hero Section */}
          <div className="mb-10 py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About GreenSense AI</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transforming agriculture through innovative technology and traditional wisdom.
            </p>
          </div>
          
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-greensense-700">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                GreenSense AI is dedicated to transforming agriculture by combining traditional farming wisdom with 
                modern technology. Our mission is to develop sustainable, efficient, and accessible solutions that 
                empower farmers, researchers, and enthusiasts to make data-driven decisions that increase yield, 
                preserve resources, and protect our environment.
              </p>
              <p className="text-gray-600">
                We aim to bridge the knowledge gap between traditional practices and technological advancements, 
                making cutting-edge tools available to all stakeholders in the agricultural ecosystem.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-greensense-700">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                We envision a world where sustainable farming practices are enhanced by accessible technology, 
                empowering communities to produce food efficiently while preserving the environment. We see a future 
                where traditional agricultural wisdom is preserved, digitized, and shared, creating a global knowledge 
                base that benefits all.
              </p>
              <p className="text-gray-600">
                By 2030, we aim to help reduce agricultural water consumption by 20%, increase average crop yields 
                by 15%, and significantly reduce the use of harmful chemicals through precision farming and better 
                resource management.
              </p>
            </div>
          </div>
          
          {/* Our Approach */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Leaf className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Traditional Wisdom</h3>
                <p className="text-gray-600">
                  We preserve and digitize centuries of agricultural knowledge from Ayurvedic and traditional 
                  farming practices, making it accessible to modern farmers through our PlantWisdom Hub.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Sprout className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Modern Technology</h3>
                <p className="text-gray-600">
                  We leverage cutting-edge AI, machine learning, and Google ML Kit to analyze plants, diseases, 
                  and fertilizers, providing farmers with actionable insights through our CropInsight Center.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <CloudSun className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainable Practices</h3>
                <p className="text-gray-600">
                  We promote resource efficiency through IoT monitoring, automation, and precision agriculture, 
                  helping farmers reduce waste and environmental impact with our FarmControl System.
                </p>
              </div>
            </div>
          </div>
          
          {/* Our Projects */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Integrated Solutions</h2>
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-green-700">FlorAyush</h3>
                <p className="text-gray-600 mb-4">
                  FlorAyush transforms herbal wisdom into digital reality, addressing the limited access to knowledge 
                  about medicinal plants and herbs essential to traditional healing practices. Through interactive 
                  plant identification and a comprehensive Ayurvedic knowledge base, we're bridging traditional 
                  healing practices with modern technology.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                    <li>Plant identification using Google ML Kit image recognition</li>
                    <li>Comprehensive database of Ayurvedic plants and their properties</li>
                    <li>Traditional uses and modern applications of medicinal plants</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">FarmaLens</h3>
                <p className="text-gray-600 mb-4">
                  FarmaLens is your AI-powered farming assistant for smarter crop management, disease detection, and 
                  fertilizer analysis. It leverages Google ML Kit's image recognition and text extraction capabilities 
                  to provide farmers with accurate, timely information for making informed agricultural decisions.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                    <li>Fertilizer analysis through packaging text extraction</li>
                    <li>Plant disease detection with treatment recommendations</li>
                    <li>AI-powered insights based on detected text and images</li>
                    <li>Time-saving and efficient real-time analysis</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-amber-700">FIELD INDIA</h3>
                <p className="text-gray-600 mb-4">
                  FIELD INDIA promotes smart farming and a sustainable future by automating agriculture with IoT 
                  technology. It addresses key agricultural challenges through automated irrigation, soil health 
                  monitoring, and real-time environmental data collection, helping farmers make data-driven decisions.
                </p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                    <li>IoT sensors for soil moisture, temperature, and humidity monitoring</li>
                    <li>Automated irrigation control to optimize water usage</li>
                    <li>Real-time environmental data collection and analysis</li>
                    <li>Mobile and web-based dashboards for remote monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((member) => (
                <div key={member} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                    <img 
                      src={`https://placehold.co/200x200/e9f7ef/1a5d1a?text=Team+${member}`}
                      alt={`Team Member ${member}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">Team Member {member}</h3>
                  <p className="text-sm text-gray-500 mb-3">Co-Founder & Role</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Short bio about the team member and their expertise in agriculture, technology, or other relevant fields.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
