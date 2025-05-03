import hashlib
import time
import math
from typing import List, Dict, Any, Optional, Tuple


class MerkleTree:
    """
    Merkle Tree Implementation for efficient vote verification
    Time Complexity: O(n log n) for construction, O(log n) for verification
    Space Complexity: O(n)
    """
    def __init__(self, transactions: List[Dict[str, Any]]):
        self.transactions = transactions
        self.tree = self._build_tree()
        
    def _hash_data(self, data: str) -> str:
        """Hash data using SHA-256"""
        return hashlib.sha256(data.encode()).hexdigest()
    
    def _build_tree(self) -> List[List[str]]:
        """
        Build the Merkle tree from transactions
        Using a bottom-up approach with O(n log n) time complexity
        """
        # Base level with transaction hashes
        leaves = [self._hash_data(str(tx)) for tx in self.transactions]
        if not leaves:
            return [[self._hash_data("empty_tree")]]
            
        # Build the tree bottom-up
        tree = [leaves]
        level = leaves
        
        # Continue until we reach the root (a single hash)
        while len(level) > 1:
            next_level = []
            # Process pairs of nodes
            for i in range(0, len(level), 2):
                if i + 1 < len(level):
                    # Hash the pair together
                    combined_hash = self._hash_data(level[i] + level[i+1])
                    next_level.append(combined_hash)
                else:
                    # Odd number of elements, duplicate the last one
                    combined_hash = self._hash_data(level[i] + level[i])
                    next_level.append(combined_hash)
            level = next_level
            tree.append(level)
            
        return tree
    
    def get_root(self) -> str:
        """Get the Merkle root hash"""
        if not self.tree or not self.tree[-1]:
            return self._hash_data("empty_tree")
        return self.tree[-1][0]
    
    def get_proof(self, tx_index: int) -> List[Tuple[int, str]]:
        """
        Generate a Merkle proof for a transaction
        The proof is a list of (position, hash) pairs
        Position 0 means the hash is to the right, 1 means left
        Time Complexity: O(log n)
        """
        if tx_index < 0 or tx_index >= len(self.transactions):
            return []
            
        proof = []
        for i in range(len(self.tree) - 1):
            level = self.tree[i]
            # Determine if we need the left or right sibling
            is_right = tx_index % 2 == 0
            sibling_idx = tx_index + 1 if is_right else tx_index - 1
            
            # Handle edge case for odd number of nodes
            if sibling_idx < len(level):
                position = 0 if is_right else 1  # 0 for right, 1 for left
                proof.append((position, level[sibling_idx]))
            
            # Move up to the next level
            tx_index = tx_index // 2
            
        return proof
    
    def verify_proof(self, tx_hash: str, proof: List[Tuple[int, str]], root: str) -> bool:
        """
        Verify a transaction using its Merkle proof
        Time Complexity: O(log n)
        """
        current_hash = tx_hash
        
        for position, sibling_hash in proof:
            if position == 0:  # sibling is on the right
                current_hash = self._hash_data(current_hash + sibling_hash)
            else:  # sibling is on the left
                current_hash = self._hash_data(sibling_hash + current_hash)
                
        return current_hash == root


