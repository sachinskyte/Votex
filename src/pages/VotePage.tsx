import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import VoteOption from '@/components/VoteOption';
import { electionAPI, votingAPI } from '@/services/api';
import useDemoMode from '@/hooks/useDemoMode';

// Mock candidates data
const mockCandidates = [
  {
    id: 1,
    name: "Narendra Modi",
    party: "Bharatiya Janata Party (BJP)",
    bio: "Current Prime Minister seeking re-election, known for economic reforms and strong foreign policy initiatives."
  },
  {
    id: 2,
    name: "Rahul Gandhi",
    party: "Indian National Congress (INC)",
    bio: "Leader of opposition with focus on inclusive growth, farmer welfare, and strengthening democratic institutions."
  },
  {
    id: 3,
    name: "Mamata Banerjee",
    party: "All India Trinamool Congress",
    bio: "Experienced state leader known for welfare schemes and grassroots mobilization strategies."
  },
  {
    id: 4,
    name: "Arvind Kejriwal",
    party: "Aam Aadmi Party (AAP)",
    bio: "Anti-corruption crusader with focus on education, healthcare, and governance reforms."
  },
  {
    id: 5,
    name: "Yogi Adityanath",
    party: "Bharatiya Janata Party (BJP)",
    bio: "State leader known for infrastructure development and law enforcement initiatives."
  },
  {
    id: 6,
    name: "Mayawati",
    party: "Bahujan Samaj Party (BSP)",
    bio: "Champion of social justice and advocate for marginalized communities across India."
  },
  {
    id: 7,
    name: "Sharad Pawar",
    party: "Nationalist Congress Party (NCP)",
    bio: "Veteran politician with extensive experience in agriculture policy and coalition politics."
  },
  {
    id: 8,
    name: "Akhilesh Yadav",
    party: "Samajwadi Party",
    bio: "Former state leader focusing on youth empowerment, technology, and modern infrastructure."
  },
  {
    id: 9,
    name: "Asaduddin Owaisi",
    party: "All India Majlis-e-Ittehadul Muslimeen (AIMIM)",
    bio: "Constitutional expert advocating for minority rights and equitable development."
  },
  {
    id: 10,
    name: "Nirmala Sitharaman",
    party: "Bharatiya Janata Party (BJP)",
    bio: "Economic policy expert with experience in finance, defense, and international relations."
  }
];

interface Candidate {
  id: number;
  name: string;
  party: string;
  bio: string;
}

const VotePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const electionId = searchParams.get('electionId') || '1'; // Default to 1 if not provided
  const { isDemoMode } = useDemoMode();
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [electionTitle, setElectionTitle] = useState('Indian Prime Minister General Election 2025');
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState('');
  const [voterId, setVoterId] = useState(''); 
  const [voteId, setVoteId] = useState('');
  const [blockHash, setBlockHash] = useState('');
  
  useEffect(() => {
    // Get voter ID from localStorage
    const storedVoterId = localStorage.getItem('voterId');
    if (storedVoterId) {
      setVoterId(storedVoterId);
    } else {
      // If no voter ID, redirect to verification
      toast({
        title: "Authentication Required",
        description: "Please verify your identity before voting",
        variant: "destructive",
      });
      navigate('/verify');
      return;
    }
    
    const fetchCandidates = async () => {
      try {
        if (isDemoMode) {
          // Use mock data in demo mode
          setCandidates(mockCandidates);
          setElectionTitle("Indian Prime Minister General Election 2025");
          setIsLoading(false);
          return;
        }
        
        const response = await electionAPI.getCandidates(Number(electionId));
        if (response.success && response.data) {
          setCandidates(response.data.candidates);
          
          // Get election title
          const electionsResponse = await electionAPI.getElections();
          if (electionsResponse.success && electionsResponse.data?.elections) {
            const election = electionsResponse.data.elections.find(
              (e: any) => e.id === Number(electionId)
            );
            if (election) {
              setElectionTitle(election.title);
            }
          }
        } else {
          setError('Failed to load candidates');
          
          // Fallback to demo mode
          setCandidates(mockCandidates);
          setElectionTitle("Indian Prime Minister General Election 2025");
        }
      } catch (err) {
        setError('An error occurred while fetching candidates. Using demo data instead.');
        
        // Fallback to demo mode
        setCandidates(mockCandidates);
        setElectionTitle("Indian Prime Minister General Election 2025");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCandidates();
    
    // Check if user has already voted
    const storedVoteStatus = localStorage.getItem('vote-status');
    if (storedVoteStatus) {
      const voteStatus = JSON.parse(storedVoteStatus);
      if (voteStatus.voted && voteStatus.election_id === Number(electionId)) {
        setHasVoted(true);
        setVoteId(`VOTE-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    }
  }, [electionId, isDemoMode, navigate, toast]);
  
  const handleSelectCandidate = (id: string) => {
    setSelectedCandidate(Number(id));
  };
  
  const handleSubmitVote = async () => {
    if (!selectedCandidate) {
      toast({
        title: 'Selection Required',
        description: 'Please select a candidate before submitting your vote.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await votingAPI.castVote({
        voter_id: voterId,
        election_id: Number(electionId),
        candidate_id: selectedCandidate
      });
      
      if (response.success) {
        setHasVoted(true);
        // Get vote ID and block hash from the response
        setVoteId(response.data?.vote_id || `VOTE-${Math.floor(100000 + Math.random() * 900000)}`);
        setBlockHash(response.data?.block_hash || '');
        
        // Store vote status in localStorage
        localStorage.setItem('vote-status', JSON.stringify({
          voted: true,
          election_id: Number(electionId),
          candidate_id: selectedCandidate
        }));
        
        toast({
          title: 'Vote Recorded',
          description: 'Your vote has been successfully submitted and recorded on the blockchain.',
        });
      } else {
        toast({
          title: 'Vote Failed',
          description: response.message || 'Failed to submit your vote. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An error occurred while submitting your vote.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#6D28D9]/20 border-t-[#6D28D9] rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {hasVoted ? (
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-[#6D28D9]/10 p-6 rounded-full border border-[#6D28D9]/30">
                <CheckCircle className="h-16 w-16 text-[#6D28D9]" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-[#6D28D9] animate-pulse">Vote Successfully Recorded</h1>
            <p className="text-gray-400 mb-8">
              Thank you for participating in the democratic process. Your vote has been securely recorded.
            </p>
            
            <Card className="p-6 mb-8 border border-[#6D28D9]/30 bg-black/40 shadow-[0_0_10px_rgba(109,40,217,0.2)]">
              <h2 className="text-xl font-semibold mb-4 text-[#6D28D9]">Vote Receipt</h2>
              <div className="text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Election</span>
                  <span className="font-medium text-[#6D28D9]">{electionTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="font-medium text-white">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time</span>
                  <span className="font-medium text-white">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vote ID</span>
                  <span className="font-medium text-white">{voteId}</span>
                </div>
                {blockHash && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Database className="h-3 w-3" /> Blockchain Hash
                    </span>
                    <span className="font-medium text-[#9F7AEA]">{blockHash}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-[#6D28D9] font-medium">Confirmed</span>
                </div>
              </div>
            </Card>
            
            <Button 
              onClick={handleReturnToDashboard}
              className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
            >
              Return to Dashboard
            </Button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#6D28D9]">Cast Your Vote</h1>
              <p className="text-gray-400 mt-2">
                Select one candidate for {electionTitle}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Card className="p-6 md:p-8 border border-[#6D28D9]/30 bg-black/40 shadow-[0_0_10px_rgba(109,40,217,0.2)]">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-[#6D28D9] bg-black/60 p-3 rounded border border-[#6D28D9]/20">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">
                      Your vote is anonymous and secure. Once submitted, it cannot be changed.
                    </p>
                  </div>
                </div>
                
                {error && (
                  <div className="mb-6 bg-destructive/20 text-destructive p-3 rounded-md">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4 mb-8">
                  <h2 className="text-xl font-semibold text-[#6D28D9]">Select Your Candidate</h2>
                  
                  <div className="space-y-3">
                    {candidates.map((candidate) => (
                      <VoteOption
                        key={candidate.id}
                        id={String(candidate.id)}
                        name={`${candidate.name} - ${candidate.party}`}
                        description={candidate.bio}
                        selected={selectedCandidate === candidate.id}
                        onSelect={handleSelectCandidate}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitVote}
                    className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
                    disabled={isSubmitting || !selectedCandidate}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-black border-opacity-50 border-t-black rounded-full"></div>
                        Submitting...
                      </span>
                    ) : (
                      'Submit My Vote'
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VotePage;
