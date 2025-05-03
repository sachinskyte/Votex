import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Phone, Shield, HelpCircle, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Support request submitted successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[#6D28D9]" />
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#6D28D9] to-[#9F7AEA] bg-clip-text text-transparent">
              Contact Support
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our dedicated support team is here to help you with any questions or issues related to the VoteX blockchain voting system for the Indian General Elections 2025
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-[#6D28D9]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Phone Support</h3>
              <p className="text-gray-300 mb-2">Available 9am - 6pm IST</p>
              <p className="text-gray-300 mb-4">Monday to Saturday</p>
              <p className="text-[#9F7AEA] font-medium">1800-111-950</p>
              <p className="text-[#9F7AEA] font-medium">+91 11-2307-0950</p>
            </Card>
            
            <Card className="p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#6D28D9]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
              <p className="text-gray-300 mb-4">24x7 service with responses within 24 hours</p>
              <p className="text-[#9F7AEA] font-medium">support@votex.gov.in</p>
              <p className="text-[#9F7AEA] font-medium mt-1">helpdesk@eci-votex.in</p>
            </Card>
            
            <Card className="p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#6D28D9]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Regional Support</h3>
              <p className="text-gray-300 mb-4">Contact your local Election Commission office</p>
              <div className="flex flex-col gap-2 w-full">
                <Link to="/regional-support" className="text-[#9F7AEA] hover:underline">Find Your Regional Office</Link>
                <Link to="/booth-locator" className="text-[#9F7AEA] hover:underline">Polling Booth Locator</Link>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#6D28D9]" />
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Rajesh Kumar Singh"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-[#6D28D9] text-white placeholder:text-gray-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@example.com"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-[#6D28D9] text-white placeholder:text-gray-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you with the election voting?"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-[#6D28D9] text-white placeholder:text-gray-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Please provide your Voter ID (EPIC number) and constituency details if applicable..."
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#6D28D9]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#6D28D9] hover:bg-[#6D28D9]/90 text-white font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Request'
                  )}
                </Button>
              </form>
            </Card>
            
            <div className="space-y-6">
              <Card className="p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#6D28D9]" />
                  Common Issues
                </h2>
                <ul className="space-y-3">
                  <li className="p-3 bg-gray-800/30 rounded-md hover:bg-gray-800/50 transition-colors">
                    <h4 className="font-medium text-white">Aadhaar Verification Issues</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Ensure your Aadhaar number is correctly linked to your mobile number for OTP verification.
                    </p>
                  </li>
                  <li className="p-3 bg-gray-800/30 rounded-md hover:bg-gray-800/50 transition-colors">
                    <h4 className="font-medium text-white">Voter ID (EPIC) Not Recognized</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Verify your 10-character EPIC number on your Voter ID card or contact your local Electoral Registration Officer.
                    </p>
                  </li>
                  <li className="p-3 bg-gray-800/30 rounded-md hover:bg-gray-800/50 transition-colors">
                    <h4 className="font-medium text-white">Constituency Selection Problems</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      If you're unable to see your correct constituency, check your enrollment status on the National Voters' Service Portal.
                    </p>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#6D28D9]" />
                  Election Schedule
                </h2>
                <p className="text-gray-300 mb-4">
                  Phase 1 voting begins on 19 April 2025 across 102 constituencies. Check your specific constituency voting date below.
                </p>
                <div className="p-4 bg-[#6D28D9]/10 border border-[#6D28D9]/30 rounded-md mb-4">
                  <p className="text-[#9F7AEA] text-sm font-medium mb-2">
                    Remote Electronic Voting Schedule:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Phase 1: April 19 - 21, 2025</li>
                    <li>• Phase 2: April 26 - 28, 2025</li>
                    <li>• Phase 3: May 7 - 9, 2025</li>
                    <li>• Phase 4: May 13 - 15, 2025</li>
                    <li>• Phase 5: May 20 - 22, 2025</li>
                  </ul>
                </div>
                <Link to="/election-schedule" className="text-[#9F7AEA] hover:underline flex items-center gap-1">
                  View detailed constituency-wise schedule <ChevronRight className="h-4 w-4" />
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
