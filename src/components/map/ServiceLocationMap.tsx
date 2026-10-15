import React, { useState } from 'react';
import { MapPin, Navigation, ShieldCheck, Compass, ZoomIn, ZoomOut } from 'lucide-react';

interface Marker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  isPrimary?: boolean;
}

interface ServiceLocationMapProps {
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  markers?: Marker[];
  serviceRadiusKm?: number;
  className?: string;
}

export const ServiceLocationMap: React.FC<ServiceLocationMapProps> = ({
  centerLat = 13.0418, // Default Chennai center
  centerLng = 80.2341,
  markers = [],
  serviceRadiusKm = 7,
  className = 'h-72 w-full rounded-2xl',
}) => {
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(
    markers[0] || null
  );
  const [zoomLevel, setZoomLevel] = useState(1);

  // Default primary marker if none
  const activeMarkers =
    markers.length > 0
      ? markers
      : [
          {
            id: 'default',
            lat: centerLat,
            lng: centerLng,
            title: 'Service Dispatch Hub',
            subtitle: 'Anna Salai, Chennai Metro',
            isPrimary: true,
          },
        ];

  return (
    <div
      className={`relative overflow-hidden bg-slate-900 border border-slate-700/80 shadow-md ${className} select-none`}
    >
      {/* Interactive Map Visual Surface */}
      <svg
        className="w-full h-full"
        viewBox="0 0 600 360"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Map Grid Pattern */}
          <pattern
            id="mapGrid"
            width={40 * zoomLevel}
            height={40 * zoomLevel}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${40 * zoomLevel} 0 L 0 0 0 ${40 * zoomLevel}`}
              fill="none"
              stroke="#1e293b"
              strokeWidth="1"
            />
          </pattern>
          {/* Pulse Radial Gradient */}
          <radialGradient id="serviceRadiusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#2563eb" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dark Map Base */}
        <rect width="600" height="360" fill="#0f172a" />
        <rect width="600" height="360" fill="url(#mapGrid)" />

        {/* Stylized Coastal Waterway / River (Chennai Adyar / Cooum River representation) */}
        <path
          d="M 520 0 Q 510 90 535 180 T 510 360 L 600 360 L 600 0 Z"
          fill="#1e293b"
          opacity="0.6"
        />
        <path
          d="M 520 0 Q 510 90 535 180 T 510 360"
          stroke="#0284c7"
          strokeWidth="3"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* Arterial Road Network */}
        {/* Ring Road 1 */}
        <circle cx="280" cy="180" r="160" fill="none" stroke="#334155" strokeWidth="2.5" />
        <circle cx="280" cy="180" r="100" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6,4" />
        
        {/* Major Expressways */}
        <line x1="0" y1="180" x2="600" y2="180" stroke="#475569" strokeWidth="3" />
        <line x1="280" y1="0" x2="280" y2="360" stroke="#475569" strokeWidth="3" />
        <line x1="60" y1="360" x2="500" y2="20" stroke="#334155" strokeWidth="2" />
        <line x1="120" y1="0" x2="440" y2="360" stroke="#334155" strokeWidth="2" />

        {/* Active Coverage Radius Circle */}
        <circle
          cx="280"
          cy="180"
          r={70 * zoomLevel}
          fill="url(#serviceRadiusGlow)"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="4,4"
        />

        {/* Pulse Ring */}
        <circle
          cx="280"
          cy="180"
          r={55 * zoomLevel}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          opacity="0.8"
        >
          <animate
            attributeName="r"
            values={`${40 * zoomLevel};${85 * zoomLevel};${40 * zoomLevel}`}
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.1;0.8"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Render Markers */}
        {activeMarkers.map((marker, idx) => {
          // Offsets for demo placement relative to center
          const offsetX = idx === 0 ? 0 : idx === 1 ? -65 : 65;
          const offsetY = idx === 0 ? 0 : idx === 1 ? -45 : 45;
          const px = 280 + offsetX * zoomLevel;
          const py = 180 + offsetY * zoomLevel;

          const isPrimary = marker.isPrimary || idx === 0;

          return (
            <g
              key={marker.id}
              onClick={() => setSelectedMarker(marker)}
              className="cursor-pointer group"
            >
              {/* Ground Pin Drop Target */}
              <ellipse
                cx={px}
                cy={py + 12}
                rx="14"
                ry="5"
                fill="#000000"
                opacity="0.4"
              />

              {/* Pin Outer Pin Badge */}
              <circle
                cx={px}
                cy={py}
                r={isPrimary ? '16' : '14'}
                fill={isPrimary ? '#2563eb' : '#ff7a00'}
                stroke="#ffffff"
                strokeWidth="2.5"
                className="group-hover:scale-110 transition-transform origin-center shadow-lg"
              />

              {/* Pin Inner Dot */}
              <circle cx={px} cy={py} r="4" fill="#ffffff" />

              {/* Label Pill */}
              <g transform={`translate(${px}, ${py - 24})`}>
                <rect
                  x="-60"
                  y="-10"
                  width="120"
                  height="20"
                  rx="6"
                  fill="#0f172a"
                  fillOpacity="0.9"
                  stroke={isPrimary ? '#3b82f6' : '#ff7a00'}
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="4"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {marker.title.slice(0, 16)}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Map Header Floating Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-md">
        <Navigation className="w-3.5 h-3.5 text-blue-400" />
        <span>Live Dispatch Map &bull; Chennai &amp; Bengaluru</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
      </div>

      {/* Selected Marker Detail Card Tooltip */}
      {selectedMarker && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs z-10 p-3 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 text-xs text-white shadow-xl">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-100">{selectedMarker.title}</span>
                {selectedMarker.isPrimary && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              {selectedMarker.subtitle && (
                <p className="text-[11px] text-slate-400 mt-0.5">{selectedMarker.subtitle}</p>
              )}
              <div className="text-[10px] text-blue-400 font-semibold mt-1">
                Within {serviceRadiusKm} km dispatch radius &bull; Avg 25-30 min ETA
              </div>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        <button
          onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
          className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 transition-colors cursor-pointer"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
          className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 transition-colors cursor-pointer"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Map Badge */}
      <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-medium text-slate-400">
        GPS Geocoded &bull; Metro Grid
      </div>
    </div>
  );
};
