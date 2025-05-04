import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, Clock, ArrowRight, Lock, Shield, 
  FileText, Database, ChevronRight, AlertCircle, RefreshCw, User, Vote 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { userAPI, votingAPI } from '@/services/api';
import useBlockchain from '@/hooks/useBlockchain';
import SettingsDropdown from '@/components/dashboard/SettingsDropdown';
import useDemoMode from '@/hooks/useDemoMode';
import ElectionsList from '@/components/ElectionsList';
import BlockchainStats from '@/components/dashboard/BlockchainStats';

// Demo data for the dashboard
const demoData = {
  election: {
    title: "Indian Prime Minister General Election 2025",
    date: "May 10, 2025",
    status: "Active"
  },
  voter: {
    voterId: "VOTER-2025-1234789",
    status: "Active",
    pollingStation: "District 7 - Central Hall",
    blockchainWallet: "0x71C9D8F3b5...93E4"
  },
  votes: [
    {
      electionTitle: "2024 Local Council Election",
      date: "January 15, 2024",
      blockId: "85291"
    },
    {
      electionTitle: "2023 School Board Election",
      date: "September 3, 2023",
      blockId: "67482"
    }
  ]
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { status: blockchainStatus, lastBlock, transactions, isLoading: blockchainLoading, refreshStatus } = useBlockchain();
  const { isDemoMode } = useDemoMode();
  
  const [hasVoted, setHasVoted] = useState(false);
  const [currentElection, setCurrentElection] = useState({
    title: "Loading...",
    date: "...",
    status: "Loading",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [voterId, setVoterId] = useState<string>("VOTER-2025-XXXX789");
  const [pastVotes, setPastVotes] = useState<any[]>([]);
  const [voteStatus, setVoteStatus] = useState({ voted: false, election_id: null });
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  
  useEffect(() => {
    if (isDemoMode) {
      // Use demo data in demo mode
      setCurrentElection(demoData.election);
      setVoterId(demoData.voter.voterId);
      setPastVotes(demoData.votes);
      setHasVoted(false);
      setIsLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Get stored voter ID from localStorage
        const storedVoterId = localStorage.getItem('voterId');
        if (storedVoterId) {
          setVoterId(storedVoterId);
        }
        
        // Fetch current election data
        const electionResponse = await votingAPI.getCurrentElection();
        if (electionResponse.success && electionResponse.data) {
          setCurrentElection({
            title: electionResponse.data.title,
            date: electionResponse.data.endDate,
            status: electionResponse.data.status,
          });
          
          // Check if user has voted in this election
          if (electionResponse.data.hasVoted) {
            setHasVoted(true);
          }
        }
        
        // Fetch user profile if no stored voter ID
        if (!storedVoterId) {
          const profileResponse = await userAPI.getProfile();
          if (profileResponse.success && profileResponse.data) {
            setVoterId(profileResponse.data.voterId);
          }
        }
        
        // Fetch past votes
        const votesResponse = await userAPI.getPastVotes();
        if (votesResponse.success && votesResponse.data) {
          setPastVotes(votesResponse.data.slice(0, 2)); // Get only the most recent 2
        }
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isDemoMode]);
  
  useEffect(() => {
    const checkVoteStatus = async () => {
      try {
        // First check if we have vote status in localStorage
        const storedVoteStatus = localStorage.getItem('vote-status');
        if (storedVoteStatus) {
          const parsedStatus = JSON.parse(storedVoteStatus);
          setVoteStatus(parsedStatus);
          setHasVoted(parsedStatus.voted);
          setLoading(false);
          return;
        }
        
        // If not in localStorage, try the API
        const response = await votingAPI.getStatus(voterId);
        if (response.success && response.data?.status) {
          setVoteStatus(response.data.status);
          setHasVoted(response.data.status.voted);
        }
      } catch (error) {
        console.error("Error checking vote status:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkVoteStatus();
  }, [voterId]);
  
  useEffect(() => {
    // Check if user is verified by checking localStorage
    const storedVoterId = localStorage.getItem('voterId');
    setIsVerified(!!storedVoterId);
  }, []);
  
  const handleVerify = () => {
    navigate('/verify');
  };

  const handleRefreshData = () => {
    refreshStatus();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#6D28D9] to-[#9F7AEA] bg-clip-text text-transparent">
              VoteX Dashboard
            </h1>
            <p className="text-gray-400">
              Secure blockchain-powered voting platform
              {isDemoMode && <span className="ml-2 text-[#6D28D9]">(Demo Mode)</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#15121E] px-3 py-1.5 rounded-full border border-[#2D1B69]">
              <div className={`w-2 h-2 ${blockchainStatus === 'Active' || blockchainStatus === 'Local' ? 'bg-[#6D28D9]' : 'bg-yellow-400'} rounded-full animate-pulse`}></div>
              <span className="text-sm">
                {blockchainStatus === 'Local' ? 'Local Blockchain' : `Network: ${blockchainStatus}`}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-gray-400 hover:text-white"
                onClick={handleRefreshData}
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
            <SettingsDropdown />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="md:col-span-2 space-y-6">
            {/* Active Elections Section */}
            <div>
              <h2 className="text-xl font-semibold text-[#6D28D9] mb-4">Active Elections</h2>
              <ElectionsList />
            </div>
            
            {/* Blockchain Stats Dashboard */}
            <BlockchainStats refreshInterval={10000} />
            
            {/* Security Features */}
            <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D] shadow-[0_0_10px_rgba(109,40,217,0.1)]">
              <CardHeader>
                <CardTitle className="text-[#6D28D9]">Security Features</CardTitle>
                <CardDescription>How we ensure the integrity of your vote</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#15121E] rounded-lg border border-[#6D28D9]/20">
                    <Shield className="h-8 w-8 text-[#6D28D9] mb-2" />
                    <h3 className="font-medium text-[#9F7AEA] mb-1">Secure Authentication</h3>
                    <p className="text-sm text-gray-400">OTP verification ensures only eligible voters can cast ballots</p>
                  </div>
                  <div className="p-4 bg-[#15121E] rounded-lg border border-[#6D28D9]/20">
                    <User className="h-8 w-8 text-[#6D28D9] mb-2" />
                    <h3 className="font-medium text-[#9F7AEA] mb-1">Voter Privacy</h3>
                    <p className="text-sm text-gray-400">Your vote is confidential and cannot be traced back to you</p>
                  </div>
                  <div className="p-4 bg-[#15121E] rounded-lg border border-[#6D28D9]/20">
                    <Vote className="h-8 w-8 text-[#6D28D9] mb-2" />
                    <h3 className="font-medium text-[#9F7AEA] mb-1">Vote Integrity</h3>
                    <p className="text-sm text-gray-400">One voter, one vote - system prevents duplicate voting</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Voter Info Card */}
            <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D] shadow-[0_0_10px_rgba(109,40,217,0.1)]">
              <CardHeader>
                <CardTitle className="text-[#6D28D9]">Voter Information</CardTitle>
                <CardDescription>Your voting account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Voter ID</p>
                  <p className="font-medium text-[#9F7AEA]">{voterId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Verification Status</p>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${isVerified ? 'bg-[#6D28D9]' : 'bg-gray-500'}`}></div>
                    <p className="font-medium">{isVerified ? 'Verified' : 'Not Verified'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Vote Status</p>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${voteStatus.voted ? 'bg-[#6D28D9]' : 'bg-gray-500'}`}></div>
                    <p className="font-medium">{voteStatus.voted ? 'Vote Cast' : 'Not Voted'}</p>
                  </div>
                </div>
                
                {!isVerified && (
                  <Button 
                    onClick={handleVerify} 
                    className="w-full mt-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
                  >
                    Verify Now
                  </Button>
                )}
              </CardContent>
            </Card>
            
            {/* Blockchain Stats Card */}
            <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D] shadow-[0_0_10px_rgba(109,40,217,0.1)]">
              <CardHeader>
                <CardTitle className="text-[#6D28D9]">Blockchain Stats</CardTitle>
                <CardDescription>Live network information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Latest Block</span>
                  <span className="font-medium text-[#9F7AEA]">{blockchainLoading ? '...' : lastBlock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Transactions</span>
                  <span className="font-medium text-[#9F7AEA]">{blockchainLoading ? '...' : transactions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Network Status</span>
                  <span className="font-medium text-[#9F7AEA]">{blockchainLoading ? '...' : blockchainStatus}</span>
                </div>
                <div className="mt-4 pt-3 border-t border-[#2D1B69]">
                  <Button variant="outline" onClick={refreshStatus} className="w-full border-[#6D28D9] text-[#6D28D9] hover:bg-[#2D1B69] hover:text-white">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
