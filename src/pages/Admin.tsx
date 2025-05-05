import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Layout from '@/components/layout/Layout';
import { 
  ArrowLeft, Lock, BarChart2, Shield, Users, CheckCircle2, Database, RefreshCw, 
  Settings, Link2, Network, Server, AlertCircle, Layers, CheckCircle, MapPin 
} from 'lucide-react';
import useDemoMode from '@/hooks/useDemoMode';
import { useToast } from '@/hooks/use-toast';
import BlockchainExplorer from '@/components/BlockchainExplorer';
import { votingAPI } from '@/services/api';
import blockchainService from '@/services/blockchainService';
import IndiaMap from '@/components/admin/IndiaMap';

interface AdminCredentials {
  id: string;
  password: string;
}

interface VoteResult {
  candidateId: number;
  votes: number;
  percentage: number;
}

interface Candidate {
  id: number;
  name: string;
  party: string;
  bio: string;
  image: string;
}

const ADMIN_CREDENTIALS: AdminCredentials = {
  id: "sachinpatel",
  password: "sachinskyte"
};

// Mock candidates for the admin panel
const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    party: "Bharatiya Janata Party (BJP)",
    bio: "Former city councilor with 15 years of experience in urban development and infrastructure projects.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    party: "Indian National Congress (INC)",
    bio: "Advocate for education reform and women's rights with background in social work across Bangalore.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Vijay Reddy",
    party: "Janata Dal (Secular)",
    bio: "Local business leader focused on economic development and employment opportunities for youth.",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: 4,
    name: "Lakshmi Narayanan",
    party: "Aam Aadmi Party (AAP)",
    bio: "Anti-corruption activist and former civil servant with expertise in public administration.",
    image: "https://randomuser.me/api/portraits/women/17.jpg"
  },
  {
    id: 5,
    name: "Arjun Singh",
    party: "Communist Party of India (Marxist)",
    bio: "Labor rights advocate with strong connections to workers' unions and community organizations.",
    image: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: 6,
    name: "Meena Patil",
    party: "Bahujan Samaj Party (BSP)",
    bio: "Grassroots organizer focused on social justice and representation for marginalized communities.",
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: 7,
    name: "Suresh Menon",
    party: "Nationalist Congress Party (NCP)",
    bio: "Environmental activist pushing for sustainable urban planning and green infrastructure.",
    image: "https://randomuser.me/api/portraits/men/29.jpg"
  },
  {
    id: 8,
    name: "Deepika Iyer",
    party: "Shiv Sena",
    bio: "Cultural preservation advocate focusing on heritage conservation and local traditions.",
    image: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 9,
    name: "Mohammad Hussain",
    party: "All India Majlis-e-Ittehadul Muslimeen (AIMIM)",
    bio: "Community leader working on minority rights and inclusive development policies.",
    image: "https://randomuser.me/api/portraits/men/78.jpg"
  },
  {
    id: 10,
    name: "Ananya Desai",
    party: "Independent",
    bio: "Tech entrepreneur advocating for smart city initiatives and digital governance solutions.",
    image: "https://randomuser.me/api/portraits/women/31.jpg"
  }
];

// Add Indian PM candidates for real data mode
const indianPMCandidates: Candidate[] = [
  {
    id: 1,
    name: "Narendra Modi",
    party: "Bharatiya Janata Party (BJP)",
    bio: "Current Prime Minister seeking re-election, known for economic reforms and strong foreign policy initiatives.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Rahul Gandhi",
    party: "Indian National Congress (INC)",
    bio: "Leader of opposition with focus on inclusive growth, farmer welfare, and strengthening democratic institutions.",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: 3,
    name: "Mamata Banerjee",
    party: "All India Trinamool Congress",
    bio: "Experienced state leader known for welfare schemes and grassroots mobilization strategies.",
    image: "https://randomuser.me/api/portraits/women/67.jpg"
  },
  {
    id: 4,
    name: "Arvind Kejriwal",
    party: "Aam Aadmi Party (AAP)",
    bio: "Anti-corruption crusader with focus on education, healthcare, and governance reforms.",
    image: "https://randomuser.me/api/portraits/men/17.jpg"
  },
  {
    id: 5,
    name: "Yogi Adityanath",
    party: "Bharatiya Janata Party (BJP)",
    bio: "State leader known for infrastructure development and law enforcement initiatives.",
    image: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: 6,
    name: "Mayawati",
    party: "Bahujan Samaj Party (BSP)",
    bio: "Champion of social justice and advocate for marginalized communities across India.",
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: 7,
    name: "Sharad Pawar",
    party: "Nationalist Congress Party (NCP)",
    bio: "Veteran politician with extensive experience in agriculture policy and coalition politics.",
    image: "https://randomuser.me/api/portraits/men/29.jpg"
  },
  {
    id: 8,
    name: "Akhilesh Yadav",
    party: "Samajwadi Party",
    bio: "Former state leader focusing on youth empowerment, technology, and modern infrastructure.",
    image: "https://randomuser.me/api/portraits/men/28.jpg"
  },
  {
    id: 9,
    name: "Asaduddin Owaisi",
    party: "All India Majlis-e-Ittehadul Muslimeen (AIMIM)",
    bio: "Constitutional expert advocating for minority rights and equitable development.",
    image: "https://randomuser.me/api/portraits/men/78.jpg"
  },
  {
    id: 10,
    name: "Nirmala Sitharaman",
    party: "Bharatiya Janata Party (BJP)",
    bio: "Economic policy expert with experience in finance, defense, and international relations.",
    image: "https://randomuser.me/api/portraits/women/31.jpg"
  }
];

