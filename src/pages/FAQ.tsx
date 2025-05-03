import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Shield, FileText, HelpCircle, ChevronRight, Calendar, Info, Vote, Landmark } from 'lucide-react';

const FAQ = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-[#6D28D9]" />
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#6D28D9] to-[#9F7AEA] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400">
              Everything you need to know about secure blockchain voting for Indian General Elections 2025
            </p>
          </div>

          <div className="flex items-center justify-between mb-8 p-4 rounded-lg bg-[#6D28D9]/10 border border-[#6D28D9]/30">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#9F7AEA]" />
              <p className="text-[#9F7AEA] font-medium">Election Dates: April 19 - May 22, 2025</p>
            </div>
            <Link to="/election-schedule" className="text-xs px-3 py-1 bg-[#6D28D9] text-white rounded-full hover:bg-[#6D28D9]/80 transition-colors">
              View Schedule
            </Link>
          </div>

          <Card className="p-6 border-[#6D28D9]/30 bg-[#0D0D0D] shadow-lg mb-8">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#6D28D9]/20">
              <Vote className="h-5 w-5 text-[#6D28D9]" />
              <h2 className="text-lg font-semibold text-white">General Voting Questions</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  What is blockchain voting?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Blockchain voting uses distributed ledger technology to create a secure, transparent, and tamper-proof voting system. Each vote is recorded as an encrypted transaction on the blockchain, ensuring that votes cannot be altered or deleted once cast. For the Indian General Elections, this technology provides an additional layer of security while maintaining the privacy of your vote.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  How secure is VoteX for Indian elections?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  VoteX employs advanced encryption and blockchain technology that complies with Election Commission of India (ECI) security standards. Each vote is verified through multiple nodes in the blockchain network, and the entire system undergoes regular security audits by independent cybersecurity experts appointed by the ECI. The system uses Aadhaar-based verification to ensure that only eligible Indian voters can participate.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  Do I need to have my Aadhaar linked to my mobile number?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes, your Aadhaar number must be linked to your mobile number to receive the OTP for verification. If your mobile number is not linked to your Aadhaar, please visit the nearest Aadhaar Seva Kendra or use the UIDAI self-service portal to update your information before using the VoteX system.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  How is my privacy protected while voting for Indian elections?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  VoteX uses zero-knowledge proofs to verify your eligibility to vote without revealing your identity. Your vote is encrypted and anonymized before being added to the blockchain, ensuring complete voter privacy while maintaining system integrity. The system complies with all Indian privacy laws including the Personal Data Protection Bill provisions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="p-6 border-[#6D28D9]/30 bg-[#0D0D0D] shadow-lg mb-8">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#6D28D9]/20">
              <Info className="h-5 w-5 text-[#6D28D9]" />
              <h2 className="text-lg font-semibold text-white">Technical Questions</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-5" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  What happens if I lose my OTP or it doesn't arrive?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  If you don't receive the OTP or it expires, you can request a new one by clicking the "Resend OTP" button on the verification page. A new code will be sent to your Aadhaar-linked mobile number. If you continue facing issues, you can call our toll-free helpline at 1800-111-950 for assistance.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  How can I verify my vote was counted in the Indian elections?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  After voting, you'll receive a unique transaction ID. You can use this ID in the "Verify Vote" section of your dashboard to confirm that your vote was recorded correctly on the blockchain, without revealing your specific voting choices. This transaction ID also serves as your digital receipt for participation in the Indian General Elections.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  What devices can I use to vote in the Indian elections?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  VoteX is compatible with any device that has a web browser, including smartphones, tablets, laptops, and desktop computers. The system is optimized to work even on 2G/3G connections for voters in rural areas. For those without personal devices, special VoteX kiosks will be available at designated government centers across India.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  How are the Indian election results calculated using blockchain?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Election results are calculated automatically by counting the verified transactions on the blockchain. This process is transparent and can be independently audited by all political parties and authorized observers, ensuring accuracy and trust in the final outcome. The Election Commission of India will publish results constituency-wise as they are confirmed.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="p-6 border-[#6D28D9]/30 bg-[#0D0D0D] shadow-lg mb-8">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#6D28D9]/20">
              <Landmark className="h-5 w-5 text-[#6D28D9]" />
              <h2 className="text-lg font-semibold text-white">Eligibility & Constituency Questions</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-9" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  How do I know my correct constituency for voting?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Your constituency is determined by your registered address on your Voter ID (EPIC). When you log in with your EPIC number, the system will automatically show you the candidates for your specific constituency. If you've recently moved, make sure your voter registration is updated through the National Voter Service Portal (nvsp.in).
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-10" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  What if I'm an NRI voter?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Non-Resident Indians (NRIs) who are registered voters can use VoteX to cast their votes remotely. You need to have a valid Indian passport and your name must be in the electoral roll of your constituency in India. The verification process for NRIs includes additional steps to verify your passport details and overseas address.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-11" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  I don't have an EPIC or Voter ID. Can I still vote?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  To participate in the Indian General Elections through VoteX, you must have a valid EPIC (Voter ID) number. If you don't have one, please register through the National Voter Service Portal (nvsp.in) as soon as possible. New voter registrations for the 2025 General Elections close 10 days before the voting date for your constituency.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-12" className="border-[#6D28D9]/20">
                <AccordionTrigger className="text-white hover:text-[#9F7AEA] font-medium">
                  What is the NOTA option?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  NOTA (None Of The Above) is an option that allows voters to indicate that they do not wish to vote for any of the candidates. It appears as the last option on the ballot. Selecting NOTA registers your participation in the democratic process while expressing dissatisfaction with all available candidates. Your NOTA vote is counted separately in the election statistics.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
          
          <div className="p-6 bg-[#0D0D0D] border border-[#6D28D9]/30 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-[#6D28D9]" />
              <h3 className="text-xl font-medium text-white">Still have questions?</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Our support team is available in 12 regional languages to answer any questions about the VoteX platform and the Indian General Elections 2025.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#6D28D9]"></span>
                <span>Hindi, English, Tamil</span>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#6D28D9]"></span>
                <span>Bengali, Telugu, Marathi</span>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#6D28D9]"></span>
                <span>Gujarati, Kannada, Malayalam</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/support" className="inline-flex items-center justify-center px-4 py-2 border border-[#6D28D9] text-[#9F7AEA] hover:bg-[#6D28D9]/10 rounded-md transition-colors">
                Contact Support
              </Link>
              <Link to="/how-to-vote" className="inline-flex items-center justify-center px-4 py-2 bg-[#6D28D9] text-white hover:bg-[#6D28D9]/90 rounded-md transition-colors">
                <span>View Voting Guide</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
