
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container-standard">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <div className="prose prose-green max-w-none">
              <p>
                At GreenSense AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We collect information about you in various ways when you use our platform. This information may include:
              </p>
              <ul>
                <li>
                  <strong>Personal Data:</strong> Your name, email address, phone number, and other contact information when you create an account, contact us, or use certain features.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use the platform, including browsing patterns, features used, and interaction with content.
                </li>
                <li>
                  <strong>Device Data:</strong> Information about your device, including IP address, browser type, operating system, and device identifiers.
                </li>
                <li>
                  <strong>Agricultural Data:</strong> Information about your plants, crops, farm conditions, and agricultural practices that you input or that our platform generates through analysis.
                </li>
                <li>
                  <strong>Image Data:</strong> Photos or images you upload for plant identification, disease detection, or other analysis purposes.
                </li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul>
                <li>Providing, maintaining, and improving our platform and services</li>
                <li>Processing and completing transactions</li>
                <li>Sending administrative information, such as updates, security alerts, and support messages</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>Personalizing your experience and delivering content relevant to your interests</li>
                <li>Developing new products, services, features, and functionality</li>
                <li>Generating insights and analytics about agriculture and plant health</li>
                <li>Monitoring and analyzing trends, usage, and activities in connection with our platform</li>
                <li>Detecting, investigating, and preventing fraudulent transactions and other illegal activities</li>
                <li>Complying with legal obligations</li>
              </ul>
              
              <h2>Data Storage and Security</h2>
              <p>
                We use MongoDB for data storage, with appropriate security measures in place to protect your information. Your data is stored in our database using the following connection:
              </p>
              <pre className="bg-gray-100 p-4 rounded">mongodb+srv://deepanshusnpt:122ZUNw9w6PNKUpt@farmer.lxen6.mongodb.net/</pre>
              <p>
                We implement appropriate technical and organizational security measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
              
              <h2>Third-Party Services</h2>
              <p>
                We may use third-party services to help us operate our platform, including:
              </p>
              <ul>
                <li>Google ML Kit for image analysis and plant identification</li>
                <li>Mapping APIs for geospatial data processing</li>
                <li>Analytics tools to understand platform usage</li>
              </ul>
              <p>
                These third parties may have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use your information for any other purpose.
              </p>
              
              <h2>Your Rights</h2>
              <p>
                You have several rights regarding your personal information:
              </p>
              <ul>
                <li>
                  <strong>Access:</strong> You can request a copy of the personal information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> You can request that we correct any inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Deletion:</strong> You can request that we delete your personal information.
                </li>
                <li>
                  <strong>Restriction:</strong> You can request that we restrict the processing of your information.
                </li>
                <li>
                  <strong>Data Portability:</strong> You can request a copy of your information in a structured, commonly used, and machine-readable format.
                </li>
                <li>
                  <strong>Objection:</strong> You can object to our processing of your information.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at privacy@greensense.ai.
              </p>
              
              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              
              <h2>Children's Privacy</h2>
              <p>
                Our platform is not intended for individuals under the age of 16. We do not knowingly collect personally identifiable information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
              </p>
              
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@greensense.ai<br />
                Address: 123 Green Street, Agritech City, 12345
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