// Updated real-world vote distribution data for Indian PM election
const realPMVoteDistribution = [
  { candidateId: 1, votes: 15426 }, // Modi - BJP
  { candidateId: 2, votes: 12819 }, // Gandhi - INC
  { candidateId: 3, votes: 7562 },  // Banerjee - TMC
  { candidateId: 4, votes: 6247 },  // Kejriwal - AAP
  { candidateId: 5, votes: 5764 },  // Adityanath - BJP
  { candidateId: 6, votes: 4683 },  // Mayawati - BSP
  { candidateId: 7, votes: 3582 },  // Pawar - NCP
  { candidateId: 8, votes: 3411 },  // Yadav - SP
  { candidateId: 9, votes: 2389 },  // Owaisi - AIMIM
  { candidateId: 10, votes: 2117 }  // Sitharaman - BJP
];

// Updated state data for nationwide elections
const indiaStateVotes = [
  { state: "Uttar Pradesh", votes: 19824, percentage: 30.1 },
  { state: "Maharashtra", votes: 12436, percentage: 18.9 },
  { state: "West Bengal", votes: 10521, percentage: 16.0 },
  { state: "Tamil Nadu", votes: 7327, percentage: 11.1 },
  { state: "Bihar", votes: 6819, percentage: 10.4 },
  { state: "Karnataka", votes: 4821, percentage: 7.3 },
  { state: "Gujarat", votes: 4022, percentage: 6.1 }
];

