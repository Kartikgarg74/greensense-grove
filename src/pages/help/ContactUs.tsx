
import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! We'll get back to you shortly.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

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
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Have questions or feedback? We'd love to hear from you. Get in touch with our team.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form Section */}
            <div className="py-12 px-6 md:px-10">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  {/* Contact Form */}
                  <div className="lg:col-span-3">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              Your Name
                            </label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Enter your name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email Address
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">
                              Subject
                            </label>
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="What is this regarding?"
                              value={formData.subject}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium">
                              Category
                            </label>
                            <Select value={formData.category} onValueChange={handleSelectChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="technical">Technical Support</SelectItem>
                                <SelectItem value="billing">Billing & Payments</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Your Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Please describe your question or issue in detail..."
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-greensense-600 hover:bg-greensense-700 text-white py-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              Send Message
                            </span>
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
                      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                      
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-greensense-50 p-3 rounded-full">
                            <Mail className="w-5 h-5 text-greensense-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-gray-600 mt-1">support@greensense.ai</p>
                            <p className="text-gray-600">info@greensense.ai</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-greensense-50 p-3 rounded-full">
                            <Phone className="w-5 h-5 text-greensense-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Phone</h3>
                            <p className="text-gray-600 mt-1">+91 (800) 123-4567</p>
                            <p className="text-gray-600">Mon-Fri, 9:00 AM - 6:00 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-greensense-50 p-3 rounded-full">
                            <MapPin className="w-5 h-5 text-greensense-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Office</h3>
                            <p className="text-gray-600 mt-1">
                              123 Green Street, Agritech City,<br />
                              Delhi, 110001, India
                            </p>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-6 mt-8">
                          <h3 className="font-medium mb-3">Follow Us</h3>
                          <div className="flex gap-3">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                              <a 
                                key={social}
                                href={`https://${social}.com`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-greensense-50 transition-colors"
                              >
                                <span className="sr-only">{social}</span>
                                <div className="w-5 h-5 text-gray-600" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* FAQ Link */}
                <div className="mt-12 bg-greensense-50 rounded-xl p-6 text-center">
                  <h2 className="text-xl font-bold mb-2">Looking for answers?</h2>
                  <p className="text-gray-700 mb-4">
                    Check our frequently asked questions section for quick answers to common questions.
                  </p>
                  <Button variant="outline" className="gap-2" asChild>
                    <a href="/help/faq">
                      <MessageSquare className="w-4 h-4" />
                      <span>View FAQs</span>
                    </a>
                  </Button>
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

export default ContactUs;
