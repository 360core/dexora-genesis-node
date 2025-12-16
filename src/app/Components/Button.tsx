import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'animated';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  target,
  rel,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) => {

  const isAnimated = variant === 'animated';

  const animatedClass = classNames(
    `group relative px-4 py-2 rounded-2xl backdrop-blur-xl border-2 border-blue-200/30 min-w-32
     bg-gradient-to-br from-blue-200/40 via-black-900/60 to-black/80 shadow-2xl
     hover:shadow-blue-100/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1
     active:scale-95 transition-all duration-500 ease-out cursor-pointer
     hover:border-blue-100/60 overflow-hidden`,
    className
  );

  const defaultClass = classNames(
    'animated-button',
    {
      'primary': variant === 'primary',
      'secondary': variant === 'secondary',
    },
    className
  );

  const buttonClass = isAnimated ? animatedClass : defaultClass;

  const animatedContent = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-100/10 via-blue-200/20 to-blue-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex items-center justify-center gap-1">
        <div className="flex text-center justify-center">
          <p className="text-white font-bold text-lg group-hover:text-white transition-colors duration-300 drop-shadow-sm">
            {children}
          </p>
        </div>
        {/* <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className="w-5 h-5 text-blue-200"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div> */}
      </div>
    </>
  );

  const defaultContent = (
    <span className="button-content">
      {children}
    </span>
  );

  const content = isAnimated ? animatedContent : defaultContent;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={buttonClass}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