class ByzantineConsensus:
    """
    Simplified Byzantine Fault Tolerance algorithm for vote validation
    Simulates a distributed consensus with fault tolerance
    Tolerates f faulty nodes in a system with 3f+1 total nodes
    """
    def __init__(self, num_nodes: int = 10):
        self.num_nodes = num_nodes
        self.faulty_tolerance = (num_nodes - 1) // 3  # Maximum faulty nodes we can tolerate
        self.nodes = [Node(i) for i in range(num_nodes)]
        
    def validate_transaction(self, transaction: Dict[str, Any]) -> bool:
        """
        Simulates Byzantine consensus algorithm to validate a vote transaction
        Returns True if consensus is reached, False otherwise
        
        Time Complexity: O(n²) where n is the number of nodes
        """
        # Phase 1: Prepare phase - broadcast transaction to all nodes
        votes = []
        for node in self.nodes:
            # Each node independently validates and votes
            vote = node.validate_transaction(transaction)
            votes.append(vote)
            
        # Count the votes
        true_votes = sum(1 for vote in votes if vote)
        false_votes = len(votes) - true_votes
        
        # Check if we have 2f+1 matching votes (supermajority)
        required_consensus = 2 * self.faulty_tolerance + 1
        
        # Phase 2: Commit phase if consensus is reached
        if true_votes >= required_consensus:
            # Transaction is accepted
            for node in self.nodes:
                node.commit_transaction(transaction)
            return True
        elif false_votes >= required_consensus:
            # Transaction is rejected
            return False
        else:
            # No consensus reached - in a real system, we'd need additional phases
            # For simplicity, we'll reject the transaction
            return False
            
    def simulate_byzantine_behavior(self, faulty_nodes: int) -> None:
        """Simulate Byzantine (faulty) behavior in some nodes"""
        if faulty_nodes > self.faulty_tolerance:
            faulty_nodes = self.faulty_tolerance  # Cap at maximum tolerable
            
        # Mark some nodes as Byzantine (faulty)
        for i in range(faulty_nodes):
            self.nodes[i].set_byzantine(True)
            
    def reset_nodes(self) -> None:
        """Reset all nodes to non-Byzantine state"""
        for node in self.nodes:
            node.set_byzantine(False)
            node.clear_transactions()


class Node:
    """Represents a node in the Byzantine consensus algorithm"""
    def __init__(self, node_id: int):
        self.node_id = node_id
        self.is_byzantine = False
        self.committed_transactions = []
        
    def set_byzantine(self, state: bool) -> None:
        """Set whether this node behaves in a Byzantine (faulty) manner"""
        self.is_byzantine = state
        
    def validate_transaction(self, transaction: Dict[str, Any]) -> bool:
        """
        Validate a transaction
        Byzantine nodes may behave unpredictably - they may validate invalid transactions
        or invalidate valid ones
        """
        if self.is_byzantine:
            # Byzantine nodes behave unpredictably
            # They might randomly approve or reject regardless of validity
            return bool(hash(str(transaction) + str(self.node_id)) % 2)
        else:
            # Honest nodes perform proper validation
            # Here we check basic transaction properties
            return (
                'voter_id' in transaction and
                'election_id' in transaction and
                'candidate_id' in transaction and
                isinstance(transaction.get('timestamp'), (int, float, str))
            )
    
    def commit_transaction(self, transaction: Dict[str, Any]) -> None:
        """Add transaction to the list of committed transactions"""
        if not self.is_byzantine:
            # Only honest nodes actually commit transactions correctly
            self.committed_transactions.append(transaction)
            
    def clear_transactions(self) -> None:
        """Clear all committed transactions"""
        self.committed_transactions = []


