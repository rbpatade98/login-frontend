const Card = ({ children, className = '', variant = 'light' }) => {
  const variants = {
    light: 'bg-canvas border border-black/8 rounded-sm',
    dark: 'bg-canvas-dark border border-white/12 rounded-sm',
    mint: 'bg-accent-mint rounded-sm',
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
