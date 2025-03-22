
import React from 'react';
import { BookOpen, MessageSquare, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is GreenSense AI?",
          answer: "GreenSense AI is an integrated agricultural platform that combines traditional farming wisdom with modern technology. It offers plant identification, disease detection, fertilizer analysis, crop recommendations, and IoT monitoring capabilities to help farmers optimize their practices and improve yields."
        },
        {
          question: "Do I need to create an account to use GreenSense AI?",
          answer: "Yes, most features require a free account to track your data and provide personalized recommendations. You can create an account by clicking the 'Register' button in the top right corner of the homepage."
        },
        {
          question: "Is GreenSense AI available on mobile devices?",
          answer: "Yes, GreenSense AI is fully responsive and works on smartphones and tablets. For the best experience, we recommend using our platform on devices with cameras for plant identification and disease detection features."
        }
      ]
    },
    {
      category: "Plant Identification",
      questions: [
        {
          question: "How accurate is the plant identification feature?",
          answer: "Our plant identification system powered by Google ML Kit has an accuracy rate of over 90% for common plant species. Factors like image quality, lighting conditions, and the distinctiveness of the plant features can affect identification accuracy."
        },
        {
          question: "What information is provided after a plant is identified?",
          answer: "After successful identification, you'll receive detailed information about the plant including its scientific name, common names, growth requirements, cultivation tips, potential uses, and any relevant Ayurvedic properties."
        },
        {
          question: "Can I identify plants at any growth stage?",
          answer: "For best results, we recommend taking photos of mature plants with visible distinctive features like flowers, fruits, or full leaf patterns. Young seedlings or plants without distinctive features may be more challenging to identify accurately."
        }
      ]
    },
    {
      category: "Disease Detection",
      questions: [
        {
          question: "How does the disease detection feature work?",
          answer: "Our disease detection system analyzes images of affected plant parts using advanced computer vision algorithms from Google ML Kit. It identifies visual patterns associated with common plant diseases and provides a diagnosis along with treatment recommendations."
        },
        {
          question: "What types of plant diseases can be detected?",
          answer: "The system can detect a wide range of common crop diseases including fungal infections (powdery mildew, rust), bacterial diseases (bacterial spot, bacterial blight), viral infections, and nutrient deficiencies. We continuously update our disease recognition models."
        },
        {
          question: "How should I photograph plants for disease detection?",
          answer: "For best results, take clear, well-lit photos focusing on the affected parts of the plant. Include both healthy and diseased portions for comparison, and capture multiple angles if possible. Avoid shadows and ensure the affected area is clearly visible."
        }
      ]
    },
    {
      category: "IoT Monitoring",
      questions: [
        {
          question: "What types of sensors are supported?",
          answer: "GreenSense AI supports a wide range of agricultural IoT sensors including soil moisture sensors, temperature sensors, humidity sensors, light intensity sensors, pH sensors, and automated irrigation controllers."
        },
        {
          question: "How do I connect my IoT devices to the platform?",
          answer: "After purchasing compatible IoT devices, you can connect them by navigating to the Farm Control section, selecting 'Add New Device,' and following the guided setup process. Most devices connect via WiFi or Bluetooth."
        },
        {
          question: "Do I need technical knowledge to set up the IoT system?",
          answer: "No, our system is designed for easy setup. Most compatible devices use simple plug-and-play configuration. For more complex setups, we provide step-by-step guides and our customer support team is available to assist."
        }
      ]
    },
    {
      category: "Fertilizer Analysis",
      questions: [
        {
          question: "How does fertilizer analysis work?",
          answer: "Our fertilizer analysis tool uses Google ML Kit's text recognition to extract information from fertilizer packaging labels. It identifies NPK ratios, micronutrients, application rates, and provides recommendations based on your specific crops and soil conditions."
        },
        {
          question: "Can I compare different fertilizer products?",
          answer: "Yes, our comparison feature allows you to analyze multiple fertilizer products side by side. You can compare nutrient content, cost-effectiveness, suitability for your crops, and environmental impact to make informed decisions."
        },
        {
          question: "Does the system recommend organic alternatives?",
          answer: "Yes, based on your preferences, our system can suggest organic or biological alternatives to conventional fertilizers. It provides information on compost, manure, green manures, and other sustainable soil amendments appropriate for your crops."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16"> {/* Offset for fixed navbar */}
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 transition-all duration-300 pl-[70px] md:pl-[260px]">
            {/* Hero Section */}
            <div className="bg-greensense-50 py-10">
              <div className="container-standard">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Find answers to common questions about GreenSense AI and how to use our platform effectively.
                  </p>
                  
                  <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for answers..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-greensense-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Content */}
            <div className="py-12 px-6 md:px-10">
              <div className="max-w-4xl mx-auto">
                {faqs.map((category, index) => (
                  <div key={index} className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">{category.category} Questions</h2>
                    
                    <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${category.category}-${faqIndex}`}>
                          <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                            <span className="text-left font-medium">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 pt-1">
                            <p className="text-gray-700">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
                
                {/* More Help Options */}
                <div className="mt-12 bg-greensense-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">Still have questions?</h2>
                  <p className="text-gray-700 mb-6">
                    If you couldn't find the answer you were looking for, please check our documentation or reach out to our support team.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/documentation">
                      <Button variant="outline" className="w-full gap-2 h-auto py-3">
                        <BookOpen className="w-4 h-4" />
                        <span>View Documentation</span>
                      </Button>
                    </Link>
                    
                    <Link to="/help/contact">
                      <Button className="w-full gap-2 h-auto py-3 bg-greensense-600 hover:bg-greensense-700">
                        <MessageSquare className="w-4 h-4" />
                        <span>Contact Support</span>
                      </Button>
                    </Link>
                  </div>
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

export default FAQPage;
