import React, { useState } from 'react';

interface CrestLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const dimensionMap = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  // Primary URL is direct CDN link, with fallback to imgur page link
  const logoUrl = 'https://i.imgur.com/n9Akjfs.jpg';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 min-w-0 ${className}`}>
      {/* Official Academy Crest Container */}
      <div
        className={`relative ${dimensionMap[size]} shrink-0 rounded-full overflow-hidden border border-[#FFD000]/60 bg-[#0A0A0A] drop-shadow-[0_0_12px_rgba(255,208,0,0.35)] flex items-center justify-center`}
      >
        {!imageError ? (
          <img
            src={logoUrl}
            alt="Edoh Sport Academy Official Logo"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transform scale-105"
          />
        ) : (
          /* Graceful High-Fidelity SVG Crest Fallback if external image is blocked */
          <svg
            viewBox="0 0 100 115"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-0.5"
          >
            <path
              d="M50 4L92 18V56C92 84 50 110 50 110C50 110 8 84 8 56V18L50 4Z"
              fill="#0A0A0A"
              stroke="#FFD000"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="55" r="16" fill="#1C1C1C" stroke="#FFD000" strokeWidth="2" />
            <polygon points="50,48 55,52 53,58 47,58 45,52" fill="#FFD000" />
            <text
              x="50"
              y="28"
              fill="#FFD000"
              fontSize="7"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              EDOH
            </text>
            <text
              x="50"
              y="85"
              fill="#FFFFFF"
              fontSize="4.8"
              fontWeight="800"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              SPORT ACADEMY
            </text>
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-display text-base sm:text-lg lg:text-xl font-black tracking-wider text-white uppercase truncate">
              EDOH <span className="text-[#FFD000]">SPORT</span>
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] tracking-widest text-neutral-400 uppercase font-semibold truncate">
            Academy • Abuja
          </span>
        </div>
      )}
    </div>
  );
};
