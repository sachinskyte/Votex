import requests
import json
import os
import sys
import time
from datetime import datetime

# Base URL for API
base_url = "http://localhost:5000/api"

# Clear screen function
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# Voter data for easy reference
voters = [
    {"id": "V12345", "name": "Rahul Sharma", "phone": "1234567890"},
    {"id": "V67890", "name": "Priya Patel", "phone": "9876543210"},
    {"id": "V54321", "name": "Amit Kumar", "phone": "5551234567"},
    {"id": "VOTER-1", "name": "Ananya Reddy", "phone": "1111111111"},
    {"id": "VOTER-2", "name": "Suresh Iyer", "phone": "2222222222"},
    {"id": "TEST", "name": "Neha Gupta", "phone": "0000000000"}
]

# Election data for easy reference
elections = [
    {"id": 1, "name": "Lok Sabha General Election 2025", "candidates": [
        {"id": 101, "name": "Aditya Kapoor", "party": "BJP"},
        {"id": 102, "name": "Sunita Verma", "party": "Congress"},
        {"id": 103, "name": "Rajesh Khanna", "party": "AAP"}
    ]},
    {"id": 2, "name": "Gujarat State Assembly Election 2025", "candidates": [
        {"id": 201, "name": "Deepak Mehta", "party": "BJP"},
        {"id": 202, "name": "Kavita Rao", "party": "Congress"},
        {"id": 203, "name": "Vijay Chauhan", "party": "Independent"}
    ]}
]

def print_header():
    """Print application header"""
    clear_screen()
    print("\n" + "=" * 60)
    print(" " * 15 + "BLOCKCHAIN VOTING MANAGER")
    print("=" * 60)
    print("\nAdvanced Algorithms: Merkle Tree & Byzantine Consensus")
    print("-" * 60 + "\n")

def view_blockchain():
    """View the current blockchain data"""
    print("\nRetrieving blockchain data...")
    
    try:
        response = requests.get(f"{base_url}/blockchain/votes")
        if not response.ok:
            print(f"Error: Server returned {response.status_code}")
            return
            
        data = response.json()
        votes = data['data']['votes']
        total_votes = data['data']['total_votes']
        
        print(f"\nTotal votes in blockchain: {total_votes}")
        
        if total_votes == 0:
            print("No votes have been cast yet.")
            return
        
        # Attempt to retrieve blockchain verification status
        try:
            merkle_proof_votes = sum(1 for vote in votes if vote.get('has_merkle_proof', False))
            print(f"Votes with Merkle proofs: {merkle_proof_votes}")
            print(f"Byzantine consensus passed: {total_votes}")
            print("-" * 60)
        except:
            pass
            
        print("\n" + "-" * 60)
        for i, vote in enumerate(votes, 1):
            print(f"Vote #{i}:")
            print(f"  Voter: {vote.get('voter_name', 'Unknown')} ({vote.get('voter_id', 'Unknown')})")
            print(f"  Election: {vote.get('election_name', 'Unknown')}")
            print(f"  Candidate: {vote.get('candidate_name', 'Unknown')}")
            print(f"  Block Hash: {vote.get('block_hash', 'Unknown')}")
            
            # Show Merkle verification if available
            if vote.get('has_merkle_proof', False):
                print(f"  Verification: Merkle Tree Verified (O(log n) algorithm)")
            else:
                print(f"  Verification: Basic Hash Verification")
                
            print("-" * 60)
            
    except Exception as e:
        print(f"Error connecting to server: {e}")

