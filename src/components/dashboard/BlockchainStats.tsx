import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, RefreshCw, Clock, FileText, Shield, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import blockchainService from '@/services/blockchainService';

interface BlockchainStatsProps {
  refreshInterval?: number; // in milliseconds
}

const BlockchainStats: React.FC<BlockchainStatsProps> = ({ refreshInterval = 5000 }) => {
  const [stats, setStats] = useState({
    totalBlocks: 0,
    isValid: false,
    lastBlockTime: '',
    totalVotes: 0,
    networkNodes: 7, // Simulated number of nodes
    consensusStatus: 'Active'
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const fetchBlockchainStats = () => {
    setIsRefreshing(true);
    
    try {
      const chain = blockchainService.getChain();
      const isValid = blockchainService.isChainValid();
      const totalVotes = blockchainService.getTotalVotes();
      
      setStats({
        totalBlocks: chain.length,
        isValid,
        lastBlockTime: chain.length > 0 ? new Date(chain[chain.length - 1].timestamp).toLocaleString() : '-',
        totalVotes,
        networkNodes: 7, // Simulated number of nodes
        consensusStatus: isValid ? 'Active' : 'Error'
      });
    } catch (error) {
      console.error('Error fetching blockchain stats:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Initial fetch
  useEffect(() => {
    fetchBlockchainStats();
  }, []);
  
  // Set up periodic refresh
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBlockchainStats();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);
  
  return (
    <Card className="border border-[#6D28D9]/30 bg-[#0D0D0D] shadow-[0_0_10px_rgba(109,40,217,0.1)]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[#6D28D9] flex items-center text-lg">
          <Database className="h-5 w-5 mr-2" />
          Blockchain Network Stats
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
          onClick={fetchBlockchainStats}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-[#15121E] rounded-md p-3 border border-[#2D1B69]">
            <div className="text-gray-400 text-xs mb-1 flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Chain Status
            </div>
            <div className="flex items-center">
              <Badge variant={stats.isValid ? "default" : "destructive"} className={stats.isValid ? "bg-green-500/70" : "bg-red-500/70"}>
                {stats.isValid ? 'Valid' : 'Invalid'}
              </Badge>
            </div>
          </div>
          
          <div className="bg-[#15121E] rounded-md p-3 border border-[#2D1B69]">
            <div className="text-gray-400 text-xs mb-1 flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              Total Blocks
            </div>
            <div className="font-semibold text-lg text-white">
              {stats.totalBlocks}
            </div>
          </div>
          
          <div className="bg-[#15121E] rounded-md p-3 border border-[#2D1B69]">
            <div className="text-gray-400 text-xs mb-1 flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              Total Votes
            </div>
            <div className="font-semibold text-lg text-white">
              {stats.totalVotes}
            </div>
          </div>
          
          <div className="bg-[#15121E] rounded-md p-3 border border-[#2D1B69]">
            <div className="text-gray-400 text-xs mb-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last Activity
            </div>
            <div className="text-sm text-white truncate">
              {stats.lastBlockTime}
            </div>
          </div>
          
          <div className="bg-[#15121E] rounded-md p-3 border border-[#2D1B69]">
            <div className="text-gray-400 text-xs mb-1 flex items-center">
              <Network className="h-3 w-3 mr-1" />
              Network Nodes
            </div>
            <div className="font-semibold text-lg text-white">
              {stats.networkNodes}
            </div>
          </div>
          
          <div className="bg-[#15121E] rounded-md p-3 border border-[#2D1B69]">
            <div className="text-gray-400 text-xs mb-1 flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Consensus
            </div>
            <div className="flex items-center">
              <Badge variant={stats.consensusStatus === 'Active' ? "default" : "destructive"} className={stats.consensusStatus === 'Active' ? "bg-[#6D28D9]" : "bg-red-500/70"}>
                {stats.consensusStatus}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainStats; 