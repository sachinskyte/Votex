from flask import Blueprint, jsonify, request
from utils.data import get_voter
from utils.otp import create_otp_for_voter, verify_otp

# Create Blueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/verify', methods=['POST'])
def verify_voter():
    """
    Verify voter and generate OTP
    Accepts voter ID and phone number
    """
    data = request.get_json()
    
    # Validate input
    if not data or 'voter_id' not in data or 'phone' not in data:
        return jsonify({
            "success": False,
            "error": "Missing required fields: voter_id and phone"
        }), 400
    
    voter_id = data['voter_id']
    phone = data['phone']
    
    # Check if voter exists
    voter = get_voter(voter_id)
    if not voter:
        return jsonify({
            "success": False,
            "error": "Voter ID not found"
        }), 404
    
    # Check if phone matches
    if voter['phone'] != phone:
        return jsonify({
            "success": False,
            "error": "Phone number doesn't match voter records"
        }), 400
    
    # Generate and store OTP
    otp = create_otp_for_voter(voter_id)
    
    # In a real application, the OTP would be sent via SMS
    # For development, we return it in the response
    return jsonify({
        "success": True,
        "message": "OTP sent to your phone",
        "debug_otp": otp  # Only for development
    })

@auth_bp.route('/verify-otp', methods=['POST'])
def verify_voter_otp():
    """
    Verify the OTP provided by the voter
    """
    data = request.get_json()
    
    # Validate input
    if not data or 'voter_id' not in data or 'otp' not in data:
        return jsonify({
            "success": False,
            "error": "Missing required fields: voter_id and otp"
        }), 400
    
    voter_id = data['voter_id']
    provided_otp = data['otp']
    
    # Verify OTP
    if verify_otp(voter_id, provided_otp):
        return jsonify({
            "success": True,
            "message": "OTP verified successfully",
            "voter_id": voter_id
        })
    else:
        return jsonify({
            "success": False,
            "error": "Invalid OTP or voter ID"
        }), 400 