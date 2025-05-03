import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-[#0D0D0D] border-t border-[#1E1A3C]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#8B5CF6]" />
            <p className="text-sm text-gray-300">&copy; 2025 VoteX Blockchain Voting. All rights reserved.</p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-300 hover:text-[#A78BFA] transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm text-gray-300 hover:text-[#A78BFA] transition-colors">Privacy</Link>
            <Link to="/blockchain" className="text-sm text-gray-300 hover:text-[#A78BFA] transition-colors">Blockchain</Link>
            <Link to="/support" className="text-sm text-gray-300 hover:text-[#A78BFA] transition-colors">Support</Link>
            <Link to="/technical-support" className="text-sm text-gray-300 hover:text-[#A78BFA] transition-colors">Technical Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
