
import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Plus, 
  Minus, 
  Send,
  Check
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const faqs = [
  {
    question: "How do I identify a plant using the platform?",
    answer: "To identify a plant, navigate to the PlantWisdom Hub and select the Plant Identification feature. Upload a clear image of the plant you want to identify. The system will use Google ML Kit's image recognition to analyze the photo and provide you with the most likely plant species along with detailed information."
  },
  {
    question: "How accurate is the plant disease detection feature?",
    answer: "Our plant disease detection system has an accuracy rate of approximately 85-90%, depending on the quality of the image provided and the visibility of the symptoms. For best results, take clear, well-lit photos of the affected plant parts, showing the symptoms distinctly. The system is continuously learning and improving through machine learning."
  },
  {
    question: "Can I use the platform without IoT devices?",
    answer: "Yes, absolutely! While IoT integration enhances the experience by providing real-time data, all our other features like plant identification, disease detection, fertilizer analysis, and crop recommendations are fully functional without any IoT devices. You can start using these features immediately after creating an account."
  },
  {
    question: "How do I set up IoT devices with the platform?",
    answer: "To set up IoT devices, go to the FarmControl System section and select 'Add New Device'. Follow the step-by-step instructions to connect your compatible sensors. We support most standard agricultural IoT sensors that use MQTT protocol. If you need specific device recommendations, please contact our support team."
  },
  {
    question: "What types of fertilizers can be analyzed by the system?",
    answer: "Our fertilizer analysis tool can process most commercial fertilizers with standard NPK (Nitrogen, Phosphorus, Potassium) ratios and other common nutrients. Simply upload a clear image of the fertilizer packaging or manually input the information. The system will analyze the composition and provide recommendations based on your specific crops and soil conditions."
  },
  {
    question: "How are crop recommendations generated?",
    answer: "Crop recommendations are generated based on multiple factors, including soil type, climate data, geographical location, seasonal information, and historical crop performance in similar conditions. Our AI algorithm combines this data with traditional farming knowledge to suggest the most suitable crops for your specific conditions."
  },
  {
    question: "Is my data secure on the platform?",
    answer: "Yes, we take data security very seriously. All user data is stored securely in our MongoDB database with proper encryption. We never share your personal information with third parties without your explicit consent. For more details, please refer to our Privacy Policy."
  },
  {
    question: "Can I export my farm data for use in other systems?",
    answer: "Yes, we support data export in several formats, including CSV, JSON, and PDF. To export your data, go to your Dashboard, select the data you wish to export, click on the Export button, and choose your preferred format. This feature allows you to integrate your GreenSense AI data with other farm management systems if needed."
  }
];

const Help = () => {
  const { toast } = useToast();
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleFAQ = (index: number) => {
    if (expandedFAQs.includes(index)) {
      setExpandedFAQs(expandedFAQs.filter(i => i !== index));
    } else {
      setExpandedFAQs([...expandedFAQs, index]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
        duration: 5000,
      });
      // Reset form after showing success
      setTimeout(() => {
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container-standard">
          {/* Hero Section */}
          <div className="mb-10 py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help & Support</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions or contact our support team for assistance.
            </p>
          </div>
          
          {/* FAQs Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-greensense-600" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="overflow-hidden">
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-left font-medium text-lg">{faq.question}</h3>
                    {expandedFAQs.includes(index) ? (
                      <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  <div className={`px-6 overflow-hidden transition-all duration-300 ${
                    expandedFAQs.includes(index) ? 'max-h-96 py-4' : 'max-h-0 py-0'
                  }`}>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Form Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-greensense-600" />
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-6">
                  Have questions or need assistance with GreenSense AI? Fill out the form and our team will get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-greensense-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Email Us</h4>
                      <p className="text-gray-600">support@greensense.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-greensense-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Live Chat</h4>
                      <p className="text-gray-600">Available weekdays 9AM-5PM IST</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-gray-200">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-gray-600 text-center">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your query or issue..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
