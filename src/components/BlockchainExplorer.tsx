import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Block } from '@/services/blockchainService';
import { Database, CheckCircle, XCircle, ChevronDown, ChevronUp, Clock, Hash, User, FileText } from 'lucide-react';

// Add candidate mapping for display purposes
const candidateNames: Record<number, string> = {
  1: "Narendra Modi (BJP)",
  2: "Rahul Gandhi (INC)",
  3: "Mamata Banerjee (TMC)",
  4: "Arvind Kejriwal (AAP)",
  5: "Yogi Adityanath (BJP)",
  6: "Mayawati (BSP)",
  7: "Sharad Pawar (NCP)",
  8: "Akhilesh Yadav (SP)",
  9: "Asaduddin Owaisi (AIMIM)",
  10: "Nirmala Sitharaman (BJP)"
};

interface BlockchainExplorerProps {
  chain: Block[];
  isValid: boolean;
  totalVotes: number;
}

const BlockchainExplorer: React.FC<BlockchainExplorerProps> = ({ chain, isValid, totalVotes }) => {
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  
  const toggleBlock = (index: number) => {
    if (expandedBlock === index) {
      setExpandedBlock(null);
    } else {
      setExpandedBlock(index);
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const shortenHash = (hash: string) => {
    if (hash.length <= 16) return hash;
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  const getCandidateName = (candidateId: number): string => {
    return candidateNames[candidateId] || `Unknown Candidate #${candidateId}`;
  };

  return (
    <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[#6D28D9] flex items-center gap-2">
              <Database className="h-5 w-5" />
              Blockchain Explorer
            </CardTitle>
            <CardDescription>
              View all vote transactions on the blockchain
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isValid ? "default" : "destructive"} className={isValid ? "bg-green-500" : "bg-red-500"}>
              {isValid ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Chain Valid
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Chain Invalid
                </span>
              )}
            </Badge>
            <Badge className="bg-[#6D28D9]">
              {totalVotes} Votes
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {chain.map((block, index) => (
            <div 
              key={block.hash} 
              className={`border rounded-md transition-all ${
                expandedBlock === index 
                  ? 'border-[#6D28D9] bg-[#0D0D0D]' 
                  : 'border-[#2D1B69] bg-[#15121E]/50'
              }`}
            >
              {/* Block header - always visible */}
              <div 
                className="p-3 flex items-center justify-between cursor-pointer"
                onClick={() => toggleBlock(index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 flex items-center justify-center rounded-md
                    ${index === 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-[#6D28D9]/20 text-[#9F7AEA]'}
                  `}>
                    {index}
                  </div>
                  <div>
                    <div className="text-white font-medium flex items-center">
                      {index === 0 ? 'Genesis Block' : `Block #${index}`}
                      {block.verified && (
                        <CheckCircle className="h-3 w-3 ml-2 text-green-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      Hash: {shortenHash(block.hash)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-400">
                    {formatTimestamp(block.timestamp)}
                  </div>
                  {expandedBlock === index ? (
                    <ChevronUp className="h-4 w-4 text-[#6D28D9]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Expanded block details */}
              {expandedBlock === index && (
                <div className="p-4 border-t border-[#2D1B69] text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Hash className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-400">Block Hash</div>
                          <div className="font-mono text-xs break-all text-white">{block.hash}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Hash className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-400">Previous Hash</div>
                          <div className="font-mono text-xs break-all text-white">{block.previous_hash}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-400">Timestamp</div>
                          <div className="text-white">{formatTimestamp(block.timestamp)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-400">Voter Hash (Anonymized)</div>
                          <div className="font-mono text-xs break-all text-white">{block.voter_hash.substring(0, 10)}...{block.voter_hash.substring(block.voter_hash.length - 10)}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-400">Election</div>
                          <div className="text-white">{block.election_id.replace('election_', 'Indian PM Election 2025 #')}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-400">Vote Cast For</div>
                          <div className="text-white">
                            {block.candidate_id.startsWith('candidate_') ? (
                              <>
                                Candidate #{block.candidate_id.replace('candidate_', '')} - 
                                {getCandidateName(parseInt(block.candidate_id.replace('candidate_', '')))}
                              </>
                            ) : (
                              block.candidate_id
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainExplorer; 