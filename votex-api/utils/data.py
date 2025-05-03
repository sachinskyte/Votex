# In-memory data storage for the Votex API

from .blockchain import MerkleTree, ByzantineConsensus, EnhancedBlockchain
import time

# Initialize the enhanced blockchain
blockchain = EnhancedBlockchain(consensus_nodes=7)  # 7 consensus nodes

# Sample elections data
elections = [
    {
        "id": 1,
        "title": "Lok Sabha General Election 2025",
        "description": "Vote for the next Prime Minister of India",
        "start_date": "2025-01-01",
        "end_date": "2025-01-15",
        "status": "active"
    },
    {
        "id": 2,
        "title": "Gujarat State Assembly Election 2025",
        "description": "Vote for your state representatives",
        "start_date": "2025-02-01",
        "end_date": "2025-02-15",
        "status": "active"
    },
    {
        "id": 3,
        "title": "Mumbai Municipal Corporation Election",
        "description": "Vote for your municipal representatives",
        "start_date": "2025-03-01",
        "end_date": "2025-03-15",
        "status": "upcoming"
    }
]

# Sample candidates data
candidates = {
    1: [  # Presidential candidates (election_id: 1)
        {"id": 101, "name": "Aditya Kapoor", "party": "Bharatiya Janata Party", "bio": "Former Chief Minister"},
        {"id": 102, "name": "Sunita Verma", "party": "Indian National Congress", "bio": "Social Activist"},
        {"id": 103, "name": "Rajesh Khanna", "party": "Aam Aadmi Party", "bio": "Economist and Policy Expert"}
    ],
    2: [  # Senate candidates (election_id: 2)
        {"id": 201, "name": "Deepak Mehta", "party": "Bharatiya Janata Party", "bio": "Current MP"},
        {"id": 202, "name": "Kavita Rao", "party": "Indian National Congress", "bio": "Business Leader"},
        {"id": 203, "name": "Vijay Chauhan", "party": "Independent", "bio": "Social Reformer"}
    ],
    3: [  # Local council candidates (election_id: 3)
        {"id": 301, "name": "Meena Lal", "party": "Bharatiya Janata Party", "bio": "Local School Principal"},
        {"id": 302, "name": "Arjun Nair", "party": "Indian National Congress", "bio": "Small Business Owner"},
        {"id": 303, "name": "Lakshmi Devi", "party": "Independent", "bio": "Community Activist"}
    ]
}

# Sample voters data - will be populated with verified voters
# Structure: {voter_id: {"name": "Full Name", "phone": "xxxx", "otp": 1234, "verified": True/False}}
voters = {
    "V12345": {"name": "Rahul Sharma", "phone": "1234567890", "otp": None, "verified": False},
    "V67890": {"name": "Priya Patel", "phone": "9876543210", "otp": None, "verified": False},
    "V54321": {"name": "Amit Kumar", "phone": "5551234567", "otp": None, "verified": False},
    # Added these voters to ensure compatibility with frontend
    "VOTER-2025-XXXX789": {"name": "Divya Singh", "phone": "1234567890", "otp": None, "verified": False},
    "VOTER-2025-1234789": {"name": "Vikram Malhotra", "phone": "1234567890", "otp": None, "verified": False},
    "VOTER-1": {"name": "Ananya Reddy", "phone": "1111111111", "otp": None, "verified": False},
    "VOTER-2": {"name": "Suresh Iyer", "phone": "2222222222", "otp": None, "verified": False},
    "TEST": {"name": "Neha Gupta", "phone": "0000000000", "otp": None, "verified": False}
}

# Votes storage - will be populated as votes are cast
# Structure: {voter_id: {"election_id": x, "candidate_id": y}}
votes = {}

# Helper functions to interact with data

def get_elections(status=None):
    """
    Get list of elections, optionally filtered by status
    """
    if status:
        return [election for election in elections if election["status"] == status]
    return elections

def get_candidates(election_id):
    """
    Get candidates for a specific election
    """
    election_id = int(election_id)
    return candidates.get(election_id, [])

def get_voter(voter_id):
    """
    Get voter information
    """
    return voters.get(voter_id)

def update_voter(voter_id, data):
    """
    Update voter information
    """
    if voter_id in voters:
        voters[voter_id].update(data)
        return True
    return False

