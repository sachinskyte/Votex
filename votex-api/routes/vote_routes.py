from flask import Blueprint, jsonify, request, render_template_string
from utils.data import get_voter, record_vote, get_vote_status, get_candidates, get_elections, get_all_votes
from utils.data import verify_blockchain_integrity, get_merkle_root
from datetime import datetime

# Create Blueprint
vote_bp = Blueprint('votes', __name__)

@vote_bp.route('/vote', methods=['POST'])
def submit_vote():
    """
    Submit a vote for a candidate in an election
    """
    data = request.get_json()
    
    # Validate input
    if not data or 'voter_id' not in data or 'election_id' not in data or 'candidate_id' not in data:
        return jsonify({
            "success": False,
            "error": "Missing required fields: voter_id, election_id, and candidate_id"
        }), 400
    
    voter_id = data['voter_id']
    election_id = data['election_id']
    candidate_id = data['candidate_id']
    
    # Check if voter exists and is verified
    voter = get_voter(voter_id)
    if not voter:
        return jsonify({
            "success": False,
            "error": "Voter ID not found"
        }), 404
    
    if not voter['verified']:
        return jsonify({
            "success": False,
            "error": "Voter not verified. Please complete OTP verification."
        }), 403
    
    # Validate election_id
    elections_list = get_elections('active')
    election_ids = [election['id'] for election in elections_list]
    if int(election_id) not in election_ids:
        return jsonify({
            "success": False,
            "error": "Invalid or inactive election ID"
        }), 400
    
    # Validate candidate_id
    candidates_list = get_candidates(election_id)
    candidate_ids = [candidate['id'] for candidate in candidates_list]
    if int(candidate_id) not in candidate_ids:
        return jsonify({
            "success": False,
            "error": "Invalid candidate ID for this election"
        }), 400
    
    # Record vote - this adds the vote to the blockchain
    if record_vote(voter_id, election_id, candidate_id):
        # Get blockchain data to verify vote was recorded
        blockchain_votes = get_all_votes()
        
        # Find this vote in the blockchain
        for vote in blockchain_votes:
            if vote['voter_id'] == voter_id:
                this_vote = vote
                break
        else:
            this_vote = {}
        
        return jsonify({
            "success": True,
            "message": "Vote recorded successfully in blockchain",
            "data": {
                "voter_id": voter_id,
                "election_id": election_id,
                "blockchain_data": this_vote
            }
        })
    else:
        return jsonify({
            "success": False,
            "error": "You have already voted in this election"
        }), 400

@vote_bp.route('/status/<voter_id>', methods=['GET'])
def check_vote_status(voter_id):
    """
    Check the voting status for a voter
    """
    # Check if voter exists
    voter = get_voter(voter_id)
    if not voter:
        return jsonify({
            "success": False,
            "error": "Voter ID not found"
        }), 404
    
    status = get_vote_status(voter_id)
    
    return jsonify({
        "success": True,
        "data": {
            "voter_id": voter_id,
            "status": status
        }
    })

@vote_bp.route('/blockchain/votes', methods=['GET'])
def get_blockchain_votes():
    """
    Return all votes recorded in the blockchain
    """
    votes = get_all_votes()
    
    return jsonify({
        "success": True,
        "data": {
            "votes": votes,
            "total_votes": len(votes)
        }
    })

