import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import { votingAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Search, ArrowLeft, CheckCircle, UserPlus } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  party: string;
  bio: string;
  image: string;
}

// Mock data for Indian PM Election candidates
const mockCandidates: Candidate[] = [
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

const Candidates = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [voterId, setVoterId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get voter ID from localStorage on component mount
  useEffect(() => {
    const storedVoterId = localStorage.getItem('voterId');
    if (storedVoterId) {
      setVoterId(storedVoterId);
    } else {
      toast({
        title: "Authentication Required",
        description: "Please verify your identity before voting",
        variant: "destructive",
      });
      navigate('/verify');
    }
    
    // For demo purposes, use mock data
    setCandidates(mockCandidates);
    setFilteredCandidates(mockCandidates);
    setLoading(false);
  }, [navigate, toast]);
  
  // Handle search functionality
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCandidates(candidates);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = candidates.filter(
      candidate => 
        candidate.name.toLowerCase().includes(query) || 
        candidate.party.toLowerCase().includes(query)
    );
    
    setFilteredCandidates(filtered);
  }, [searchQuery, candidates]);
  
  const handleSelectCandidate = (candidateId: number) => {
    setSelectedCandidate(candidateId);
  };
  
  const handleVote = async () => {
    if (!selectedCandidate || !electionId || !voterId) return;
    
    setIsSubmitting(true);
    
    try {
      // Use real voting API
      const response = await votingAPI.castVote({
        voter_id: voterId,
        election_id: Number(electionId),
        candidate_id: selectedCandidate
      });
      
      if (response.success) {
        // Store vote status in localStorage
        localStorage.setItem('vote-status', JSON.stringify({
          voted: true,
          election_id: Number(electionId),
          candidate_id: selectedCandidate
        }));
        
        toast({
          title: "Vote Cast Successfully",
          description: "Your vote has been recorded on the blockchain.",
        });
        navigate('/dashboard');
      } else {
        setError(response.message || 'Failed to cast vote');
      }
    } catch (err) {
      console.error("Error casting vote:", err);
      setError('An error occurred while casting your vote');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#6D28D9]/20 border-t-[#6D28D9] rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#9F7AEA] bg-clip-text text-transparent">
            Indian Prime Minister General Election 2025
          </h1>
          <p className="text-gray-400 mt-2">
            Select a candidate and cast your vote
          </p>
        </div>
        
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 bg-[#15121E] border-[#2D1B69] focus:border-[#6D28D9] focus:ring-[#6D28D9]"
              placeholder="Search by candidate name or party..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Showing {filteredCandidates.length} of {candidates.length} candidates
          </div>
        </div>
        
        {error && (
          <Card className="mb-6 border-destructive/50 bg-destructive/10">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCandidates.length === 0 ? (
            <div className="col-span-3 py-12 text-center">
              <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-medium text-gray-300 mb-2">No candidates found</h3>
              <p className="text-gray-400">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredCandidates.map((candidate) => (
              <Card 
                key={candidate.id}
                className={`cursor-pointer border transition-all relative ${
                  selectedCandidate === candidate.id 
                    ? 'border-[#6D28D9] shadow-[0_0_15px_rgba(109,40,217,0.3)]' 
                    : 'border-[#6D28D9]/30 hover:border-[#6D28D9]/60'
                } bg-[#0D0D0D]`}
                onClick={() => handleSelectCandidate(candidate.id)}
              >
                <div className="absolute top-4 right-4">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    selectedCandidate === candidate.id 
                      ? 'bg-[#6D28D9]' 
                      : 'border-2 border-[#6D28D9]/40 bg-[#15121E]'
                  }`}>
                    {selectedCandidate === candidate.id && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#2D1B69] flex-shrink-0">
                      <img 
                        src={candidate.image} 
                        alt={candidate.name} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        {candidate.name}
                      </CardTitle>
                      <CardDescription className="text-[#9F7AEA]">
                        {candidate.party}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{candidate.bio}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className={`w-full h-1 ${selectedCandidate === candidate.id ? 'bg-[#6D28D9]' : 'bg-transparent'} rounded-full`}></div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        
        <div className="flex justify-end">
          <Button 
            className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
            size="lg"
            disabled={!selectedCandidate || isSubmitting}
            onClick={handleVote}
          >
            {isSubmitting ? 'Casting Vote...' : 'Cast Your Vote'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Candidates; 