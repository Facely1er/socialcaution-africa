import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  size?: number;
  showTagline?: boolean;
  light?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 62.4, showTagline = false, light = false, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`.trim()}>
      <div className={styles.logoContainer}>
        {/* Use socialcaution.png logo from public folder */}
        <img
          src="/socialcaution.png"
          alt="SocialCaution Logo"
          width={size}
          height={size}
          className={styles.logoImage}
          onError={(e) => {
            // Fallback to favicon if logo fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/favicon.svg';
          }}
        />
      </div>

      {showTagline && (
        <div className="ml-3">
          <div className={`text-sm ${light ? styles.taglineLight : styles.tagline}`}>
            Your Privacy Journey Starts Here
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;