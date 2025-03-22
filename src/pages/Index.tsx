
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Leaf, 
  Microscope, 
  LineChart, 
  Sprout, 
  BarChart, 
  CloudSun, 
  User,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui-elements/GlassCard';
import FeatureCard from '@/components/dashboard/FeatureCard';

const Index = () => {
  // Add scroll animations
  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    fadeInElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-greensense-50/80 to-white pointer-events-none" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-greensense-200/30 blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-sky-200/30 blur-[120px] -z-10" />
          
          <div className="container-standard">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-greensense-50 border border-greensense-100 text-greensense-600 text-sm font-medium mb-8 animate-fade-in">
                <Leaf className="w-4 h-4" />
                <span>Introducing GreenSense AI Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                Sustainable Farming <br className="hidden sm:block" />
                <span className="text-gradient">Powered by AI</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
                Integrating traditional wisdom with cutting-edge technology to revolutionize agriculture for a greener future.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
                <Link 
                  to="/dashboard"
                  className="px-6 py-3 bg-greensense-600 hover:bg-greensense-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link 
                  to="/about"
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="mt-16 max-w-5xl mx-auto">
              <GlassCard className="p-4 md:p-6 animate-fade-in-up">
                <img 
                  src="https://placehold.co/1200x600/e9f7ef/1a5d1a?text=GreenSense+AI+Dashboard" 
                  alt="GreenSense AI Dashboard Preview"
                  className="w-full h-auto rounded-lg shadow-sm transition-all hover:shadow-md"
                />
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container-standard">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Integrated Solutions</h2>
              <p className="text-lg text-gray-600">
                Three powerful platforms working together to transform agriculture through technology and tradition.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-on-scroll">
                <FeatureCard
                  title="PlantWisdom Hub"
                  description="Identify plant species and access traditional Ayurvedic knowledge."
                  icon={<Leaf />}
                  linkTo="/plant-wisdom"
                  colorScheme="green"
                />
              </div>
              
              <div className="animate-on-scroll" style={{ animationDelay: '100ms' }}>
                <FeatureCard
                  title="CropInsight Center"
                  description="AI-powered analysis tools for fertilizers and plant disease detection."
                  icon={<Microscope />}
                  linkTo="/crop-insight"
                  colorScheme="blue"
                />
              </div>
              
              <div className="animate-on-scroll" style={{ animationDelay: '200ms' }}>
                <FeatureCard
                  title="FarmControl System"
                  description="IoT monitoring and automation dashboard for sustainable farming."
                  icon={<LineChart />}
                  linkTo="/farm-control"
                  colorScheme="amber"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Learn More Section */}
        <section className="py-20 bg-greensense-50" id="learn-more">
          <div className="container-standard">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn More About Our Services</h2>
              <p className="text-lg text-gray-600">
                Discover how our integrated platforms can transform your agricultural practices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-sm animate-on-scroll">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Plant Disease Detection</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our advanced AI algorithms can identify plant diseases from images with high accuracy. 
                  Simply upload a photo of your affected plant, and receive instant diagnosis along with 
                  recommended treatments.
                </p>
                <Link to="/crop-insight/disease" className="text-green-600 font-medium flex items-center gap-1 hover:underline">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm animate-on-scroll" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Plant Identification</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Identify any plant species with our visual recognition system powered by Google ML Kit. 
                  Gain detailed information about its characteristics, growth conditions, 
                  and traditional uses in Ayurvedic medicine.
                </p>
                <Link to="/plant-wisdom/identification" className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm animate-on-scroll" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Crop Recommendations</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Receive personalized crop recommendations based on soil analysis, local climate data, 
                  and geospatial information. Our system leverages mapping APIs and AI to suggest the most 
                  suitable crops for your specific location and conditions.
                </p>
                <Link to="/crop-insight/recommendations" className="text-amber-600 font-medium flex items-center gap-1 hover:underline">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm animate-on-scroll" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <CloudSun className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold">IoT-Based Plant Monitoring</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Monitor your farm's vital parameters in real-time with our IoT integration. Track soil moisture, 
                  temperature, humidity, and more through connected devices. Receive alerts and recommendations 
                  based on environmental conditions.
                </p>
                <Link to="/farm-control/dashboard" className="text-purple-600 font-medium flex items-center gap-1 hover:underline">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll" style={{ animationDelay: '400ms' }}>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Documentation & Resources</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Access comprehensive documentation including system architecture, user guides, and API references. 
                  Learn about the Google ML Kit APIs we use for image processing and how our platform integrates 
                  with MongoDB for data storage and analysis.
                </p>
                <Link to="/documentation" className="text-sky-600 font-medium flex items-center gap-1 hover:underline">
                  <span>View documentation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Help & FAQs</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Find answers to frequently asked questions, learn how to use each feature, and get in touch with 
                  our support team. We're here to help you get the most out of our platform and improve your 
                  agricultural practices.
                </p>
                <Link to="/help" className="text-teal-600 font-medium flex items-center gap-1 hover:underline">
                  <span>Get help</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container-standard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Transforming Agriculture with Technology
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  GreenSense AI combines traditional farming wisdom with modern technology to create sustainable, efficient, and profitable agricultural practices.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-greensense-100 flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-greensense-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Preserve Traditional Knowledge</h3>
                      <p className="text-gray-600">Digitizing and making accessible centuries of herbal and agricultural wisdom.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <BarChart className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Data-Driven Decisions</h3>
                      <p className="text-gray-600">Leverage AI and analytics to optimize crop yield and resource utilization.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-earth-100 flex items-center justify-center">
                      <CloudSun className="w-5 h-5 text-earth-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Environmental Sustainability</h3>
                      <p className="text-gray-600">Reduce environmental impact through precision farming and resource management.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-on-scroll">
                <div className="absolute inset-0 bg-gradient-to-r from-greensense-200/30 to-sky-200/30 rounded-2xl transform rotate-3 blur-xl -z-10"></div>
                <GlassCard className="overflow-hidden rounded-2xl">
                  <img 
                    src="https://placehold.co/800x600/e9f7ef/1a5d1a?text=GreenSense+Benefits" 
                    alt="GreenSense Benefits"
                    className="w-full h-auto"
                  />
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-standard">
            <div className="max-w-4xl mx-auto text-center animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Farming Practices?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of farmers, researchers, and enthusiasts who are already using GreenSense AI to revolutionize their approach to agriculture.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/auth/register"
                  className="px-6 py-3 bg-greensense-600 hover:bg-greensense-700 text-white font-medium rounded-lg flex items-center gap-2 min-w-[180px] justify-center transition-colors"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
