import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { authAPI } from '@/services/api';

const VoterVerification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'identification' | 'otp'>('identification');
  const [voterId, setVoterId] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugOtp, setDebugOtp] = useState<number | null>(null);
  const [verified, setVerified] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Check if already verified - to prevent repeated verification prompts
  useEffect(() => {
    const storedVoterId = localStorage.getItem('voterId');
    const isVerified = localStorage.getItem('voter_verified') === 'true';
    
    if (storedVoterId && isVerified) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleIdentificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.verify({ 
        voter_id: voterId, 
        phone: phone 
      });

      if (response.success) {
        // Store the debug OTP for testing purposes
        if (response.debug_otp) {
          setDebugOtp(response.debug_otp);
        }
        setStep('otp');
      } else {
        setError(response.message || 'Verification failed');
      }
    } catch (err) {
      console.error("Error in verification step:", err);
      setError('An unexpected error occurred during verification');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otp) {
      setError('Please enter the OTP');
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting OTP:", { voter_id: voterId, otp });
      const response = await authAPI.verifyOtp({ 
        voter_id: voterId, 
        otp: otp 
      });

      console.log("OTP verification response:", response);

      if (response.success) {
        // Store authentication data in localStorage
        localStorage.setItem('voterId', voterId);
        localStorage.setItem('voter_verified', 'true');
        
        // Set as verified and prepare for redirect
        setVerified(true);
        setRedirecting(true);
        
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          try {
            navigate('/dashboard');
          } catch (err) {
            console.error("Navigation error:", err);
            // If navigation fails, provide a manual link
            setError('Automatic redirect failed. Please click the button below.');
            setRedirecting(false);
          }
        }, 1500);
      } else {
        setError(response.message || 'OTP verification failed. Please check your OTP and try again.');
      }
    } catch (err) {
      console.error("Error in OTP verification:", err);
      setError('An unexpected error occurred. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setVoterId('');
    setPhone('');
    setOtp('');
    setDebugOtp(null);
    setVerified(false);
    setStep('identification');
  };

  const handleManualRedirect = () => {
    navigate('/dashboard');
  };

  if (verified) {
    return (
      <Card className="w-full max-w-md mx-auto border border-vote-neon shadow-[0_0_15px_rgba(57,255,20,0.3)]">
        <CardHeader>
          <CardTitle className="text-vote-neon animate-glow">Verification Successful!</CardTitle>
          <CardDescription>You are now verified and can proceed to vote.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          {redirecting ? (
            <div className="w-8 h-8 border-4 border-vote-neon/20 border-t-vote-neon rounded-full animate-spin"></div>
          ) : (
            <Button onClick={handleManualRedirect} variant="neon" className="mt-2">
              Go to Dashboard
            </Button>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-400">
          {redirecting ? 'Redirecting to dashboard...' : 'Click the button to go to the dashboard'}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border border-vote-neon shadow-[0_0_15px_rgba(57,255,20,0.3)]">
      <CardHeader>
        <CardTitle className="text-vote-neon">Voter Verification</CardTitle>
        <CardDescription>
          {step === 'identification' 
            ? 'Please enter your Voter ID and phone number' 
            : 'Enter the OTP sent to your phone'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-destructive/20 text-destructive p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {step === 'identification' ? (
          <form onSubmit={handleIdentificationSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="voterId" className="text-sm font-medium">
                Voter ID
              </label>
              <Input
                id="voterId"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                placeholder="Enter your Voter ID (e.g., V12345)"
                required
                className="bg-black border-vote-neon/50 text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="bg-black border-vote-neon/50 text-white"
              />
            </div>
            <Button 
              type="submit" 
              variant="neon" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Identity'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                One-Time Password
              </label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the 4-digit OTP"
                required
                className="bg-black border-vote-neon/50 text-white"
              />
            </div>
            {debugOtp && (
              <div className="bg-black/40 p-3 rounded-md border border-vote-neon/30 text-center">
                <span className="text-xs text-gray-400">Debug OTP (for testing only):</span>
                <div className="text-vote-neon font-bold text-xl animate-glow">{debugOtp}</div>
              </div>
            )}
            <Button 
              type="submit" 
              variant="neon" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 'otp' && (
          <Button variant="outline" onClick={() => setStep('identification')}>
            Back
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VoterVerification; 