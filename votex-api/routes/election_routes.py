from flask import Blueprint, jsonify, request
from utils.data import get_elections, get_candidates

# Create Blueprint
election_bp = Blueprint('elections', __name__)

@election_bp.route('/elections', methods=['GET'])
def list_elections():
    """
    Returns a list of ongoing elections
    """
    # Get query parameters
    status = request.args.get('status', 'active')
    
    # Get elections filtered by status if provided
    elections_list = get_elections(status)
    
    return jsonify({
        "success": True,
        "data": {
            "elections": elections_list
        }
    })

@election_bp.route('/candidates/<int:election_id>', methods=['GET'])
def list_candidates(election_id):
    """
    Returns a list of candidates for a specific election
    """
    candidates_list = get_candidates(election_id)
    
    if not candidates_list:
        return jsonify({
            "success": False,
            "error": "No candidates found for this election"
        }), 404
    
    return jsonify({
        "success": True,
        "data": {
            "election_id": election_id,
            "candidates": candidates_list
        }
    }) 