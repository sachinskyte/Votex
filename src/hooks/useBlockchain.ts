import { useState, useEffect } from 'react';
import { blockchainAPI } from '@/services/api';
import { toast } from "@/hooks/use-toast";
import useDemoMode from './useDemoMode';
import blockchainService from '@/services/blockchainService';

interface BlockchainStatus {
  status: string;
  lastBlock: string;
  transactions: number;
  isLoading: boolean;
  error: string | null;
}

// Demo data for blockchain
const demoBlockchainData = {
  status: 'Active',
  lastBlock: '0x8a7f1e3b4c...92d5',
  transactions: 4281,
  isLoading: false,
  error: null
};

export function useBlockchain() {
  const [blockchainStatus, setBlockchainStatus] = useState<BlockchainStatus>({
    status: 'Unknown',
    lastBlock: '-',
    transactions: 0,
    isLoading: true,
    error: null
  });
  const { isDemoMode } = useDemoMode();

  const fetchBlockchainStatus = async () => {
    // If demo mode is enabled, return demo data
    if (isDemoMode) {
      setBlockchainStatus(demoBlockchainData);
      return;
    }
    
    setBlockchainStatus(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await blockchainAPI.getNetworkStatus();
      
      if (response.success && response.data) {
        setBlockchainStatus({
          status: response.data.status,
          lastBlock: response.data.lastBlock,
          transactions: response.data.transactions,
          isLoading: false,
          error: null
        });
      } else {
        // If API call fails, use local blockchain data
        const chain = blockchainService.getChain();
        const lastBlock = chain[chain.length - 1];
        const totalVotes = blockchainService.getTotalVotes();
        
        setBlockchainStatus({
          status: 'Local',
          lastBlock: lastBlock.hash.substring(0, 10) + '...',
          transactions: totalVotes,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      // On error, use local blockchain data instead of showing error
      const chain = blockchainService.getChain();
      const lastBlock = chain[chain.length - 1];
      const totalVotes = blockchainService.getTotalVotes();
      
      setBlockchainStatus({
        status: 'Local',
        lastBlock: lastBlock.hash.substring(0, 10) + '...',
        transactions: totalVotes,
        isLoading: false,
        error: null
      });
    }
  };

  useEffect(() => {
    fetchBlockchainStatus();
    
    // Poll for blockchain status every 30 seconds if not in demo mode
    if (!isDemoMode) {
      const intervalId = setInterval(fetchBlockchainStatus, 30000);
      return () => clearInterval(intervalId);
    }
  }, [isDemoMode]);

  return {
    ...blockchainStatus,
    refreshStatus: fetchBlockchainStatus
  };
}

export default useBlockchain;
