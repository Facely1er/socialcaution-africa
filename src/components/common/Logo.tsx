import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  size?: number;
  showTagline?: boolean;
  light?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 62.4, showTagline = false, light = false, className = '' }) => {
  const dimension = `${size}px`;

  return (
    <div className={`flex items-center shrink-0 ${className}`.trim()}>
      <div
        className={styles.logoContainer}
        style={{ width: dimension, height: dimension, flexShrink: 0 }}
      >
        {/* Use socialcaution.png logo from public folder */}
        <img
          src="/socialcaution.png"
          alt="SocialCaution Logo"
          width={size}
          height={size}
          className={styles.logoImage}
          style={{ width: dimension, height: dimension }}
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