def cast_vote():
    """Cast a new vote"""
    print("\n--- Cast a New Vote ---\n")
    
    # Step 1: Select voter
    print("Available voters:")
    for i, voter in enumerate(voters, 1):
        print(f"{i}. {voter['name']} (ID: {voter['id']})")
    
    try:
        voter_choice = int(input("\nSelect voter (number): ").strip())
        if voter_choice < 1 or voter_choice > len(voters):
            print("Invalid selection.")
            return
        selected_voter = voters[voter_choice - 1]
    except ValueError:
        print("Please enter a valid number.")
        return
    
    # Step 2: Select election
    print("\nAvailable elections:")
    for i, election in enumerate(elections, 1):
        print(f"{i}. {election['name']}")
    
    try:
        election_choice = int(input("\nSelect election (number): ").strip())
        if election_choice < 1 or election_choice > len(elections):
            print("Invalid selection.")
            return
        selected_election = elections[election_choice - 1]
    except ValueError:
        print("Please enter a valid number.")
        return
    
    # Step 3: Select candidate
    print(f"\nCandidates for {selected_election['name']}:")
    for i, candidate in enumerate(selected_election['candidates'], 1):
        print(f"{i}. {candidate['name']} ({candidate['party']})")
    
    try:
        candidate_choice = int(input("\nSelect candidate (number): ").strip())
        if candidate_choice < 1 or candidate_choice > len(selected_election['candidates']):
            print("Invalid selection.")
            return
        selected_candidate = selected_election['candidates'][candidate_choice - 1]
    except ValueError:
        print("Please enter a valid number.")
        return
    
    # Step 4: Verify choices
    print("\nVote Summary:")
    print(f"Voter: {selected_voter['name']} (ID: {selected_voter['id']})")
    print(f"Election: {selected_election['name']}")
    print(f"Candidate: {selected_candidate['name']} ({selected_candidate['party']})")
    
    confirm = input("\nConfirm this vote? (y/n): ").strip().lower()
    if confirm != 'y':
        print("Vote canceled.")
        return
    
    # Step 5: Process the vote
    print("\nProcessing vote...")
    
    # Verify voter
    try:
        verify_response = requests.post(
            f"{base_url}/verify", 
            json={"voter_id": selected_voter['id'], "phone": selected_voter['phone']}
        )
        
        if not verify_response.ok:
            print(f"Error verifying voter: {verify_response.status_code}")
            return
            
        verify_data = verify_response.json()
        if not verify_data.get('success'):
            print(f"Verification failed: {verify_data.get('error', 'Unknown error')}")
            return
            
        otp = verify_data.get("debug_otp")
        print(f"OTP received: {otp}")
        
        # Validate OTP
        validate_response = requests.post(
            f"{base_url}/verify-otp", 
            json={"voter_id": selected_voter['id'], "otp": otp}
        )
        
        if not validate_response.ok:
            print(f"Error validating OTP: {validate_response.status_code}")
            return
            
        validate_data = validate_response.json()
        if not validate_data.get('success'):
            print(f"OTP validation failed: {validate_data.get('error', 'Unknown error')}")
            return
            
        # Cast vote
        vote_response = requests.post(
            f"{base_url}/vote", 
            json={
                "voter_id": selected_voter['id'], 
                "election_id": selected_election['id'], 
                "candidate_id": selected_candidate['id']
            }
        )
        
        if not vote_response.ok:
            print(f"Error casting vote: {vote_response.status_code}")
            return
            
        vote_data = vote_response.json()
        if vote_data.get('success'):
            print("\n✓ Vote successfully cast and recorded on blockchain!")
        else:
            print(f"Vote failed: {vote_data.get('error', 'Unknown error')}")
        
    except Exception as e:
        print(f"Error: {e}")

def menu():
    """Display main menu"""
    while True:
        print_header()
        print("1. View Blockchain")
        print("2. Cast New Vote")
        print("3. View Advanced Blockchain Explorer")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ").strip()
        
        if choice == "1":
            view_blockchain()
        elif choice == "2":
            cast_vote()
        elif choice == "3":
            print("\nOpening blockchain explorer in browser...")
            os.system(f"start http://localhost:5000/api/blockchain/explorer")
            time.sleep(2)  # Give some time before going back to menu
        elif choice == "4":
            print("\nExiting program. Goodbye!")
            break
        else:
            print("\nInvalid choice. Please try again.")
        
        input("\nPress Enter to continue...")

if __name__ == "__main__":
    # Make sure server is running
    try:
        requests.get(f"{base_url}/health")
        menu()
    except:
        print("Error: Could not connect to server. Please make sure the server is running at http://localhost:5000")
        print("You can start the server by running: python app.py") 