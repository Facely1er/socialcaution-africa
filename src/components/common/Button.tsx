import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineLight' | 'inverse' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-accent hover:bg-accent-dark text-white shadow-sm hover:shadow active:scale-95',
    secondary: 'bg-card hover:bg-card-hover text-text border border-border shadow-sm hover:shadow active:scale-95',
    outline: 'border border-border bg-transparent text-text hover:bg-card-hover hover:text-text active:scale-95',
    outlineLight: 'border border-white text-white bg-transparent hover:bg-white/10 active:scale-95',
    inverse: 'preserve-white bg-white hover:bg-gray-100 text-accent shadow-md hover:shadow-lg active:scale-95 border border-transparent',
    text: 'text-accent hover:bg-accent/10 active:scale-95',
  };
  
  const sizeClasses = {
    sm: 'text-sm py-2.5 px-3 min-h-[44px]', // 44px minimum for touch targets
    md: 'text-base py-3 px-4 min-h-[44px]', // 44px minimum for touch targets
    lg: 'text-lg py-3.5 px-5 min-h-[48px]', // Slightly larger for prominent actions
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button 
      className={buttonClasses}
      {...props}
      aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
    >
      {children}
    </button>
  );
};

export default Button;