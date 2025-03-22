
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container-standard">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <div className="prose prose-green max-w-none">
              <p>
                Welcome to GreenSense AI. Please read these Terms of Service ("Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using the GreenSense AI platform, you agree to comply with and be bound by these Terms.
              </p>
              
              <h2>Use of the Platform</h2>
              <p>
                The GreenSense AI platform provides tools and services for agricultural analysis, plant identification, disease detection, and farm management. You may use the platform only for lawful purposes and in accordance with these Terms.
              </p>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Use the platform in any way that violates applicable laws or regulations.</li>
                <li>Use the platform to transmit harmful code, including viruses, malware, or other malicious software.</li>
                <li>Attempt to gain unauthorized access to our servers, systems, or networks.</li>
                <li>Interfere with or disrupt the integrity or performance of the platform.</li>
                <li>Collect or harvest any information from the platform without our express permission.</li>
                <li>Use any automated system to access the platform without our express permission.</li>
                <li>Use the platform in a manner that could disable, overburden, damage, or impair it.</li>
              </ul>
              
              <h2>Account Registration</h2>
              <p>
                To access certain features of the platform, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
              </p>
              
              <h2>User Content</h2>
              <p>
                The platform allows you to upload, submit, store, send, or receive content, including text, images, and data ("User Content"). You retain ownership of any intellectual property rights in User Content. By uploading User Content, you grant GreenSense AI a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content in connection with providing the platform services.
              </p>
              <p>
                You represent and warrant that:
              </p>
              <ul>
                <li>You own or have the necessary rights to the User Content you submit.</li>
                <li>The User Content does not violate the rights of any third party, including copyright, trademark, privacy, or other personal or proprietary rights.</li>
                <li>The User Content does not contain any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable.</li>
              </ul>
              
              <h2>Privacy</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms, explains how we collect, use, and disclose information about you. By using the platform, you agree to the collection, use, and disclosure of your information as described in our Privacy Policy.
              </p>
              
              <h2>Intellectual Property</h2>
              <p>
                The platform and its original content, features, and functionality are owned by GreenSense AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our platform, except as follows:
              </p>
              <ul>
                <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
                <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
                <li>You may print or download one copy of a reasonable number of pages of the platform for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
              </ul>
              
              <h2>Disclaimer of Warranties</h2>
              <p>
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                We do not guarantee that the platform will be secure or available at any particular time or location. The information provided on the platform, including agricultural analysis, plant identification, and disease detection, is for informational purposes only and should not be relied upon as the sole basis for making agricultural decisions.
              </p>
              
              <h2>Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GREENSENSE AI, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, INCLUDING DIRECT, INDIRECT, SPECIAL, INCIDENTAL, COVER, RELIANCE, OR CONSEQUENTIAL DAMAGES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM.
              </p>
              
              <h2>Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless GreenSense AI, its affiliates, and their respective officers, directors, employees, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) resulting from your violation of these Terms or your use of the platform.
              </p>
              
              <h2>Changes to These Terms</h2>
              <p>
                We may revise these Terms at any time by updating this page. By continuing to access or use the platform after those revisions become effective, you agree to be bound by the revised Terms.
              </p>
              
              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the platform immediately, without prior notice or liability, for any reason whatsoever, including a breach of these Terms.
              </p>
              
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@greensense.ai<br />
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

export default TermsOfService;
