# Secure Vote India - Blockchain Voting System

A modern voting system for Indian elections built with Flask and blockchain technology.

## Key Features

- **Secure Blockchain Ledger**: All votes are recorded on an immutable, transparent blockchain
- **Real-time Vote Tracking**: Track votes as they are cast in the blockchain explorer
- **Indian Election Support**: Built for Lok Sabha and State Assembly elections
- **OTP Verification**: Two-factor authentication for voter identity verification
- **Interactive Management Tool**: Easy-to-use interface for managing the voting process

## Components

### 1. Blockchain Voting API

The core Flask API that handles voting, verification, and blockchain management.

### 2. Blockchain Explorer

A real-time dashboard to view and verify all votes on the blockchain.

### 3. Blockchain Manager

An interactive CLI tool for casting votes and managing the blockchain.

## API Endpoints

### Election Management
- `GET /api/elections`: List all active/upcoming elections
- `GET /api/candidates/<election_id>`: Get candidates for a specific election

### Voter Authentication
- `POST /api/verify`: Verify voter identity with OTP
- `POST /api/verify-otp`: Validate OTP sent to voter

### Voting & Blockchain
- `POST /api/vote`: Cast a vote (records on blockchain)
- `GET /api/status/<voter_id>`: Check voter's voting status
- `GET /api/blockchain/votes`: View all votes in JSON format
- `GET /api/blockchain/explorer`: Interactive blockchain explorer
- `GET /api/blockchain/votes/live`: Auto-refreshing blockchain view
- `GET /api/health`: API health check

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd secure-vote-now-flow/votex-api
   ```

2. **Set up a virtual environment:**
   ```
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the API server:**
   ```
   python app.py
   ```
   The server will start at `http://localhost:5000/`

5. **Run the Blockchain Manager:**
   ```
   python blockchain_manager.py
   ```

## Using the Blockchain Manager

The blockchain manager provides an interactive interface to:

1. View the current blockchain data
2. Cast new votes with a step-by-step process
3. Open the blockchain explorer in your browser
4. Verify vote integrity

## Test Voter Accounts

Use these voters for testing:

| Voter ID | Name | Phone Number |
|----------|------|--------------|
| V12345 | Rahul Sharma | 1234567890 |
| V67890 | Priya Patel | 9876543210 |
| V54321 | Amit Kumar | 5551234567 |
| VOTER-1 | Ananya Reddy | 1111111111 |
| VOTER-2 | Suresh Iyer | 2222222222 |
| TEST | Neha Gupta | 0000000000 |

## Elections and Candidates

The system includes:

**Lok Sabha General Election 2025**
- Aditya Kapoor (BJP)
- Sunita Verma (Congress)
- Rajesh Khanna (AAP)

**Gujarat State Assembly Election 2025**
- Deepak Mehta (BJP)
- Kavita Rao (Congress)
- Vijay Chauhan (Independent)

## Security Notes

- This is a demonstration system with in-memory blockchain storage
- In production, it would connect to a distributed blockchain network
- OTPs are generated but displayed in the response (for testing only)

## License

MIT License 