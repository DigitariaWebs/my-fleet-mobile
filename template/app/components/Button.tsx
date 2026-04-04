import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  children, 
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "h-[52px] px-8 rounded-xl font-semibold text-[15px] transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#4A1942] text-[#EAEAEA]",
    secondary: "bg-transparent border border-[rgba(234,234,234,0.15)] text-[#EAEAEA]",
    ghost: "bg-transparent text-[rgba(234,234,234,0.6)]",
    destructive: "bg-[#E74C3C] text-[#EAEAEA]"
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}