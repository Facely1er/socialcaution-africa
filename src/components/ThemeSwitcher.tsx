import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
import { ariaPressedFalse, ariaPressedTrue } from '../utils/aria';

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
  ariaDescribedBy?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  showLabel = false,
  ariaDescribedBy,
}) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={`
        flex items-center gap-2 
        text-white hover:text-white dark:text-white dark:hover:text-white
        transition-all duration-200 
        p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10
        ${className}
      `}
      aria-label={label}
      {...(isDark ? ariaPressedTrue : ariaPressedFalse)}
      aria-describedby={ariaDescribedBy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-accent" aria-hidden />
        ) : (
          <Sun className="h-4 w-4 text-accent" aria-hidden />
        )}
      </motion.div>
      {showLabel && (
        <span className="text-sm font-medium" aria-hidden>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </motion.button>
  );
};

export default ThemeSwitcher;
