const GlassCard = ({ className = '', children, hover = true }) => (
  <div className={`glass p-6 ${hover ? 'hover:scale-[1.02] transition-transform' : ''} ${className}`}>
    {children}
  </div>
);

export default GlassCard;