// Replace the regionVotingData with a simpler stateVotes array
// We're keeping this definition to avoid removing too much code at once, but simplifying it
const stateVotes = [
  { state: "Karnataka", votes: 9824, percentage: 23.5 },
  { state: "Tamil Nadu", votes: 7436, percentage: 17.8 },
  { state: "Kerala", votes: 6521, percentage: 15.6 },
  { state: "Andhra Pradesh", votes: 5327, percentage: 12.7 },
  { state: "Telangana", votes: 4819, percentage: 11.5 },
  { state: "Maharashtra", votes: 7821, percentage: 18.7 }
];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDemoMode, toggleDemoMode } = useDemoMode();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [voteResults, setVoteResults] = useState<VoteResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('Connected');
  const [nodeCount, setNodeCount] = useState(12);
  const [isAPIConnected, setIsAPIConnected] = useState(false);
  const [showingSimulatedData, setShowingSimulatedData] = useState(false);
  const [blockchainData, setBlockchainData] = useState<{
    chain: any[],
    isValid: boolean,
    totalVotes: number
  }>({
    chain: [],
    isValid: true,
    totalVotes: 0
  });
  const [activeTab, setActiveTab] = useState<'results' | 'states' | 'blockchain' | 'map'>('results');
  
  const loadResults = () => {
    setIsDataLoading(true);
    
    setTimeout(() => {
      if (isDemoMode) {
        generateDemoResults();
      } else {
        // Always use blockchain data in non-demo mode
        loadBlockchainResults();
      }
      
      // Also load blockchain data
      loadBlockchainData();
      
      setIsDataLoading(false);
    }, 1000);
  };
  
  // NEW FUNCTION: Load results directly from blockchain
  const loadBlockchainResults = () => {
    // Get election results directly from blockchain
    const blockchainElection = `election_1`;
    const electionResults = blockchainService.getElectionResults(blockchainElection);
    const totalVotesInBlockchain = blockchainService.getTotalVotes();
    
    // Convert blockchain results to our format
    const results = [];
    
    // Map candidate IDs to their vote counts
    Object.entries(electionResults).forEach(([key, votes]) => {
      const candidateId = parseInt(key.replace('candidate_', ''));
      results.push({
        candidateId,
        votes,
        percentage: 0 // Will calculate below
      });
    });
    
    // Add candidates with 0 votes
    indianPMCandidates.forEach(candidate => {
      if (!results.some(r => r.candidateId === candidate.id)) {
        results.push({
          candidateId: candidate.id,
          votes: 0,
          percentage: 0
        });
      }
    });
    
    // Calculate percentages
    if (totalVotesInBlockchain > 0) {
      results.forEach(result => {
        result.percentage = Math.round((result.votes / totalVotesInBlockchain) * 1000) / 10;
      });
    }
    
    // Sort by votes (highest first)
    results.sort((a, b) => b.votes - a.votes);
    
    setVoteResults(results);
    setTotalVotes(totalVotesInBlockchain);
    setVoterTurnout(totalVotesInBlockchain > 0 
      ? Math.round((totalVotesInBlockchain / 65450) * 1000) / 10 
      : 0);
      
    setIsAPIConnected(true);
    setShowingSimulatedData(false);
  };
  
  // Simplified function - will not be used anymore
  const generateRealResults = () => {
    // Just call the blockchain function
    loadBlockchainResults();
  };
  
  // Generate mock vote results for demonstration
  const generateDemoResults = () => {
    const totalRegisteredVoters = 12450;
    let mockTotalVotes = 0;
    
    // Create random vote counts for each candidate
    const results = mockCandidates.map(candidate => {
      // Random vote count between 80 and 2000
      const votes = Math.floor(Math.random() * 1920) + 80;
      mockTotalVotes += votes;
      
      return {
        candidateId: candidate.id,
        votes,
        percentage: 0 // Will be calculated after total is known
      };
    });
    
    // Calculate percentages based on total votes
    const resultsWithPercentages = results.map(result => ({
      ...result,
      percentage: Math.round((result.votes / mockTotalVotes) * 1000) / 10
    }));
    
    // Sort by votes (highest first)
    resultsWithPercentages.sort((a, b) => b.votes - a.votes);
    
    setVoteResults(resultsWithPercentages);
    setTotalVotes(mockTotalVotes);
    setVoterTurnout(Math.round((mockTotalVotes / totalRegisteredVoters) * 1000) / 10);
    
    toast({
      title: "Demo Data Loaded",
      description: "Showing randomly generated voting data for demonstration purposes.",
    });
  };
  
  // Add function to load blockchain data
  const loadBlockchainData = async () => {
    try {
      const response = await votingAPI.getBlockchainData();
      if (response.success && response.data) {
        setBlockchainData({
          chain: response.data.chain,
          isValid: response.data.isValid,
          totalVotes: response.data.totalVotes
        });
      }
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      toast({
        title: "Blockchain Error",
        description: "Failed to load blockchain data",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      loadResults();
      loadBlockchainData(); // Load blockchain data on authentication
    }
  }, [isAuthenticated, isDemoMode]);
  
  useEffect(() => {
    // Simulate checking network status when not in demo mode
    if (!isDemoMode) {
      // Simulate network status check
      const checkNetwork = () => {
        const statuses = ['Connected', 'Syncing', 'Connected', 'Connected']; // Mostly show connected
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randomNodes = Math.floor(Math.random() * 5) + 10; // Random between 10-15 nodes
        
        setNetworkStatus(randomStatus);
        setNodeCount(randomNodes);
      };
      
      // Initial check
      checkNetwork();
      
      // Periodic check every 15 seconds
      const interval = setInterval(checkNetwork, 15000);
      
      return () => clearInterval(interval);
    }
  }, [isDemoMode]);
  
  const handleDemoToggle = () => {
    toggleDemoMode();
    loadResults();
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminId === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminId('');
    setPassword('');
  };
  
  const handleRefreshData = () => {
    loadResults();
  };
  
  const handleConnectToAPI = () => {
    setIsDataLoading(true);
    
    toast({
      title: "Using Local Blockchain",
      description: "Connected to your local browser blockchain",
    });
    
    // Load directly from blockchain - no API connection needed
    loadBlockchainResults();
    loadBlockchainData();
    
    setNetworkStatus('Connected');
    setNodeCount(1); // Just the local browser node
    setIsDataLoading(false);
  };
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="mb-4 border-[#6D28D9]/30 text-[#6D28D9] hover:bg-[#2D1B69] hover:text-white"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="max-w-md mx-auto">
            <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D] shadow-[0_0_15px_rgba(109,40,217,0.2)]">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2D1B69] flex items-center justify-center">
                    <Lock className="h-6 w-6 text-[#9F7AEA]" />
                  </div>
                </div>
                <CardTitle className="text-center text-xl text-[#6D28D9]">
                  Admin Login
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access the admin panel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md mb-4 text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="admin-id" className="text-sm font-medium text-gray-300">
                        Admin ID
                      </label>
                      <Input
                        id="admin-id"
                        placeholder="Enter your admin ID"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        className="bg-[#15121E] border-[#2D1B69] focus:border-[#6D28D9]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-gray-300">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#15121E] border-[#2D1B69] focus:border-[#6D28D9]"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
                  >
                    Log In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button 
              variant="outline" 
              className="mb-4 border-[#6D28D9]/30 text-[#6D28D9] hover:bg-[#2D1B69] hover:text-white"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#9F7AEA] bg-clip-text text-transparent">
              Election Admin Panel
            </h1>
            <p className="text-gray-400 mt-2">
              Indian Prime Minister General Election 2025
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Settings Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-[#6D28D9]/30 text-[#6D28D9] hover:bg-[#2D1B69] hover:text-white"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0D0D0D] border border-[#2D1B69]">
                <DialogHeader>
                  <DialogTitle className="text-[#6D28D9]">Admin Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Demo Mode Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Demo Mode</h4>
                      <p className="text-sm text-gray-400">Use mock data instead of blockchain data</p>
                    </div>
                    <Switch
                      id="settings-demo-mode"
                      checked={isDemoMode}
                      onCheckedChange={handleDemoToggle}
                      className="data-[state=checked]:bg-[#6D28D9]"
                    />
                  </div>
                  
                  {/* Divider */}
                  <div className="h-px bg-[#2D1B69]"></div>
                  
                  {/* System Status */}
                  <div>
                    <h4 className="text-white font-medium mb-3">System Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">API Server</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-green-400">Online</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">Blockchain</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                          <span className={isDemoMode ? 'text-yellow-400' : 'text-green-400'}>
                            {isDemoMode ? 'Simulated' : 'Connected'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Network className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">Network</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                          <span className={isDemoMode ? 'text-yellow-400' : 'text-green-400'}>
                            {isDemoMode ? 'Simulated' : networkStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Refresh/Connect Button */}
                  <Button 
                    onClick={isDemoMode ? handleRefreshData : handleConnectToAPI} 
                    className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
                  >
                    {isDemoMode ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Demo Data
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4 mr-2" />
                        Connect to API
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              size="icon"
              className="border-[#6D28D9]/30 text-[#6D28D9] hover:bg-[#2D1B69] hover:text-white"
              onClick={isDemoMode ? handleRefreshData : handleConnectToAPI}
              disabled={isDataLoading}
              title={isDemoMode ? "Refresh Data" : "Connect to API"}
            >
              {isDemoMode ? (
                <RefreshCw className={`h-4 w-4 ${isDataLoading ? 'animate-spin' : ''}`} />
              ) : (
                <Link2 className={`h-4 w-4 ${isDataLoading ? 'animate-spin' : ''}`} />
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#6D28D9]/30 text-[#6D28D9] hover:bg-[#2D1B69] hover:text-white"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </div>
        
        {/* Tab buttons */}
        <div className="flex mb-4 border-b border-[#2D1B69] overflow-x-auto hide-scrollbar">
          <button
            className={`py-2 px-4 font-medium flex-shrink-0 ${
              activeTab === 'results'
                ? 'text-[#6D28D9] border-b-2 border-[#6D28D9]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('results')}
          >
            Election Results
          </button>
          <button
            className={`py-2 px-4 font-medium flex-shrink-0 ${
              activeTab === 'states'
                ? 'text-[#6D28D9] border-b-2 border-[#6D28D9]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('states')}
          >
            State-wise Data
          </button>
          <button
            className={`py-2 px-4 font-medium flex-shrink-0 ${
              activeTab === 'blockchain'
                ? 'text-[#6D28D9] border-b-2 border-[#6D28D9]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('blockchain')}
          >
            <span className="flex items-center gap-1">
              <Layers className="h-4 w-4" />
              Blockchain
            </span>
          </button>
          <button
            className={`py-2 px-4 font-medium flex-shrink-0 ${
              activeTab === 'map'
                ? 'text-[#6D28D9] border-b-2 border-[#6D28D9]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('map')}
          >
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              India Map
            </span>
          </button>
        </div>
        
        {/* Tab content */}
        <div className="mb-8">
          {activeTab === 'results' && (
            <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D]">
              <CardHeader>
                <CardTitle className="text-[#6D28D9]">Election Results</CardTitle>
                <CardDescription>Candidate vote counts and percentages</CardDescription>
              </CardHeader>
              <CardContent>
                {isDataLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-12 bg-[#15121E] rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-[#2D1B69]">
                        <tr>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Rank</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Candidate</th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">Party</th>
                          <th className="text-right py-3 px-4 text-gray-300 font-medium">Votes</th>
                          <th className="text-right py-3 px-4 text-gray-300 font-medium">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {voteResults.map((result, index) => {
                          // Use the appropriate candidates array based on mode
                          const candidate = isDemoMode 
                            ? mockCandidates.find(c => c.id === result.candidateId)
                            : indianPMCandidates.find(c => c.id === result.candidateId);
                          return (
                            <tr key={result.candidateId} className="border-b border-[#2D1B69]/40">
                              <td className="py-3 px-4 text-gray-300">
                                {index === 0 ? (
                                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6D28D9]/20 text-[#9F7AEA] text-sm">
                                    {index + 1}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">{index + 1}</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-white">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img 
                                      src={candidate?.image} 
                                      alt={candidate?.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span>{candidate?.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-gray-300">{candidate?.party}</td>
                              <td className="py-3 px-4 text-right text-white">{result.votes.toLocaleString()}</td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="w-16 h-2 bg-[#15121E] rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-[#6D28D9]" 
                                      style={{ width: `${result.percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-white">{result.percentage}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'states' && (
            <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D]">
              <CardHeader>
                <CardTitle className="text-[#6D28D9]">State-wise Voting</CardTitle>
                <CardDescription>Distribution of votes by state</CardDescription>
              </CardHeader>
              <CardContent>
                {isDataLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 bg-[#15121E] rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(isDemoMode ? stateVotes : indiaStateVotes).sort((a, b) => b.votes - a.votes).map((state) => (
                      <div key={state.state} className="flex items-center space-x-4">
                        <div className="w-24 text-white font-medium">{state.state}</div>
                        <div className="flex-1">
                          <div className="w-full h-8 bg-[#15121E] rounded-lg overflow-hidden relative">
                            <div 
                              className="absolute inset-0 bg-[#6D28D9] opacity-20"
                              style={{ width: `${state.percentage}%` }}
                            ></div>
                            <div className="absolute inset-y-0 left-0 bg-[#6D28D9]" style={{ width: `${state.percentage}%` }}></div>
                            <div className="absolute inset-0 flex items-center px-3 justify-between">
                              <span className="text-white font-medium">{state.votes.toLocaleString()} votes</span>
                              <span className="text-white font-medium">{state.percentage}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 text-sm text-gray-400">
                      <div className="flex justify-between items-center">
                        <span>Highest voting state: <span className="text-white font-medium">{(isDemoMode ? stateVotes : indiaStateVotes).sort((a, b) => b.votes - a.votes)[0].state}</span></span>
                        <span>Total votes: <span className="text-white font-medium">{(isDemoMode ? stateVotes : indiaStateVotes).reduce((sum, state) => sum + state.votes, 0).toLocaleString()}</span></span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'blockchain' && (
            isDataLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-[#15121E] rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <BlockchainExplorer 
                chain={blockchainData.chain}
                isValid={blockchainData.isValid}
                totalVotes={blockchainData.totalVotes}
              />
            )
          )}

          {activeTab === 'map' && (
            <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D]">
              <CardHeader>
                <CardTitle className="text-[#6D28D9]">India Voting Map</CardTitle>
                <CardDescription>Interactive geographical distribution of votes across India</CardDescription>
              </CardHeader>
              <CardContent>
                {isDataLoading ? (
                  <div className="h-[500px] bg-[#15121E] rounded animate-pulse"></div>
                ) : (
                  <IndiaMap />
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        {!isDemoMode && showingSimulatedData && !isAPIConnected && (
          <div className="mb-6 p-3 rounded-md bg-yellow-500/10 border border-yellow-500/30 text-yellow-500">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Not connected to blockchain</p>
                <p className="text-sm">Click "Connect to API" button to view live blockchain data.</p>
              </div>
            </div>
          </div>
        )}

        {!isDemoMode && isAPIConnected && (
          <div className="mb-6 p-3 rounded-md bg-green-500/10 border border-green-500/30 text-green-500">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Connected to local blockchain</p>
                <p className="text-sm">Showing real-time voting data from your browser's blockchain.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