class EnhancedBlockchain:
    """
    Enhanced blockchain implementation with Merkle trees and Byzantine consensus
    """
    def __init__(self, consensus_nodes: int = 7):
        self.chain = []
        self.pending_transactions = []
        self.create_genesis_block()
        self.merkle_tree = None
        self.consensus = ByzantineConsensus(consensus_nodes)
        
    def create_genesis_block(self) -> None:
        """Create the first block in the chain"""
        genesis_block = {
            'index': 0,
            'timestamp': time.time(),
            'transactions': [],
            'merkle_root': '',
            'previous_hash': '0',
            'nonce': 0,
            'hash': self._hash_block({
                'index': 0,
                'timestamp': time.time(),
                'transactions': [],
                'merkle_root': '',
                'previous_hash': '0',
                'nonce': 0
            })
        }
        self.chain.append(genesis_block)
        
    def _hash_block(self, block: Dict[str, Any]) -> str:
        """Create SHA-256 hash of a block"""
        block_string = str(block).encode()
        return hashlib.sha256(block_string).hexdigest()
        
    def get_latest_block(self) -> Dict[str, Any]:
        """Get the latest block in the blockchain"""
        return self.chain[-1]
        
    def add_transaction(self, transaction: Dict[str, Any]) -> bool:
        """
        Add a new transaction to pending transactions
        Uses Byzantine consensus to validate the transaction
        """
        # First, validate the transaction using Byzantine consensus
        if not self.consensus.validate_transaction(transaction):
            return False
            
        # If valid, add to pending transactions
        self.pending_transactions.append(transaction)
        return True
        
    def mine_block(self) -> Dict[str, Any]:
        """
        Mine a new block with pending transactions
        Implements a simplified Proof of Work
        """
        if not self.pending_transactions:
            return None
            
        # Create a Merkle tree from pending transactions
        self.merkle_tree = MerkleTree(self.pending_transactions)
        merkle_root = self.merkle_tree.get_root()
        
        latest_block = self.get_latest_block()
        new_block = {
            'index': latest_block['index'] + 1,
            'timestamp': time.time(),
            'transactions': self.pending_transactions,
            'merkle_root': merkle_root,
            'previous_hash': latest_block['hash'],
            'nonce': 0
        }
        
        # Simple proof of work - find a hash with leading zeros
        # In a real system, this would be much more difficult
        difficulty = 1  # Number of leading zeros required
        target = '0' * difficulty
        
        while True:
            block_hash = self._hash_block(new_block)
            if block_hash.startswith(target):
                break
            new_block['nonce'] += 1
            
        new_block['hash'] = block_hash
        self.chain.append(new_block)
        
        # Clear pending transactions
        self.pending_transactions = []
        
        return new_block
        
    def is_chain_valid(self) -> bool:
        """
        Validate the entire blockchain
        Checks hash integrity and Merkle roots
        """
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i-1]
            
            # Check hash integrity
            if current_block['previous_hash'] != previous_block['hash']:
                return False
                
            # Recalculate current block hash
            current_block_hash = self._hash_block({
                'index': current_block['index'],
                'timestamp': current_block['timestamp'],
                'transactions': current_block['transactions'],
                'merkle_root': current_block['merkle_root'],
                'previous_hash': current_block['previous_hash'],
                'nonce': current_block['nonce']
            })
            
            if current_block['hash'] != current_block_hash:
                return False
                
            # Verify Merkle root
            if current_block['transactions']:
                tree = MerkleTree(current_block['transactions'])
                if tree.get_root() != current_block['merkle_root']:
                    return False
                    
        return True
        
    def get_transaction_proof(self, block_index: int, tx_index: int) -> Dict[str, Any]:
        """
        Get a proof for a specific transaction
        Can be used to verify without downloading the entire blockchain
        """
        if block_index <= 0 or block_index >= len(self.chain):
            return None
            
        block = self.chain[block_index]
        if tx_index < 0 or tx_index >= len(block['transactions']):
            return None
            
        # Create a Merkle tree for the block's transactions
        tree = MerkleTree(block['transactions'])
        
        # Get the transaction and its hash
        transaction = block['transactions'][tx_index]
        tx_hash = hashlib.sha256(str(transaction).encode()).hexdigest()
        
        # Get the proof
        proof = tree.get_proof(tx_index)
        
        return {
            'transaction': transaction,
            'merkle_proof': proof,
            'merkle_root': block['merkle_root'],
            'block_index': block_index,
            'tx_index': tx_index
        }
        
    def verify_transaction(self, tx_hash: str, proof: List[Tuple[int, str]], root: str) -> bool:
        """Verify a transaction using its Merkle proof"""
        tree = MerkleTree([])  # Empty tree just to use the verification method
        return tree.verify_proof(tx_hash, proof, root) 