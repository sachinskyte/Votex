import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Database, 
  Shield, 
  Server, 
  Code, 
  Network, 
  LockKeyhole, 
  Cpu, 
  FileCode, 
  ChevronRight,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

const TechnicalSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    txHash: ''
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
      toast.success("Technical support request submitted successfully. A blockchain specialist will contact you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        txHash: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <Database className="h-12 w-12 mx-auto mb-4 text-[#6D28D9]" />
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#6D28D9] to-[#9F7AEA] bg-clip-text text-transparent">
              Technical Support Center
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized assistance for blockchain-related issues, transaction verification, and technical aspects
              of the VoteX platform for Indian General Elections 2025
            </p>
          </div>

          <Tabs defaultValue="support" className="mb-10">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="support" className="data-[state=active]:bg-[#6D28D9]/20 data-[state=active]:text-[#9F7AEA]">
                <Server className="h-4 w-4 mr-2" />
                Technical Help
              </TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:bg-[#6D28D9]/20 data-[state=active]:text-[#9F7AEA]">
                <FileCode className="h-4 w-4 mr-2" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="verification" className="data-[state=active]:bg-[#6D28D9]/20 data-[state=active]:text-[#9F7AEA]">
                <Shield className="h-4 w-4 mr-2" />
                Vote Verification
              </TabsTrigger>
            </TabsList>

            <TabsContent value="support" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-5 border-gray-800 bg-gray-900/50 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-3">
                    <Code className="h-5 w-5 text-[#6D28D9]" />
                  </div>
                  <h3 className="text-md font-semibold text-white mb-2">Developer Support</h3>
                  <p className="text-sm text-gray-400 mb-2">For third-party app developers</p>
                  <p className="text-[#9F7AEA] font-medium text-sm">dev-support@eci-votex.in</p>
                </Card>
                
                <Card className="p-5 border-gray-800 bg-gray-900/50 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-3">
                    <Network className="h-5 w-5 text-[#6D28D9]" />
                  </div>
                  <h3 className="text-md font-semibold text-white mb-2">Network Monitoring</h3>
                  <p className="text-sm text-gray-400 mb-2">Blockchain network status</p>
                  <a href="/network-status" className="text-[#9F7AEA] hover:underline text-sm">View Status Dashboard</a>
                </Card>
                
                <Card className="p-5 border-gray-800 bg-gray-900/50 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mb-3">
                    <LockKeyhole className="h-5 w-5 text-[#6D28D9]" />
                  </div>
                  <h3 className="text-md font-semibold text-white mb-2">Security Team</h3>
                  <p className="text-sm text-gray-400 mb-2">Report security vulnerabilities</p>
                  <p className="text-[#9F7AEA] font-medium text-sm">security@eci-votex.in</p>
                </Card>
              </div>
              
              <Card className="p-6 border-gray-800 bg-gray-900/50">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#6D28D9]" />
                  Technical Support Request
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Technical issue description"
                      required
                      className="bg-gray-800/50 border-gray-700 focus:border-[#6D28D9] text-white placeholder:text-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="txHash" className="block text-sm font-medium text-gray-300 mb-1">
                      Transaction Hash <span className="text-gray-500 text-xs">(if applicable)</span>
                    </label>
                    <Input
                      id="txHash"
                      name="txHash"
                      value={formData.txHash}
                      onChange={handleChange}
                      placeholder="e.g., 0x8a71e3b4c59d..."
                      className="bg-gray-800/50 border-gray-700 focus:border-[#6D28D9] text-white placeholder:text-gray-500 font-mono text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Technical Details</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Please provide detailed information about the technical issue, including device information, browser version, and steps to reproduce..."
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
                      'Submit Technical Request'
                    )}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="docs" className="space-y-6">
              <Card className="p-6 border-gray-800 bg-gray-900/50">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-[#6D28D9]" />
                  Technical Documentation
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-800 rounded-md hover:bg-gray-800/30 transition-colors">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-[#6D28D9]" />
                      Blockchain Architecture
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 mb-3">
                      Complete documentation on the custom blockchain architecture used in VoteX including consensus algorithms, block structure, and validation mechanisms.
                    </p>
                    <a href="/docs/blockchain-architecture" className="text-[#9F7AEA] hover:underline text-sm flex items-center">
                      View Documentation <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-md hover:bg-gray-800/30 transition-colors">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Shield className="h-4 w-4 text-[#6D28D9]" />
                      Zero-Knowledge Proofs
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 mb-3">
                      Technical details on how zero-knowledge proofs are implemented to ensure vote privacy while maintaining system integrity and verifiability.
                    </p>
                    <a href="/docs/zero-knowledge-proofs" className="text-[#9F7AEA] hover:underline text-sm flex items-center">
                      View Documentation <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-md hover:bg-gray-800/30 transition-colors">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <LockKeyhole className="h-4 w-4 text-[#6D28D9]" />
                      Cryptographic Protocols
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 mb-3">
                      Detailed explanation of the cryptographic protocols used for voter authentication, vote encryption, and blockchain security.
                    </p>
                    <a href="/docs/cryptographic-protocols" className="text-[#9F7AEA] hover:underline text-sm flex items-center">
                      View Documentation <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-md hover:bg-gray-800/30 transition-colors">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                      <Network className="h-4 w-4 text-[#6D28D9]" />
                      API Reference
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 mb-3">
                      Complete API documentation for integrators and developers who want to build applications on top of the VoteX platform.
                    </p>
                    <a href="/docs/api-reference" className="text-[#9F7AEA] hover:underline text-sm flex items-center">
                      View Documentation <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <Card className="p-6 border-gray-800 bg-gray-900/50">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#6D28D9]" />
                  Vote Verification Tool
                </h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Use this tool to verify that your vote was recorded correctly on the blockchain. Enter your transaction
                    hash to view its status and confirmation details without revealing your actual vote.
                  </p>
                  
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter transaction hash (0x...)"
                      className="bg-gray-800/50 border-gray-700 focus:border-[#6D28D9] text-white font-mono"
                    />
                    <Button className="bg-[#6D28D9] hover:bg-[#6D28D9]/90 min-w-[100px]">
                      Verify
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-[#6D28D9]/10 border border-[#6D28D9]/30 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-[#9F7AEA]" />
                      <p className="text-[#9F7AEA] font-medium">Important Privacy Notice</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      Your vote remains confidential during verification. This tool only confirms that your vote was recorded 
                      in the blockchain, the time it was recorded, and its validity. The actual candidate you voted for is 
                      protected by zero-knowledge cryptography and will never be revealed through this verification process.
                    </p>
                  </div>
                  
                  <h3 className="text-md font-medium text-white mt-6 mb-3">What You Can Verify</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-800/30 rounded-md border border-gray-800">
                      <h4 className="font-medium text-[#9F7AEA] text-sm mb-1">Vote Inclusion</h4>
                      <p className="text-xs text-gray-400">
                        Confirm your vote is included in the blockchain with valid cryptographic proofs
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-md border border-gray-800">
                      <h4 className="font-medium text-[#9F7AEA] text-sm mb-1">Timestamp Verification</h4>
                      <p className="text-xs text-gray-400">
                        Verify exactly when your vote was recorded in the immutable ledger
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-md border border-gray-800">
                      <h4 className="font-medium text-[#9F7AEA] text-sm mb-1">Integrity Check</h4>
                      <p className="text-xs text-gray-400">
                        Ensure your vote transaction has not been tampered with in any way
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center">
            <Link to="/support" className="text-[#9F7AEA] hover:underline flex items-center">
              <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
              Back to General Support
            </Link>
            
            <div className="text-xs text-gray-500">
              ECI Blockchain Division • Technical Support Center
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TechnicalSupport; 