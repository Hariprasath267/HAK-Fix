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
  // Default variant 'color': HAK is #0C2340 (deep navy), fix is #FF7A00 (orange)
  // 'white' variant (for dark navy/black backgrounds like hero/footer): HAK is #FFFFFF, fix is #FF7A00
  // 'dark' variant: monochrome dark
  const hakColor = variant === 'white' ? '#FFFFFF' : '#0C2340';
  const fixColor = '#FF7A00';
  const windowColor = '#FF7A00';

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <svg
        viewBox="0 0 560 180"
        className={`${heightClasses[size]} w-auto select-none`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="HAK fix logo"
      >
        {/* HAK Brand Group */}
        <g id="HAK-group">
          {/* H */}
          {/* Left Vertical Bar */}
          <rect x="20" y="38" width="28" height="122" rx="4" fill={hakColor} />
          {/* Right Vertical Bar */}
          <rect x="86" y="38" width="28" height="122" rx="4" fill={hakColor} />
          {/* Crossbar */}
          <rect x="48" y="86" width="38" height="26" fill={hakColor} />

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
            fill={hakColor}
            stroke={hakColor}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* 4 Square Orange Window Panes Inside the House */}
          <rect x="169" y="112" width="9.5" height="9.5" rx="1.5" fill={windowColor} />
          <rect x="182" y="112" width="9.5" height="9.5" rx="1.5" fill={windowColor} />
          <rect x="169" y="125" width="9.5" height="9.5" rx="1.5" fill={windowColor} />
          <rect x="182" y="125" width="9.5" height="9.5" rx="1.5" fill={windowColor} />

          {/* K */}
          {/* Vertical Stem */}
          <rect x="242" y="38" width="28" height="122" rx="4" fill={hakColor} />
          {/* Upper Diagonal Arm */}
          <polygon points="270,112 316,38 348,38 292,126" fill={hakColor} />
          {/* Lower Diagonal Leg */}
          <polygon points="280,102 322,160 354,160 300,94" fill={hakColor} />
        </g>

        {/* fix Group (Vibrant Orange with Wrench 'x') */}
        <g id="fix-group" fill={fixColor}>
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
          {/* f crossbar left tab */}
          <rect x="352" y="74" width="22" height="20" rx="3" />

          {/* i */}
          {/* Dot */}
          <circle cx="426" cy="46" r="11" />
          {/* Stem */}
          <rect x="414" y="74" width="24" height="86" rx="4" />

          {/* x with Spanner / Wrench head */}
          {/* Main Diagonal: Top-Left to Bottom-Right */}
          <polygon points="450,74 474,74 532,160 508,160" />
          {/* Lower Left Arm */}
          <polygon points="480,116 452,156 452,160 476,160 496,132" />

          {/* Upper Right Arm leading to Open Wrench Jaw */}
          <polygon points="496,112 516,88 528,100 508,124" />
          {/* Wrench Jaw / Spanner Head */}
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
          className={`text-[10px] tracking-wider uppercase font-semibold mt-0.5 ${
            variant === 'white' ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          Local Experts &bull; Easy Bookings
        </span>
      )}
    </div>
  );
};
