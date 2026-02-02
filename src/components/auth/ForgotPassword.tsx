import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface ForgotPasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export const ForgotPassword = ({ open, onOpenChange, onSwitchToLogin }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState<string | null>(null);
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { verifySecurityAnswer } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!supabase) {
      setError('Supabase not configured');
      setLoading(false);
      return;
    }

    try {
      // Get security question for this email
      const { data, error: rpcError } = await supabase.rpc('get_security_question', {
        user_email: email,
      });

      if (rpcError || !data) {
        setError('Email not found or error retrieving security question');
        setLoading(false);
        return;
      }

      setSecurityQuestion(data);
      setStep('verify');
      setLoading(false);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleVerifyAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);

    const { valid, error: verifyError } = await verifySecurityAnswer(email, securityAnswer);

    if (verifyError || !valid) {
      setError(verifyError?.message || 'Invalid security answer');
      setLoading(false);
    } else {
      // Security answer verified - send reset email
      if (!supabase) {
        setError('Supabase not configured');
        setLoading(false);
        return;
      }

      try {
        const { error: emailError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (emailError) {
          setError(emailError.message || 'Failed to send reset email. Please try again.');
          setLoading(false);
        } else {
          // Success - email sent
          setError(null);
          setEmail('');
          setSecurityAnswer('');
          setSecurityQuestion(null);
          setStep('email');
          setLoading(false);
          onOpenChange(false);
          alert('Password reset email sent! Please check your inbox and follow the link to reset your password.');
          onSwitchToLogin();
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
        setLoading(false);
      }
    }
  };


  const handleBack = () => {
    setStep('email');
    setError(null);
    setSecurityAnswer('');
    setSecurityQuestion(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {step === 'email' && 'Enter your email to begin password recovery'}
            {step === 'verify' && 'Answer your security question to receive a password reset email'}
          </DialogDescription>
        </DialogHeader>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Continue'
              )}
            </Button>
            <div className="text-center text-sm">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary hover:underline"
              >
                Back to sign in
              </button>
            </div>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyAnswer} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {securityQuestion && (
              <div className="space-y-2">
                <Label>Security Question</Label>
                <div className="p-3 bg-muted rounded-md text-sm">
                  {securityQuestion}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="securityAnswer">Your Answer</Label>
              <Input
                id="securityAnswer"
                type="text"
                placeholder="Enter your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
                disabled={loading}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending email...
                  </>
                ) : (
                  'Verify & Send Email'
                )}
              </Button>
            </div>
          </form>
        )}

      </DialogContent>
    </Dialog>
  );
};
