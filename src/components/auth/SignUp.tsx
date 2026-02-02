import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface SignUpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

const SECURITY_QUESTIONS = [
  "What city were you born in?",
  "What was the name of your first pet?",
  "What was your mother's maiden name?",
  "What was the name of your elementary school?",
  "What was your childhood nickname?",
  "What street did you grow up on?",
  "What was your favorite food as a child?",
  "What was the make of your first car?",
];

export const SignUp = ({ open, onOpenChange, onSwitchToLogin }: SignUpProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!securityQuestion) {
      setError('Please select a security question');
      return;
    }

    if (!securityAnswer.trim()) {
      setError('Please provide an answer to the security question');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, fullName, securityQuestion, securityAnswer);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Success - show success message and switch to login
      setError(null);
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSecurityQuestion('');
      setSecurityAnswer('');
      setLoading(false);
      onOpenChange(false);
      // Optionally show success message or auto-switch to login
      alert('Account created successfully! Please sign in.');
      onSwitchToLogin();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Sign up to access additional features
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 6 characters
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="securityQuestion">Security Question</Label>
            <Select
              value={securityQuestion}
              onValueChange={setSecurityQuestion}
              disabled={loading}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a security question" />
              </SelectTrigger>
              <SelectContent>
                {SECURITY_QUESTIONS.map((question) => (
                  <SelectItem key={question} value={question}>
                    {question}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              This will be used for account recovery
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="securityAnswer">Security Answer</Label>
            <Input
              id="securityAnswer"
              type="text"
              placeholder="Your answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline"
          >
            Sign in
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
