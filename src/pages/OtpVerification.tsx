import React from 'react';
import Layout from '@/components/layout/Layout';
import VoterVerification from '@/components/VoterVerification';

const OtpVerification = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-vote-neon animate-glow">Verify Your Identity</h1>
            <p className="text-gray-400 mt-2">
              We need to verify your identity before you can cast your vote
            </p>
          </div>
          
          <VoterVerification />
          
          <div className="mt-8 p-6 bg-black/40 rounded-lg border border-vote-neon/30 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
            <h3 className="text-sm font-medium text-vote-neon mb-4">Why do we need this?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full border border-vote-neon flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-vote-neon rounded-full"></div>
                </div>
                <span className="text-sm text-gray-300">
                  To verify your identity and eligibility to vote
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full border border-vote-neon flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-vote-neon rounded-full"></div>
                </div>
                <span className="text-sm text-gray-300">
                  To ensure the security and integrity of the voting process
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full border border-vote-neon flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-vote-neon rounded-full"></div>
                </div>
                <span className="text-sm text-gray-300">
                  To prevent fraud and multiple voting attempts
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OtpVerification;
