import React from 'react';

interface HakFixLogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'dark';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const HakFixLogo: React.FC<HakFixLogoProps> = ({
  className = '',
  variant = 'color',
  showTagline = false,
  size = 'md',
}) => {
  // Height sizing
  const heightClasses = {
    sm: 'h-7',
    md: 'h-9 sm:h-10',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  // Color mapping:
  // Theme changed from orange to Apple Electric Sapphire / Cyan-Blue (#0071E3 / #2997FF)
  // 'white' variant (for dark backgrounds): HAK is #FFFFFF, fix is #2997FF
  // 'color' variant: HAK is #0C2340 (deep midnight navy), fix is #0071E3 with linear-gradient 3D effect
  const hakColor = variant === 'white' ? '#FFFFFF' : '#0C2340';
  const fixColor = variant === 'white' ? '#2997FF' : '#0071E3';
  const windowColor = variant === 'white' ? '#2997FF' : '#0071E3';

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <svg
        viewBox="0 0 560 180"
        className={`${heightClasses[size]} w-auto select-none drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="HAK fix logo"
      >
        <defs>
          {/* 3D specular gradient for fix */}
          <linearGradient id="fixGrad3D" x1="360" y1="38" x2="560" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2997FF" />
            <stop offset="60%" stopColor="#0071E3" />
            <stop offset="100%" stopColor="#0058B6" />
          </linearGradient>

          <linearGradient id="hakGrad3D" x1="20" y1="38" x2="350" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={variant === 'white' ? '#FFFFFF' : '#1E293B'} />
            <stop offset="100%" stopColor={variant === 'white' ? '#E2E8F0' : '#0C2340'} />
          </linearGradient>
        </defs>

        {/* HAK Brand Group */}
        <g id="HAK-group">
          {/* H */}
          <rect x="20" y="38" width="28" height="122" rx="4" fill="url(#hakGrad3D)" />
          <rect x="86" y="38" width="28" height="122" rx="4" fill="url(#hakGrad3D)" />
          <rect x="48" y="86" width="38" height="26" fill="url(#hakGrad3D)" />

          {/* A (The Signature House Shape) */}
          <path
            d="M 136 160 
               L 136 78 
               L 180 34 
               L 224 78 
               L 224 160 
               L 196 160 
               L 196 98 
               L 180 82 
               L 164 98 
               L 164 160 
               Z"
            fill="url(#hakGrad3D)"
            stroke={hakColor}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* 4 Square Window Panes Inside the House in Sapphire Accent */}
          <rect x="169" y="112" width="9.5" height="9.5" rx="1.5" fill={windowColor} />
          <rect x="182" y="112" width="9.5" height="9.5" rx="1.5" fill={windowColor} />
          <rect x="169" y="125" width="9.5" height="9.5" rx="1.5" fill={windowColor} />
          <rect x="182" y="125" width="9.5" height="9.5" rx="1.5" fill={windowColor} />

          {/* K */}
          <rect x="242" y="38" width="28" height="122" rx="4" fill="url(#hakGrad3D)" />
          <polygon points="270,112 316,38 348,38 292,126" fill="url(#hakGrad3D)" />
          <polygon points="280,102 322,160 354,160 300,94" fill="url(#hakGrad3D)" />
        </g>

        {/* fix Group (Electric Sapphire Blue with Wrench 'x') */}
        <g id="fix-group" fill={variant === 'white' ? fixColor : 'url(#fixGrad3D)'}>
          {/* f */}
          <path
            d="M 384 38 
               C 370 38 362 46 362 60 
               L 362 160 
               L 388 160 
               L 388 94 
               L 406 94 
               L 406 74 
               L 388 74 
               L 388 60 
               C 388 56 390 54 394 54 
               L 404 54 
               L 404 38 
               Z"
          />
          <rect x="352" y="74" width="22" height="20" rx="3" />

          {/* i */}
          <circle cx="426" cy="46" r="11" />
          <rect x="414" y="74" width="24" height="86" rx="4" />

          {/* x with Spanner / Wrench head */}
          <polygon points="450,74 474,74 532,160 508,160" />
          <polygon points="480,116 452,156 452,160 476,160 496,132" />

          <polygon points="496,112 516,88 528,100 508,124" />
          <path
            d="M 515 78
               C 511 67 516 54 526 46
               C 538 37 554 39 562 50
               C 566 56 567 63 564 69
               L 551 60
               C 546 56 540 57 536 61
               C 532 65 533 72 538 76
               L 549 87
               C 543 90 535 89 529 86
               Z"
          />
        </g>
      </svg>
      {showTagline && (
        <span
          className={`text-[10px] tracking-widest uppercase font-medium mt-0.5 ${
            variant === 'white' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Local Experts &bull; Easy Bookings
        </span>
      )}
    </div>
  );
};
