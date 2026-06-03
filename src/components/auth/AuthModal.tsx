import React, { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, AlertCircle } from 'lucide-react';
import useStore from '../../store/useStore';
import Button from '../common/Button';
import { ariaModalTrue } from '../../utils/aria';

const passwordAutoCompleteSignIn = { autoComplete: 'current-password' } as const;
const passwordAutoCompleteSignUp = { autoComplete: 'new-password' } as const;

interface AuthModalProps {
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const store = useStore();
  const titleId = useId();
  const descId = useId();
  const errorId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userData = {
        id: Date.now().toString(),
        email,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('social-caution-user', JSON.stringify(userData));
      store.setUser(userData);

      onClose();
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const title = mode === 'signin' ? 'Welcome Back' : 'Create Account';
  const description =
    mode === 'signin'
      ? 'Sign in to access your privacy dashboard'
      : 'Start your privacy journey with SocialCaution';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        role="dialog"
        {...ariaModalTrue}
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="bg-white rounded-xl shadow-xl w-full max-w-md relative overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
          aria-label="Close sign-in dialog"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="p-6">
          <h2 id={titleId} className="text-2xl font-bold text-primary mb-2">
            {title}
          </h2>
          <p id={descId} className="text-gray-600 mb-6">
            {description}
          </p>

          {error && (
            <div
              id={errorId}
              role="alert"
              className="mb-4 p-3 bg-danger/10 text-danger rounded-lg flex items-center"
            >
              <AlertCircle className="h-5 w-5 mr-2" aria-hidden />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby={error ? errorId : undefined}>
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden />
                <input
                  type="email"
                  id="auth-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden />
                <input
                  type="password"
                  id="auth-password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  {...(mode === 'signin' ? passwordAutoCompleteSignIn : passwordAutoCompleteSignUp)}
                />
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-accent hover:text-accent-dark text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            >
              {mode === 'signin'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
