
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Phone, Shield, HelpCircle, CheckCircle, MapPin, Calendar, ChevronRight } from 'lucide-react';
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
      <div className="container mx-auto px-4 py-12 relative">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#6D28D9]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#9F7AEA]/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block p-3 bg-[#6D28D9]/10 rounded-full mb-4">
              <MessageSquare className="h-10 w-10 text-[#6D28D9]" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#6D28D9] to-[#9F7AEA] bg-clip-text text-transparent">
              Contact Support
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our dedicated support team is here to help you with any questions or issues related to the VoteX blockchain voting system for the Indian General Elections 2025
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-lg hover:shadow-[0_0_15px_rgba(109,40,217,0.15)] transition-all duration-300 hover:-translate-y-1">
              <div className="h-16 w-16 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-6 mx-auto">
                <Phone className="h-7 w-7 text-[#6D28D9]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Phone Support</h3>
              <p className="text-gray-300 mb-2 text-center">Available 9am - 6pm IST</p>
              <p className="text-gray-300 mb-5 text-center">Monday to Saturday</p>
              <div className="space-y-2">
                <p className="text-[#9F7AEA] font-medium text-center py-2 border border-[#6D28D9]/20 rounded-lg bg-[#6D28D9]/5">1800-111-950</p>
                <p className="text-[#9F7AEA] font-medium text-center py-2 border border-[#6D28D9]/20 rounded-lg bg-[#6D28D9]/5">+91 11-2307-0950</p>
              </div>
            </Card>
            
            <Card className="p-6 border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-lg hover:shadow-[0_0_15px_rgba(109,40,217,0.15)] transition-all duration-300 hover:-translate-y-1">
              <div className="h-16 w-16 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-6 mx-auto">
                <Mail className="h-7 w-7 text-[#6D28D9]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Email Support</h3>
              <p className="text-gray-300 mb-5 text-center">24x7 service with responses within 24 hours</p>
              <div className="space-y-2">
                <p className="text-[#9F7AEA] font-medium text-center py-2 border border-[#6D28D9]/20 rounded-lg bg-[#6D28D9]/5">support@votex.gov.in</p>
                <p className="text-[#9F7AEA] font-medium text-center py-2 border border-[#6D28D9]/20 rounded-lg bg-[#6D28D9]/5">helpdesk@eci-votex.in</p>
              </div>
            </Card>
            
            <Card className="p-6 border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-lg hover:shadow-[0_0_15px_rgba(109,40,217,0.15)] transition-all duration-300 hover:-translate-y-1">
              <div className="h-16 w-16 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-6 mx-auto">
                <MapPin className="h-7 w-7 text-[#6D28D9]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Regional Support</h3>
              <p className="text-gray-300 mb-5 text-center">Contact your local Election Commission office</p>
              <div className="flex flex-col gap-3">
                <Link to="/regional-support" className="text-center py-2.5 rounded-lg border border-[#6D28D9]/20 bg-[#6D28D9]/5 text-[#9F7AEA] hover:bg-[#6D28D9]/10 transition-colors">
                  Find Your Regional Office
                </Link>
                <Link to="/booth-locator" className="text-center py-2.5 rounded-lg border border-[#6D28D9]/20 bg-[#6D28D9]/5 text-[#9F7AEA] hover:bg-[#6D28D9]/10 transition-colors">
                  Polling Booth Locator
                </Link>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border border-[#6D28D9]/20 bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-lg hover:shadow-[0_0_15px_rgba(109,40,217,0.15)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-[#6D28D9]/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-[#6D28D9]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1.5">Subject</label>
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Please provide your Voter ID (EPIC number) and constituency details if applicable..."
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6D28D9] focus:border-[#6D28D9]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-medium py-2.5"
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
              <Card className="p-6 border border-[#6D28D9]/20 bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-lg hover:shadow-[0_0_15px_rgba(109,40,217,0.15)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#6D28D9]/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-[#6D28D9]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Common Issues</h2>
                </div>
                <ul className="space-y-3">
                  <li className="p-3.5 bg-[#15121E] rounded-lg hover:bg-[#1A1627] transition-colors border border-[#6D28D9]/10">
                    <h4 className="font-medium text-[#9F7AEA]">Aadhaar Verification Issues</h4>
                    <p className="text-sm text-gray-400 mt-1.5">
                      Ensure your Aadhaar number is correctly linked to your mobile number for OTP verification.
                    </p>
                  </li>
                  <li className="p-3.5 bg-[#15121E] rounded-lg hover:bg-[#1A1627] transition-colors border border-[#6D28D9]/10">
                    <h4 className="font-medium text-[#9F7AEA]">Voter ID (EPIC) Not Recognized</h4>
                    <p className="text-sm text-gray-400 mt-1.5">
                      Verify your 10-character EPIC number on your Voter ID card or contact your local Electoral Registration Officer.
                    </p>
                  </li>
                  <li className="p-3.5 bg-[#15121E] rounded-lg hover:bg-[#1A1627] transition-colors border border-[#6D28D9]/10">
                    <h4 className="font-medium text-[#9F7AEA]">Constituency Selection Problems</h4>
                    <p className="text-sm text-gray-400 mt-1.5">
                      If you're unable to see your correct constituency, check your enrollment status on the National Voters' Service Portal.
                    </p>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 border border-[#6D28D9]/20 bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-lg hover:shadow-[0_0_15px_rgba(109,40,217,0.15)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#6D28D9]/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-[#6D28D9]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Election Schedule</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Phase 1 voting begins on 19 April 2025 across 102 constituencies. Check your specific constituency voting date below.
                </p>
                <div className="p-4 bg-[#6D28D9]/10 border border-[#6D28D9]/30 rounded-md mb-5">
                  <p className="text-[#9F7AEA] text-sm font-medium mb-3">
                    Remote Electronic Voting Schedule:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#9F7AEA]"></div>
                      Phase 1: April 19 - 21, 2025
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#9F7AEA]"></div>
                      Phase 2: April 26 - 28, 2025
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#9F7AEA]"></div>
                      Phase 3: May 7 - 9, 2025
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#9F7AEA]"></div>
                      Phase 4: May 13 - 15, 2025
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#9F7AEA]"></div>
                      Phase 5: May 20 - 22, 2025
                    </li>
                  </ul>
                </div>
                <Link to="/election-schedule" className="inline-flex items-center gap-1.5 text-[#9F7AEA] hover:text-[#7C3AED] transition-colors font-medium px-3 py-2 bg-[#6D28D9]/5 rounded-lg border border-[#6D28D9]/20">
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
