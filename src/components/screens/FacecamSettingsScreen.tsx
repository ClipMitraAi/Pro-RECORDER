import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  ArrowLeft, 
  Camera, 
  Maximize2, 
  FlipHorizontal, 
  EyeOff, 
  Check,
  Sparkles,
  Move
} from 'lucide-react';

export const FacecamSettingsScreen: React.FC = () => {
  const { theme, setActiveScreen } = useTheme();

  // Facecam settings
  const [facecamShape, setFacecamShape] = useState<'circle' | 'square' | 'rounded' | 'hexagon'>('circle');
  const [sizeScale, setSizeScale] = useState(25); // 15% to 45%
  const [mirrorCamera, setMirrorCamera] = useState(true);
  const [borderGlow, setBorderGlow] = useState(true);
  const [borderColor, setBorderColor] = useState(theme.primaryColor);
  const [position, setPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('top-right');

  const getShapeStyle = () => {
    switch (facecamShape) {
      case 'circle':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-2xl';
      case 'square':
        return 'rounded-none';
      case 'hexagon':
        return 'rounded-3xl';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-3 right-3';
      case 'top-left':
        return 'top-3 left-3';
      case 'bottom-right':
        return 'bottom-3 right-3';
      case 'bottom-left':
        return 'bottom-3 left-3';
    }
  };

  return (
    <div 
      className="h-full flex flex-col justify-between overflow-y-auto p-4 select-none"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b mb-3" style={{ borderColor: theme.surfaceBorder }}>
          <button
            onClick={() => setActiveScreen('home')}
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: theme.textColor }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Facecam Settings</span>
          </button>
          <span className="text-[10px] font-mono" style={{ color: theme.primaryColor }}>
            Front Camera
          </span>
        </div>

        {/* Live Placement Simulator Canvas */}
        <div className="relative w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden mb-3 flex items-center justify-center">
          <div className="text-center opacity-40 text-slate-500 pointer-events-none">
            <div className="text-xs font-mono">LIVE SCREEN SIMULATION</div>
            <div className="text-[10px]">Tap position markers to move facecam</div>
          </div>

          {/* Interactive Facecam Window */}
          <div 
            className={`absolute ${getPositionClasses()} ${getShapeStyle()} overflow-hidden border-2 transition-all flex flex-col items-center justify-center text-white shadow-2xl`}
            style={{
              width: `${(sizeScale / 100) * 300}px`,
              height: `${(sizeScale / 100) * 300}px`,
              borderColor: borderColor,
              boxShadow: borderGlow ? `0 0 16px ${borderColor}88` : 'none',
              transform: mirrorCamera ? 'scaleX(-1)' : 'none',
              backgroundColor: '#111827',
            }}
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs">
              👤
            </div>
            <div className="text-[8px] font-bold mt-1 text-slate-300">PREVIEW</div>
          </div>

          {/* 4 Corner Position Buttons */}
          <div className="absolute inset-2 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between">
              <button 
                onClick={() => setPosition('top-left')}
                className={`w-6 h-6 rounded border pointer-events-auto flex items-center justify-center text-[10px] ${position === 'top-left' ? 'bg-emerald-500 text-black font-bold' : 'bg-black/50 text-slate-400'}`}
              >
                TL
              </button>
              <button 
                onClick={() => setPosition('top-right')}
                className={`w-6 h-6 rounded border pointer-events-auto flex items-center justify-center text-[10px] ${position === 'top-right' ? 'bg-emerald-500 text-black font-bold' : 'bg-black/50 text-slate-400'}`}
              >
                TR
              </button>
            </div>
            <div className="flex justify-between">
              <button 
                onClick={() => setPosition('bottom-left')}
                className={`w-6 h-6 rounded border pointer-events-auto flex items-center justify-center text-[10px] ${position === 'bottom-left' ? 'bg-emerald-500 text-black font-bold' : 'bg-black/50 text-slate-400'}`}
              >
                BL
              </button>
              <button 
                onClick={() => setPosition('bottom-right')}
                className={`w-6 h-6 rounded border pointer-events-auto flex items-center justify-center text-[10px] ${position === 'bottom-right' ? 'bg-emerald-500 text-black font-bold' : 'bg-black/50 text-slate-400'}`}
              >
                BR
              </button>
            </div>
          </div>
        </div>

        {/* Shape Picker */}
        <div 
          className="p-3 rounded-xl border mb-3"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="text-xs font-semibold mb-2">Window Shape & Mask</div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'circle', label: 'Circle' },
              { id: 'rounded', label: 'Rounded' },
              { id: 'square', label: 'Square' },
              { id: 'hexagon', label: 'Hexagon' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setFacecamShape(s.id as any)}
                className="py-2 text-[11px] font-semibold rounded-lg border text-center transition-all"
                style={{
                  backgroundColor: facecamShape === s.id ? theme.primaryColor : theme.surfaceSubtle,
                  color: facecamShape === s.id ? (theme.isDark ? '#000' : '#fff') : theme.textColor,
                  borderColor: facecamShape === s.id ? theme.primaryColor : theme.surfaceBorder,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size Slider */}
        <div 
          className="p-3 rounded-xl border mb-3"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold">Overlay Size</span>
            <span className="font-mono font-bold" style={{ color: theme.primaryColor }}>{sizeScale}%</span>
          </div>
          <input
            type="range"
            min="15"
            max="45"
            value={sizeScale}
            onChange={(e) => setSizeScale(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Border Glow & Colors */}
        <div 
          className="p-3 rounded-xl border mb-3 space-y-2.5"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Border Neon Glow</span>
            <input
              type="checkbox"
              checked={borderGlow}
              onChange={() => setBorderGlow(!borderGlow)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: theme.surfaceBorder }}>
            <span className="text-xs font-semibold">Border Tone</span>
            <div className="flex items-center gap-1.5">
              {[theme.primaryColor, '#ef4444', '#3b82f6', '#a855f7', '#ffffff'].map((color) => (
                <button
                  key={color}
                  onClick={() => setBorderColor(color)}
                  className={`w-5 h-5 rounded-full border-2 ${borderColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between cursor-pointer pt-2 border-t" style={{ borderColor: theme.surfaceBorder }}>
            <span className="text-xs">Mirror Front Camera Feed</span>
            <input
              type="checkbox"
              checked={mirrorCamera}
              onChange={() => setMirrorCamera(!mirrorCamera)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </label>
        </div>
      </div>

      <button
        onClick={() => setActiveScreen('home')}
        className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow"
        style={{
          backgroundColor: theme.primaryColor,
          color: theme.isDark ? '#000' : '#fff',
          borderRadius: `${theme.borderRadius}px`,
        }}
      >
        <Check className="w-4 h-4" />
        <span>Apply Facecam Preferences</span>
      </button>
    </div>
  );
};
