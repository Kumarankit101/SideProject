import React from 'react';

type MovingTextStripProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
  speed?: 'slow' | 'medium' | 'fast';
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
};

export default function MovingTextStrip({
  text,
  bgColor = "#DDF695",
  textColor = "#171817", 
  speed = 'medium',
  fontSize = 'xl'
}: MovingTextStripProps) {
  // Duplicate the text to ensure continuous flow
  const repeatedText = `${text} ${text} ${text} ${text} ${text} ${text}`;
  
  // Determine animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return '30s';
      case 'fast': return '15s';
      default: return '20s';
    }
  };

  // Determine font size class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      case '2xl': return 'text-2xl';
      case '3xl': return 'text-3xl';
      default: return 'text-xl';
    }
  };
  
  return (
    <div 
      className="overflow-hidden py-4 whitespace-nowrap"
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className={`inline-block animate-marquee ${getFontSizeClass()} font-montserrat font-bold tracking-wide uppercase`}
        style={{ 
          animationDuration: getDuration(),
          color: textColor
        }}
      >
        {repeatedText}
      </div>
    </div>
  );
}