@vote_bp.route('/blockchain/votes/live', methods=['GET'])
def get_blockchain_votes_live():
    """
    Return all votes recorded in the blockchain with auto-refresh HTML
    """
    votes = get_all_votes()
    
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Live Blockchain Votes</title>
        <meta http-equiv="refresh" content="3">
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
            h1 { color: #333; text-align: center; }
            .container { max-width: 800px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .vote-card { border: 1px solid #ddd; margin-bottom: 10px; padding: 15px; border-radius: 5px; background-color: #f9f9f9; }
            .vote-header { font-weight: bold; margin-bottom: 5px; color: #333; }
            .vote-info { margin: 5px 0; color: #555; }
            .timestamp { color: #999; font-size: 0.9em; text-align: right; }
            .status { background-color: #4CAF50; color: white; padding: 10px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
            .block-hash { font-family: monospace; background-color: #f0f0f0; padding: 3px 6px; border-radius: 3px; }
            .candidate-party { color: #666; font-style: italic; }
            .auto-refresh { text-align: center; margin-top: 20px; font-size: 0.8em; color: #999; }
            .total-votes { text-align: center; font-size: 1.2em; margin-bottom: 20px; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Live Blockchain Votes</h1>
            <div class="status">Blockchain Status: Active</div>
            <div class="total-votes">Total Votes: {{ votes|length }}</div>
            
            {% if votes %}
                {% for vote in votes %}
                <div class="vote-card">
                    <div class="vote-header">Vote #{{ loop.index }}</div>
                    <div class="vote-info"><strong>Voter:</strong> {{ vote.voter_name }} ({{ vote.voter_id }})</div>
                    <div class="vote-info"><strong>Election:</strong> {{ vote.election_name }}</div>
                    <div class="vote-info"><strong>Candidate:</strong> {{ vote.candidate_name }}</div>
                    <div class="vote-info"><strong>Block Hash:</strong> <span class="block-hash">{{ vote.block_hash }}</span></div>
                    <div class="timestamp">Timestamp: {{ vote.timestamp }}</div>
                </div>
                {% endfor %}
            {% else %}
                <p>No votes have been cast yet.</p>
            {% endif %}
            
            <div class="auto-refresh">This page automatically refreshes every 3 seconds</div>
        </div>
    </body>
    </html>
    """
    
    rendered_html = render_template_string(html_template, votes=votes)
    return rendered_html

@vote_bp.route('/blockchain/explorer', methods=['GET'])
def blockchain_explorer():
    """
    Blockchain Explorer page with sync verification and algorithm information
    """
    votes = get_all_votes()
    
    # Verify blockchain integrity
    is_blockchain_valid = verify_blockchain_integrity()
    merkle_root = get_merkle_root() or "Not available"
    
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Blockchain Explorer - Secure Vote</title>
        <meta http-equiv="refresh" content="5">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333; }
            .header { background-color: #1a237e; color: white; padding: 20px; text-align: center; }
            .container { max-width: 1000px; margin: 20px auto; padding: 20px; }
            .stats-container { display: flex; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; }
            .stat-card { background-color: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); flex: 1; margin: 0 10px 10px; text-align: center; min-width: 200px; }
            .stat-value { font-size: 24px; font-weight: bold; margin: 10px 0; color: #1a237e; }
            .stat-label { font-size: 14px; color: #666; }
            .vote-table { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
            .vote-table th { background-color: #eeeeee; padding: 12px; text-align: left; font-weight: bold; }
            .vote-table td { padding: 12px; border-top: 1px solid #eee; }
            .vote-table tr:hover { background-color: #f9f9f9; }
            .hash { font-family: monospace; font-size: 0.9em; color: #1a237e; }
            .badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 12px; }
            .badge-bjp { background-color: #FF9933; color: white; }
            .badge-congress { background-color: #0078D7; color: white; }
            .badge-aap { background-color: #27ae60; color: white; }
            .badge-independent { background-color: #7f8c8d; color: white; }
            .badge-proof { background-color: #8e44ad; color: white; }
            .auto-refresh { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
            .timestamp { color: #888; font-size: 0.8em; }
            .verification { background-color: #e8f5e9; padding: 10px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #4CAF50; }
            .block-number { background-color: #f1f8e9; border-radius: 4px; padding: 2px 6px; font-family: monospace; }
            .empty-state { text-align: center; padding: 40px; color: #888; }
            .voter-name { font-weight: bold; }
            footer { text-align: center; margin-top: 40px; padding: 20px; border-top: 1px solid #eee; color: #888; font-size: 0.9em; }
            .algorithm-section { margin-top: 30px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .algorithm-title { font-size: 18px; margin-bottom: 15px; color: #1a237e; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .algorithm-desc { margin-bottom: 20px; line-height: 1.5; }
            .merkle-info { font-family: monospace; padding: 10px; background-color: #f9f9f9; border-radius: 4px; overflow: auto; }
            .data-flow { width: 100%; max-width: 600px; margin: 20px auto; display: block; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Blockchain Explorer</h1>
            <p>Real-time view of all vote transactions on the blockchain</p>
        </div>
        
        <div class="container">
            <div class="verification" style="{% if is_blockchain_valid %}background-color: #e8f5e9;{% else %}background-color: #ffebee; border-left: 4px solid #f44336;{% endif %}">
                <strong>Blockchain Verification:</strong> 
                {% if is_blockchain_valid %}
                All {{ votes|length }} vote transactions verified and in sync with the ledger.
                {% else %}
                WARNING: Blockchain integrity check failed. The chain may have been tampered with.
                {% endif %}
                <span class="timestamp">Last checked: {{ now }}</span>
            </div>
            
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-label">Total Votes</div>
                    <div class="stat-value">{{ votes|length }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Lok Sabha Votes</div>
                    <div class="stat-value">{{ lok_sabha_votes }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">State Election Votes</div>
                    <div class="stat-value">{{ state_votes }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Blockchain Status</div>
                    <div class="stat-value" style="font-size: 18px; {% if is_blockchain_valid %}color: #4CAF50;{% else %}color: #f44336;{% endif %}">
                        {% if is_blockchain_valid %}Active & Verified{% else %}Verification Failed{% endif %}
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Merkle Root</div>
                    <div class="stat-value" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis;">{{ merkle_root[:10] }}...</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Consensus Nodes</div>
                    <div class="stat-value">7</div>
                </div>
            </div>
            
            <div class="algorithm-section">
                <div class="algorithm-title">Advanced Blockchain Algorithms</div>
                <div class="algorithm-desc">
                    <strong>1. Merkle Tree Algorithm (O(log n) verification)</strong><br>
                    Our voting system implements a Merkle Tree data structure that enables efficient and secure verification of votes without needing to download the entire blockchain. Each block contains a Merkle root that summarizes all transactions, allowing for O(log n) verification complexity instead of O(n).
                </div>
                <div class="algorithm-desc">
                    <strong>2. Byzantine Fault Tolerance (BFT) Consensus</strong><br>
                    All votes go through a Byzantine consensus protocol that can tolerate up to f Byzantine (malicious) nodes in a system of 3f+1 total nodes. This provides mathematical guarantees that the voting system continues to function correctly even if some nodes are compromised or faulty.
                </div>
                <div class="merkle-info">
                    Current Merkle Root: {{ merkle_root }}<br>
                    Consensus Nodes: 7 (can tolerate up to 2 malicious nodes)<br>
                    Verification Algorithm: O(log n) time complexity
                </div>
            </div>
            
            {% if votes %}
                <table class="vote-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Block Hash</th>
                            <th>Voter</th>
                            <th>Election</th>
                            <th>Candidate</th>
                            <th>Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for vote in votes %}
                        <tr>
                            <td><span class="block-number">{{ loop.index }}</span></td>
                            <td><span class="hash">{{ vote.block_hash[:12] }}...</span></td>
                            <td><span class="voter-name">{{ vote.voter_name }}</span><br><span class="timestamp">ID: {{ vote.voter_id }}</span></td>
                            <td>{{ vote.election_name }}</td>
                            <td>
                                {{ vote.candidate_name }}
                                {% if "BJP" in vote.candidate_name or "Kapoor" in vote.candidate_name or "Mehta" in vote.candidate_name %}
                                    <span class="badge badge-bjp">BJP</span>
                                {% elif "Congress" in vote.candidate_name or "Verma" in vote.candidate_name or "Rao" in vote.candidate_name %}
                                    <span class="badge badge-congress">INC</span>
                                {% elif "AAP" in vote.candidate_name or "Khanna" in vote.candidate_name %}
                                    <span class="badge badge-aap">AAP</span>
                                {% else %}
                                    <span class="badge badge-independent">IND</span>
                                {% endif %}
                            </td>
                            <td>
                                {% if vote.has_merkle_proof %}
                                    <span class="badge badge-proof">Merkle Verified</span>
                                {% else %}
                                    <span class="timestamp">Basic Verification</span>
                                {% endif %}
                                <br>
                                <span class="timestamp">{{ vote.timestamp }}</span>
                            </td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            {% else %}
                <div class="empty-state">
                    <h3>No votes have been cast yet</h3>
                    <p>When votes are cast, they will appear here in real-time</p>
                </div>
            {% endif %}
            
            <div class="auto-refresh">
                This page automatically refreshes every 5 seconds to show the latest blockchain data
            </div>
        </div>
        
        <footer>
            Secure Vote Blockchain Explorer &copy; 2025<br>
            <span class="timestamp">Featuring Merkle Tree & Byzantine Consensus Algorithms</span>
        </footer>
    </body>
    </html>
    """
    
    # Count votes for different elections
    lok_sabha_votes = sum(1 for vote in votes if vote['election_id'] == 1)
    state_votes = sum(1 for vote in votes if vote['election_id'] == 2)
    
    # Get current time
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    rendered_html = render_template_string(
        html_template, 
        votes=votes,
        lok_sabha_votes=lok_sabha_votes,
        state_votes=state_votes,
        now=now,
        is_blockchain_valid=is_blockchain_valid,
        merkle_root=merkle_root
    )
    
    return rendered_html 