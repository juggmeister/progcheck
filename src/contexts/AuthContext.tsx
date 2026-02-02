import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, securityQuestion: string, securityAnswer: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string, securityAnswer: string, newPassword: string) => Promise<{ error: AuthError | null }>;
  verifySecurityAnswer: (email: string, securityAnswer: string) => Promise<{ error: AuthError | null; valid: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Simple hash function for security answers (in production, use a proper hashing library)
const hashAnswer = async (answer: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(answer.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    securityQuestion: string,
    securityAnswer: string
  ): Promise<{ error: AuthError | null }> => {
    if (!supabase) {
      return { error: { name: 'AuthError', message: 'Supabase not configured' } as AuthError };
    }

    try {
      // Hash the security answer
      const hashedAnswer = await hashAnswer(securityAnswer);

      // Sign up the user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        return { error: signUpError };
      }

      // Create user profile with security question
      if (user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: user.id, // This MUST be the user.id from the auth response
            full_name: fullName,
            security_question: securityQuestion,
            security_answer_hash: hashedAnswer,
          });

        if (profileError) {
          // If profile creation fails, we should ideally rollback the user creation
          // For now, we'll just return the error
          console.error('Error creating user profile:', profileError);
          return { error: profileError as AuthError };
        }
      }

      return { error: null };
    } catch (err) {
      return { error: err as AuthError };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
    if (!supabase) {
      return { error: { name: 'AuthError', message: 'Supabase not configured' } as AuthError };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Update last login after successful sign in
    if (!error && data.user) {
      await supabase
        .from('user_profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);
    }

    return { error };
  };

  const signOut = async (): Promise<void> => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const verifySecurityAnswer = async (
    email: string,
    securityAnswer: string
  ): Promise<{ error: AuthError | null; valid: boolean }> => {
    if (!supabase) {
      return { error: { name: 'AuthError', message: 'Supabase not configured' } as AuthError, valid: false };
    }

    try {
      const hashedAnswer = await hashAnswer(securityAnswer);
      
      // Use the database function to verify
      const { data, error } = await supabase.rpc('verify_security_answer', {
        user_email: email,
        answer_hash: hashedAnswer,
      });

      if (error) {
        return { error, valid: false };
      }

      return { error: null, valid: data === true };
    } catch (err) {
      return { error: err as AuthError, valid: false };
    }
  };

  const resetPassword = async (
    email: string,
    securityAnswer: string,
    newPassword: string
  ): Promise<{ error: AuthError | null }> => {
    if (!supabase) {
      return { error: { name: 'AuthError', message: 'Supabase not configured' } as AuthError };
    }

    // First verify the security answer
    const { valid, error: verifyError } = await verifySecurityAnswer(email, securityAnswer);
    
    if (verifyError || !valid) {
      return { error: verifyError || { name: 'AuthError', message: 'Invalid security answer' } as AuthError };
    }

    // For password reset after security verification, we need to use a database function
    // that can update the password. Since we can't directly update another user's password
    // without being authenticated, we'll use a database function with SECURITY DEFINER
    // that can update the auth.users table
    
    try {
      const { data, error: rpcError } = await supabase.rpc('reset_password_with_security', {
        user_email: email,
        new_password: newPassword,
      });

      if (rpcError) {
        return { error: rpcError as AuthError };
      }

      return { error: null };
    } catch (err) {
      return { error: err as AuthError };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        verifySecurityAnswer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
