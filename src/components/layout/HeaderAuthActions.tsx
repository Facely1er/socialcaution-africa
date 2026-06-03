import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import useStore from '../../store/useStore';
import AuthModal from '../auth/AuthModal';

export default function HeaderAuthActions() {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useStore();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <>
      <div className="header-auth hidden lg:flex">
        {user ? (
          <button type="button" className="header-auth-btn" onClick={handleSignOut}>
            <LogOut className="header-auth-btn__icon" aria-hidden />
            <span className="header-auth-btn__label">Sign out</span>
          </button>
        ) : (
          <button type="button" className="header-auth-btn" onClick={() => setShowAuth(true)}>
            <User className="header-auth-btn__icon" aria-hidden />
            <span className="header-auth-btn__label">Account</span>
          </button>
        )}
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} defaultMode="signin" />}
    </>
  );
}
