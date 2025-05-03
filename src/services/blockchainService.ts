import CryptoJS from 'crypto-js';

// Block interface
export interface Block {
  index: number;
  timestamp: string;
  voter_hash: string;
  election_id: string;
  candidate_id: string;
  verified: boolean;
  previous_hash: string;
  hash: string;
}

// Vote data interface
export interface VoteData {
  voter_id: string;
  phone_number: string; 
  election_id: string;
  candidate_id: string;
}

class BlockchainService {
  private chain: Block[] = [];
  
  constructor() {
    // Create genesis block if the chain is empty
    if (this.chain.length === 0) {
      this.createGenesisBlock();
    } else {
      // Load from localStorage if available
      this.loadFromStorage();
    }
  }
  
  // Create the first block in the chain
  private createGenesisBlock(): void {
    const genesisBlock: Block = {
      index: 0,
      timestamp: new Date().toISOString(),
      voter_hash: '0',
      election_id: 'genesis',
      candidate_id: 'genesis',
      verified: true,
      previous_hash: '0',
      hash: '0000GENESIS0000'
    };
    
    this.chain.push(genesisBlock);
    this.saveToStorage();
  }
  
  // Get the latest block in the chain
  private getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
  
  // Calculate hash for a block
  private calculateHash(
    index: number,
    timestamp: string,
    voter_hash: string,
    election_id: string,
    candidate_id: string,
    verified: boolean,
    previous_hash: string
  ): string {
    return CryptoJS.SHA256(
      index +
      timestamp +
      voter_hash +
      election_id +
      candidate_id +
      verified +
      previous_hash
    ).toString(CryptoJS.enc.Hex);
  }
  
  // Create voter hash to anonymize personally identifiable information
  private createVoterHash(voter_id: string, phone_number: string): string {
    return CryptoJS.SHA256(voter_id + phone_number).toString(CryptoJS.enc.Hex);
  }
  
  // Add a new vote block to the chain
  public addVote(voteData: VoteData): Block {
    const { voter_id, phone_number, election_id, candidate_id } = voteData;
    
    const previousBlock = this.getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const timestamp = new Date().toISOString();
    const voter_hash = this.createVoterHash(voter_id, phone_number);
    const previous_hash = previousBlock.hash;
    const verified = true;
    
    const hash = this.calculateHash(
      newIndex,
      timestamp,
      voter_hash,
      election_id,
      candidate_id,
      verified,
      previous_hash
    );
    
    const newBlock: Block = {
      index: newIndex,
      timestamp,
      voter_hash,
      election_id,
      candidate_id,
      verified,
      previous_hash,
      hash
    };
    
    this.chain.push(newBlock);
    this.saveToStorage();
    
    return newBlock;
  }
  
  // Verify the integrity of the blockchain
  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      
      // Verify current block's hash is correct
      if (currentBlock.hash !== this.calculateHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.voter_hash,
        currentBlock.election_id,
        currentBlock.candidate_id,
        currentBlock.verified,
        currentBlock.previous_hash
      )) {
        return false;
      }
      
      // Verify previous hash reference
      if (currentBlock.previous_hash !== previousBlock.hash) {
        return false;
      }
    }
    
    return true;
  }
  
  // Check if a voter has already voted in this election
  public hasVoted(voter_id: string, phone_number: string, election_id: string): boolean {
    const voter_hash = this.createVoterHash(voter_id, phone_number);
    
    return this.chain.some(block => 
      block.voter_hash === voter_hash && 
      block.election_id === election_id
    );
  }
  
  // Get all blocks in the chain
  public getChain(): Block[] {
    return this.chain;
  }
  
  // Get vote count for each candidate in an election
  public getElectionResults(election_id: string): Record<string, number> {
    const results: Record<string, number> = {};
    
    this.chain.forEach(block => {
      if (block.election_id === election_id && block.index > 0) {
        if (results[block.candidate_id]) {
          results[block.candidate_id]++;
        } else {
          results[block.candidate_id] = 1;
        }
      }
    });
    
    return results;
  }
  
  // Get total number of votes in the blockchain
  public getTotalVotes(): number {
    // Subtract 1 to exclude the genesis block
    return this.chain.length - 1;
  }
  
  // Save blockchain to localStorage
  private saveToStorage(): void {
    try {
      localStorage.setItem('voteChain', JSON.stringify(this.chain));
    } catch (error) {
      console.error('Failed to save blockchain to localStorage:', error);
    }
  }
  
  // Load blockchain from localStorage
  private loadFromStorage(): void {
    try {
      const storedChain = localStorage.getItem('voteChain');
      if (storedChain) {
        this.chain = JSON.parse(storedChain);
      } else {
        this.createGenesisBlock();
      }
    } catch (error) {
      console.error('Failed to load blockchain from localStorage:', error);
      this.createGenesisBlock();
    }
  }
  
  // Clear the blockchain (for testing/demo purposes)
  public resetChain(): void {
    this.chain = [];
    localStorage.removeItem('voteChain');
    localStorage.removeItem('vote-status');
    this.createGenesisBlock();
    console.log("Blockchain has been reset to genesis state");
  }
}

// Create and export a singleton instance
const blockchainService = new BlockchainService();
export default blockchainService; 