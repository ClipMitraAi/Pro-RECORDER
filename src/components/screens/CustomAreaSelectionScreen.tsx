import React, { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Crop, 
  RotateCcw, 
  Play, 
  ArrowLeft, 
  Maximize2, 
  Sparkles,
  Check
} from 'lucide-react';

export const CustomAreaSelectionScreen: React.FC = () => {
  const { theme, setActiveScreen } = useTheme();

  // Selection box geometry (percentage or px inside 340x560 container)
  const [aspectPreset, setAspectPreset] = useState<'free' | '16:9' | '9:16' | '1:1'>('9:16');
  const [box, setBox] = useState({
    x: 40,
    y: 80,
    width: 240,
    height: 380,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Computed resolution based on 1080p equivalent
  const computedResolution = {
    w: Math.round((box.width / 320) * 1080),
    h: Math.round((box.height / 520) * 1920),
  };

  const setPreset = (preset: 'free' | '16:9' | '9:16' | '1:1') => {
    setAspectPreset(preset);
    if (preset === '9:16') {
      setBox({ x: 45, y: 70, width: 230, height: 410 });
    } else if (preset === '16:9') {
      setBox({ x: 20, y: 160, width: 280, height: 158 });
    } else if (preset === '1:1') {
      setBox({ x: 40, y: 140, width: 240, height: 240 });
    }
  };

  const handleStartCropped = () => {
    setActiveScreen('fullscreen-recording');
  };

  return (
    <div 
      className="h-full flex flex-col justify-between overflow-hidden p-3 select-none"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: theme.surfaceBorder }}>
          <button
            onClick={() => setActiveScreen('home')}
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: theme.textColor }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Custom Area Crop</span>
          </button>

          <button
            onClick={() => setPreset('9:16')}
            className="text-[11px] font-medium flex items-center gap-1"
            style={{ color: theme.textMuted }}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Aspect Ratio Presets Bar */}
        <div className="flex items-center gap-1.5 mt-2.5">
          {[
            { id: '9:16', label: '9:16 Shorts' },
            { id: '16:9', label: '16:9 Video' },
            { id: '1:1', label: '1:1 Square' },
            { id: 'free', label: 'Freeform' },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => setPreset(preset.id as any)}
              className="flex-1 py-1.5 text-[10px] font-semibold rounded-lg border transition-all"
              style={{
                backgroundColor: aspectPreset === preset.id ? theme.primaryColor : theme.surfaceColor,
                color: aspectPreset === preset.id ? (theme.isDark ? '#000' : '#fff') : theme.textMuted,
                borderColor: aspectPreset === preset.id ? theme.primaryColor : theme.surfaceBorder,
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Selection Canvas Box */}
      <div 
        ref={containerRef}
        className="relative flex-1 my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center"
      >
        {/* Background Dimmed App Preview */}
        <div className="absolute inset-0 opacity-40 flex flex-col justify-between p-3 pointer-events-none">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono">
            <span>APP_SURFACE_PREVIEW</span>
            <span>PRO_RECORDER_ENGINE</span>
          </div>
          <div className="space-y-2 opacity-50">
            <div className="h-4 bg-slate-800 rounded w-3/4" />
            <div className="h-16 bg-slate-800/60 rounded w-full" />
            <div className="h-4 bg-slate-800 rounded w-1/2" />
          </div>
          <div className="text-center text-[10px] text-slate-600">
            Content outside bounded box will be excluded
          </div>
        </div>

        {/* The Cropping Selection Rectangle */}
        <div
          className="absolute border-2 transition-all shadow-2xl flex flex-col justify-between p-2"
          style={{
            left: `${box.x}px`,
            top: `${box.y}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            borderColor: theme.primaryColor,
            backgroundColor: `${theme.primaryColor}12`,
            boxShadow: `0 0 20px ${theme.primaryColor}33`,
          }}
        >
          {/* Corner Resize Handles */}
          <div 
            className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 rounded-sm border-2 border-white shadow"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <div 
            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-sm border-2 border-white shadow"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <div 
            className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 rounded-sm border-2 border-white shadow"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <div 
            className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 rounded-sm border-2 border-white shadow"
            style={{ backgroundColor: theme.primaryColor }}
          />

          {/* Center Crosshairs */}
          <div className="flex items-center justify-between text-[9px] font-mono font-bold" style={{ color: theme.primaryColor }}>
            <span>REC AREA</span>
            <span>{aspectPreset.toUpperCase()}</span>
          </div>

          <div className="self-center px-2 py-0.5 rounded backdrop-blur-md bg-black/60 text-white font-mono text-[10px] font-bold border border-white/20">
            {computedResolution.w} × {computedResolution.h} px
          </div>

          <div className="text-[8px] font-mono text-center opacity-75" style={{ color: theme.textColor }}>
            X: {box.x}px · Y: {box.y}px
          </div>
        </div>
      </div>

      {/* Controls & Dimensions Info */}
      <div>
        {/* Info Card */}
        <div 
          className="p-2.5 rounded-xl border mb-2 flex items-center justify-between text-xs"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
          }}
        >
          <div>
            <div className="font-semibold text-xs">Cropped Output Specs</div>
            <div className="text-[10px] font-mono" style={{ color: theme.textMuted }}>
              Resolution: {computedResolution.w}x{computedResolution.h} · 60 FPS
            </div>
          </div>
          <div className="px-2 py-1 rounded text-[10px] font-bold" style={{ backgroundColor: theme.surfaceSubtle, color: theme.primaryColor }}>
            Target: {aspectPreset}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartCropped}
          className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98"
          style={{
            backgroundColor: theme.primaryColor,
            color: theme.isDark ? '#000000' : '#ffffff',
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Cropped Recording</span>
        </button>
      </div>
    </div>
  );
};
