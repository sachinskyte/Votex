import random
from utils.data import update_voter

def generate_otp():
    """
    Generate a 4-digit OTP
    """
    return random.randint(1000, 9999)

def create_otp_for_voter(voter_id):
    """
    Generate and store an OTP for a voter
    """
    otp = generate_otp()
    # In a real application, this would send an SMS
    # For this mock implementation, we just store it
    update_voter(voter_id, {"otp": otp, "verified": False})
    return otp

def verify_otp(voter_id, provided_otp):
    """
    Verify if the provided OTP matches the stored OTP
    """
    from utils.data import get_voter
    
    voter = get_voter(voter_id)
    if not voter:
        return False
    
    # Convert both to strings for comparison to avoid type issues
    stored_otp = voter.get("otp")
    if stored_otp is not None and str(stored_otp) == str(provided_otp):
        # Mark as verified if OTP matches
        update_voter(voter_id, {"verified": True})
        return True
    
    return False 