import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, LockKeyhole, MapPin, Calendar, RefreshCw, User, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Landing = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 py-10 md:py-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-vote-neon mb-4 animate-glow">
              Cast Your Vote Securely and Easily
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Our platform ensures a transparent, secure, and accessible voting process 
              that protects your identity while making your voice count.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="neon" className="px-8 py-6 text-lg">
                <Link to="/dashboard">Start Voting</Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-6 text-lg border-vote-neon text-vote-neon hover:bg-vote-neon/10">
                <Link to="/how-to-vote">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-black/40 p-10 rounded-xl relative border border-vote-neon/30 shadow-[0_0_15px_rgba(57,255,20,0.3)]">
              <div className="absolute -top-3 -left-3 bg-vote-neon text-black p-2 rounded-lg">
                <Shield className="h-8 w-8" />
              </div>
              {/* Dashboard Preview */}
              <div className="w-full">
                <div className="p-4 bg-[#0D0D0D] rounded-lg border border-vote-neon/30">
                  <h2 className="text-xl font-bold mb-2 text-vote-neon">VoteX Dashboard</h2>
                  <p className="text-sm text-gray-400 mb-4">Secure blockchain-powered voting platform</p>
                  
                  {/* Active Elections */}
                  <div className="mb-4">
                    <h3 className="text-md font-semibold text-vote-neon mb-2">Active Elections</h3>
                    <div className="p-3 bg-black/60 rounded-lg border border-vote-neon/20 mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-vote-neon">Indian Prime Minister General Election 2025</span>
                        <span className="text-xs px-2 py-0.5 bg-vote-neon/20 text-vote-neon rounded-full">Active</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Saturday, May 10, 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Voter Information */}
                  <div className="mb-4">
                    <h3 className="text-md font-semibold text-vote-neon mb-2">Voter Information</h3>
                    <div className="space-y-2 p-3 bg-black/60 rounded-lg border border-vote-neon/20">
                      <div>
                        <p className="text-xs text-gray-400">Voter ID</p>
                        <p className="text-sm font-medium text-vote-neon">V12345</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Verification Status</p>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-vote-neon rounded-full mr-2"></div>
                          <p className="text-sm font-medium text-vote-neon">Verified</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Vote Status</p>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-vote-neon rounded-full mr-2"></div>
                          <p className="text-sm font-medium text-vote-neon">Vote Cast</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Blockchain Stats */}
                  <div>
                    <h3 className="text-md font-semibold text-vote-neon mb-2">Blockchain Stats</h3>
                    <div className="space-y-2 p-3 bg-black/60 rounded-lg border border-vote-neon/20">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Latest Block</span>
                        <span className="text-sm font-medium text-vote-neon">0x8a71e3b4...92d5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Transactions</span>
                        <span className="text-sm font-medium text-vote-neon">4281</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Network Status</span>
                        <span className="text-sm font-medium text-vote-neon">Active</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2 border-vote-neon/50 text-vote-neon hover:bg-vote-neon/10">
                        <RefreshCw className="h-3 w-3 mr-2" />
                        Refresh Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-vote-neon">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/40 p-6 rounded-lg border border-vote-neon/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
              <div className="bg-vote-neon/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 border border-vote-neon/50">
                <Shield className="h-6 w-6 text-vote-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-vote-neon">Secure Authentication</h3>
              <p className="text-gray-400">
                Verify your identity with your Voter ID and a secure OTP sent to your phone.
              </p>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-vote-neon/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
              <div className="bg-vote-neon/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 border border-vote-neon/50">
                <LockKeyhole className="h-6 w-6 text-vote-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-vote-neon">Private Voting</h3>
              <p className="text-gray-400">
                Cast your vote privately and securely with our encrypted voting system.
              </p>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-vote-neon/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
              <div className="bg-vote-neon/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 border border-vote-neon/50">
                <Check className="h-6 w-6 text-vote-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-vote-neon">Instant Confirmation</h3>
              <p className="text-gray-400">
                Receive immediate confirmation once your vote has been successfully recorded.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-black to-black/80 border border-vote-neon text-vote-neon rounded-xl p-8 md:p-12 my-12 text-center shadow-[0_0_20px_rgba(57,255,20,0.3)]">
          <h2 className="text-3xl font-bold mb-4 animate-glow">Ready to Make Your Voice Heard?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join thousands of citizens who are already using our secure voting system.
          </p>
          <Button asChild variant="neon" className="px-8 py-6 text-lg">
            <Link to="/dashboard">Start Voting Now</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
