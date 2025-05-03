import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { FileText, Shield, CheckCircle, Smartphone, User, LockKeyhole, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowToVote = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-[#6D28D9]" />
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#6D28D9] to-[#9F7AEA] bg-clip-text text-transparent">
              How to Vote in Indian General Elections 2025
            </h1>
            <p className="text-gray-400">
              A step-by-step guide to casting your secure blockchain vote for the world's largest democracy
            </p>
          </div>

          <div className="mb-8 flex items-center justify-between p-4 rounded-lg bg-[#6D28D9]/10 border border-[#6D28D9]/30">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-[#9F7AEA]" />
              <p className="text-[#9F7AEA] font-medium">Election Phase 1 starts April 19, 2025</p>
            </div>
            <Link to="/election-schedule" className="text-xs px-3 py-1 bg-[#6D28D9] text-white rounded-full hover:bg-[#6D28D9]/80 transition-colors">
              Check Your Phase
            </Link>
          </div>

          <Card className="p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
              <Shield className="h-6 w-6 text-[#6D28D9]" />
              <h2 className="text-xl font-semibold text-white">Before You Begin</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                Before you start the voting process, please ensure you have the following ready:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your <strong>10-character EPIC number</strong> (Voter ID number)</li>
                <li>Your <strong>Aadhaar number</strong> for authentication</li>
                <li>Access to your registered mobile number for OTP verification</li>
                <li>A stable internet connection (minimum 1 Mbps recommended)</li>
                <li>Your constituency details (as per your voter registration)</li>
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-800/50 rounded-md border border-[#6D28D9]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-[#9F7AEA]" />
                    <p className="text-[#9F7AEA] font-medium">Important:</p>
                  </div>
                  <p className="text-sm">
                    Once your vote is submitted to the blockchain, it cannot be changed or withdrawn. 
                    Please take your time to review your selection before final submission.
                  </p>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-md border border-[#6D28D9]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-[#9F7AEA]" />
                    <p className="text-[#9F7AEA] font-medium">Need Help?</p>
                  </div>
                  <p className="text-sm">
                    Call our toll-free helpline at <span className="text-white">1800-111-950</span> for assistance 
                    or check your Voter ID status at <a href="https://nvsp.in" className="text-[#9F7AEA] underline">nvsp.in</a>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-8 mb-12">
            <div className="relative">
              <div className="hidden md:block absolute left-8 top-10 bottom-0 w-0.5 bg-gradient-to-b from-[#6D28D9] to-transparent"></div>
              
              <div className="relative flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border border-[#6D28D9] text-[#6D28D9] z-10">
                  <User className="h-8 w-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">Step 1: Log in with Your EPIC Number</h3>
                  <Card className="p-5 border-gray-800 bg-gray-800/30">
                    <p className="text-gray-300 mb-3">
                      Visit the VoteX portal and enter your 10-character EPIC number found on your 
                      Voter ID card issued by the Election Commission of India.
                    </p>
                    <div className="mb-3 p-3 bg-[#15121E] rounded-md border border-[#6D28D9]/20">
                      <p className="text-sm text-gray-400">Example EPIC Format: <span className="text-[#9F7AEA] font-mono">UTC1234567</span></p>
                      <p className="text-xs text-gray-500 mt-1">The first 3 letters represent your state/UT code (e.g., UTC for Uttarakhand)</p>
                    </div>
                    <Link to="/dashboard" className="text-[#9F7AEA] hover:underline flex items-center gap-1">
                      Go to Dashboard <CheckCircle className="h-4 w-4" />
                    </Link>
                  </Card>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border border-[#6D28D9] text-[#6D28D9] z-10">
                  <Smartphone className="h-8 w-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">Step 2: Aadhaar Verification</h3>
                  <Card className="p-5 border-gray-800 bg-gray-800/30">
                    <p className="text-gray-300 mb-3">
                      You'll need to verify your identity through your Aadhaar number and a secure OTP 
                      sent to your Aadhaar-linked mobile number.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Enter the last 4 digits of your Aadhaar number</li>
                      <li>Click "Send OTP" to receive a verification code on your registered mobile</li>
                      <li>Enter the 6-digit code within 10 minutes</li>
                    </ul>
                    <div className="mt-4 p-3 bg-[#15121E] rounded-md border border-[#6D28D9]/20">
                      <p className="text-xs text-gray-400">
                        Your data is secure and encrypted. Only the last 4 digits of your Aadhaar are requested for verification purposes.
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border border-[#6D28D9] text-[#6D28D9] z-10">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">Step 3: Cast Your Vote for Your Constituency</h3>
                  <Card className="p-5 border-gray-800 bg-gray-800/30">
                    <p className="text-gray-300 mb-3">
                      After successful verification, you'll see the list of candidates for your constituency.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Review all candidates and their party symbols</li>
                      <li>Select your chosen candidate by clicking on their name/symbol</li>
                      <li>You will see the NOTA (None Of The Above) option at the bottom if you wish to use it</li>
                      <li>Confirm your selection on the verification screen</li>
                      <li>Click "Submit Vote" to cast your vote securely</li>
                    </ul>
                    <div className="mt-4 flex flex-col md:flex-row items-center gap-4 p-3 bg-[#15121E] rounded-md border border-[#6D28D9]/20">
                      <img 
                        src="/images/ballot-sample.jpg" 
                        alt="Sample Ballot" 
                        className="w-full md:w-32 h-auto rounded-md"
                        onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                      />
                      <p className="text-xs text-gray-400">
                        The ballot will display candidate names, party affiliations, and party symbols as 
                        registered with the Election Commission of India for the 2025 elections.
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative flex items-start gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border border-[#6D28D9] text-[#6D28D9] z-10">
                  <LockKeyhole className="h-8 w-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">Step 4: Blockchain Confirmation</h3>
                  <Card className="p-5 border-gray-800 bg-gray-800/30">
                    <p className="text-gray-300 mb-3">
                      Your vote will be encrypted and recorded on the blockchain. This process typically takes less than 30 seconds.
                    </p>
                    <p className="text-gray-300 mb-3">
                      Once confirmed, you'll see a success message and receive a unique transaction ID that you can use to verify 
                      your vote was properly recorded without revealing your specific choice.
                    </p>
                    <div className="p-3 bg-[#6D28D9]/10 border border-[#6D28D9]/30 rounded-md">
                      <p className="text-[#9F7AEA] text-sm">
                        Your vote is now immutable and securely recorded on the blockchain. This helps ensure the integrity 
                        of India's democratic process. Thank you for participating in the 2025 General Elections!
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#6D28D9]" />
              Need Assistance?
            </h3>
            <p className="text-gray-300 mb-4">
              If you encounter any issues during the voting process or have questions about India's electronic voting system,
              our support team is available in 12 regional languages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/faq" className="inline-flex items-center justify-center px-4 py-2 border border-[#6D28D9] text-[#9F7AEA] hover:bg-[#6D28D9]/10 rounded-md transition-colors">
                View FAQ
              </Link>
              <Link to="/support" className="inline-flex items-center justify-center px-4 py-2 bg-[#6D28D9] text-white hover:bg-[#6D28D9]/90 rounded-md transition-colors">
                Contact Support
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HowToVote;
