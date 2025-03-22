
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-greensense-50 border-t border-greensense-100">
      <div className="container-standard py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-greensense-500 to-greensense-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Green<span className="text-greensense-600">Sense</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Empowering sustainable agriculture through AI, IoT, and traditional wisdom for a greener future.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-greensense-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-greensense-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-greensense-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-greensense-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-medium text-base mb-5">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/plant-wisdom" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  PlantWisdom Hub
                </Link>
              </li>
              <li>
                <Link to="/crop-insight" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  CropInsight Center
                </Link>
              </li>
              <li>
                <Link to="/farm-control" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  FarmControl System
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-base mb-5">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/documentation" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/documentation/api" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-base mb-5">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy-policy" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/terms-of-service" className="text-sm text-gray-600 hover:text-greensense-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-greensense-100 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GreenSense AI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-5">
            <Link to="/legal/privacy-policy" className="text-sm text-gray-500 hover:text-greensense-600 transition-colors">
              Privacy
            </Link>
            <Link to="/legal/terms-of-service" className="text-sm text-gray-500 hover:text-greensense-600 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