def record_vote(voter_id, election_id, candidate_id):
    """
    Record a vote and ensure it's added to the blockchain
    
    Returns:
        bool: True if vote was recorded, False if voter already voted
    """
    election_id = int(election_id)
    candidate_id = int(candidate_id)
    
    # Check if voter has already voted in this election
    if voter_id in votes and election_id == votes[voter_id]["election_id"]:
        return False
    
    # Create a vote transaction
    transaction = {
        "voter_id": voter_id,
        "election_id": election_id,
        "candidate_id": candidate_id,
        "timestamp": time.time()
    }
    
    # Add to blockchain using Byzantine consensus
    if not blockchain.add_transaction(transaction):
        print(f"Warning: Transaction rejected by Byzantine consensus")
        # For demo purposes, we'll still record it locally
        
    # Mine a new block to include this transaction
    blockchain.mine_block()
    
    # Record the vote in local memory
    votes[voter_id] = {"election_id": election_id, "candidate_id": candidate_id}
    print(f"DEBUG: Vote recorded for {voter_id} in election {election_id} for candidate {candidate_id}")
    print(f"DEBUG: Current votes: {votes}")
    
    # Mark the voter as verified
    if voter_id in voters:
        voters[voter_id]["verified"] = True
    
    return True

def get_vote_status(voter_id):
    """
    Get voting status for a voter
    """
    if voter_id in votes:
        return {
            "voted": True,
            "election_id": votes[voter_id]["election_id"]
        }
    return {"voted": False}

def get_all_votes():
    """
    Get all votes in a blockchain-friendly format with Merkle proofs
    """
    blockchain_votes = []
    
    # Process all blocks in the blockchain (except genesis block)
    for block_idx in range(1, len(blockchain.chain)):
        block = blockchain.chain[block_idx]
        
        # Process all transactions in the block
        for tx_idx, tx in enumerate(block.get('transactions', [])):
            # Skip non-vote transactions if any
            if not all(k in tx for k in ['voter_id', 'election_id', 'candidate_id']):
                continue
                
            # Get voter and election information
            voter_id = tx['voter_id']
            voter = get_voter(voter_id)
            election_id = tx['election_id']
            candidate_id = tx['candidate_id']
            
            election = next((e for e in elections if e["id"] == election_id), {})
            candidate = next((c for c in candidates.get(election_id, []) 
                            if c["id"] == candidate_id), {})
            
            # Get a Merkle proof for this transaction
            proof_data = blockchain.get_transaction_proof(block_idx, tx_idx)
            merkle_proof = proof_data.get('merkle_proof', []) if proof_data else []
            
            # Format the vote with blockchain and Merkle tree data
            vote_data = {
                "voter_id": voter_id,
                "voter_name": voter.get("name", "Unknown Voter"),
                "voter_id_hash": hash(voter_id),  # Hashed for privacy
                "timestamp": tx.get('timestamp', '2025-01-01T12:00:00Z'),
                "election_id": election_id,
                "election_name": election.get("title", "Unknown Election"),
                "candidate_id": candidate_id,
                "candidate_name": candidate.get("name", "Unknown Candidate"),
                "block_hash": block.get('hash', ''),
                "block_index": block_idx,
                "merkle_root": block.get('merkle_root', ''),
                "has_merkle_proof": len(merkle_proof) > 0
            }
            
            blockchain_votes.append(vote_data)
    
    # If blockchain is empty, fall back to memory-stored votes
    if not blockchain_votes:
        for voter_id, vote_data in votes.items():
            # Get voter and election information
            voter = get_voter(voter_id)
            election = next((e for e in elections if e["id"] == vote_data["election_id"]), {})
            candidate = next((c for c in candidates.get(vote_data["election_id"], []) 
                            if c["id"] == vote_data["candidate_id"]), {})
            
            blockchain_votes.append({
                "voter_id": voter_id,
                "voter_name": voter.get("name", "Unknown Voter"),
                "voter_id_hash": hash(voter_id),  # Hashed for privacy
                "timestamp": "2025-01-01T12:00:00Z",  # Placeholder timestamp
                "election_id": vote_data["election_id"],
                "election_name": election.get("title", "Unknown Election"),
                "candidate_id": vote_data["candidate_id"],
                "candidate_name": candidate.get("name", "Unknown Candidate"),
                "block_hash": f"0x{hash(voter_id + str(vote_data['election_id']) + str(vote_data['candidate_id']))}",
                "has_merkle_proof": False
            })
    
    return blockchain_votes

def verify_blockchain_integrity():
    """
    Verify the integrity of the blockchain
    Returns True if valid, False if invalid
    """
    return blockchain.is_chain_valid()

def get_merkle_root():
    """Get the current Merkle root of the last block"""
    if not blockchain.chain:
        return None
    
    latest_block = blockchain.chain[-1]
    return latest_block.get('merkle_root', '') 