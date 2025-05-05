
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Facebook, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-12 bg-gradient-to-t from-[#0D0D18] to-[#0D0D0D] border-t border-[#1E1A3C]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <Shield className="h-7 w-7 text-[#8B5CF6] group-hover:text-[#9F7AEA] transition-colors" />
              <span className="font-bold text-xl tracking-tight text-[#8B5CF6] group-hover:text-[#9F7AEA] transition-colors">
                VoteX
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              VoteX is India's first blockchain-based secure voting platform designed for the 2025 General Elections, ensuring transparency, security, and accessibility in the democratic process.
            </p>
            <div className="flex gap-4 mt-4">
              <SocialLink icon={<Twitter size={18} />} href="https://twitter.com/votex" />
              <SocialLink icon={<Facebook size={18} />} href="https://facebook.com/votex" />
              <SocialLink icon={<Instagram size={18} />} href="https://instagram.com/votex" />
              <SocialLink icon={<Mail size={18} />} href="mailto:contact@votex.gov.in" />
              <SocialLink icon={<Phone size={18} />} href="tel:+911123070950" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/how-to-vote">How To Vote</FooterLink>
              <FooterLink href="/faq">Frequently Asked Questions</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
              <FooterLink href="/technical-support">Technical Support</FooterLink>
              <FooterLink href="/election-schedule">Election Schedule</FooterLink>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/blockchain">Blockchain Technology</FooterLink>
              <FooterLink href="/security">Security Features</FooterLink>
              <FooterLink href="/accessibility">Accessibility</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-[#1E1A3C] flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">&copy; 2025 VoteX Blockchain Voting. All rights reserved.</p>
          <p className="text-xs text-gray-500">A secure platform by the Election Commission of India</p>
        </div>
      </div>
    </footer>
  );
};

// Footer Link Component
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link to={href} className="text-gray-400 hover:text-[#A78BFA] transition-colors text-sm inline-block py-1">
      {children}
    </Link>
  </li>
);

// Social Link Component
const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1E1A3C] hover:bg-[#2D1B69] flex items-center justify-center text-gray-400 hover:text-[#A78BFA] transition-all">
    {icon}
  </a>
);

export default Footer;
