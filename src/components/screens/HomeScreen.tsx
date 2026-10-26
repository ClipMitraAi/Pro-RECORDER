import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Play, 
  Crop, 
  Gamepad2, 
  Mic, 
  Camera, 
  HardDrive, 
  Sparkles, 
  Sliders, 
  Settings, 
  Layers, 
  Film,
  Zap,
  Check
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { theme, setActiveScreen } = useTheme();
  const [selectedMode, setSelectedMode] = useState<'fullscreen' | 'custom' | 'game' | 'audio'>('fullscreen');
  const [resolution, setResolution] = useState<'4K' | '1080p' | '720p'>('1080p');
  const [fps, setFps] = useState<number>(60);
  const [audioSource, setAudioSource] = useState<'mixed' | 'mic' | 'internal' | 'none'>('mixed');
  const [facecamEnabled, setFacecamEnabled] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState<string | null>(null);

  // Dynamic card style helper
  const getCardClasses = () => {
    switch (theme.cardStyle) {
      case 'glass':
        return 'backdrop-blur-md border shadow-lg';
      case 'elevated':
        return 'shadow-md border border-white/5';
      case 'bordered':
        return 'border shadow-sm';
      default:
        return 'border';
    }
  };

  const handleStartRecording = () => {
    if (selectedMode === 'custom') {
      setActiveScreen('custom-area');
    } else {
      setActiveScreen('fullscreen-recording');
    }
  };

  return (
    <div 
      className="h-full flex flex-col justify-between overflow-y-auto px-4 py-3 select-none"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      {/* Top Bar Header */}
      <div>
        <div className="flex items-center justify-between pt-1 pb-3">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm"
              style={{ backgroundColor: theme.primaryColor, color: theme.isDark ? '#000' : '#fff' }}
            >
              PR
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight leading-tight">Pro Recorder</h1>
              <p className="text-[11px]" style={{ color: theme.textMuted }}>
                {resolution} · {fps} FPS · {audioSource === 'mixed' ? 'Mic + Internal' : audioSource}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setActiveScreen('settings')}
              aria-label="Settings"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: theme.surfaceSubtle }}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Theme Shortcut Banner */}
        <div 
          className="mb-3 p-2.5 rounded-xl flex items-center justify-between border cursor-pointer transition-all hover:opacity-95"
          style={{ 
            backgroundColor: theme.surfaceColor, 
            borderColor: theme.surfaceBorder,
            borderRadius: `${Math.max(10, theme.borderRadius - 4)}px` 
          }}
          onClick={() => setActiveScreen('settings')}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${theme.primaryColor}22`, color: theme.primaryColor }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-semibold">Active Theme: {theme.name}</p>
              <p className="text-[10px]" style={{ color: theme.textMuted }}>
                Tap to change theme or customize palette
              </p>
            </div>
          </div>
          <span 
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
            style={{ backgroundColor: theme.primaryColor, color: theme.isDark ? '#000' : '#fff' }}
          >
            Customize
          </span>
        </div>

        {/* Capture Mode Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[
            { id: 'fullscreen', label: 'Full Screen', icon: Layers },
            { id: 'custom', label: 'Custom Area', icon: Crop },
            { id: 'game', label: 'Game Stream', icon: Gamepad2 },
            { id: 'audio', label: 'Audio Only', icon: Mic },
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id as any)}
                className={`flex flex-col items-center justify-center py-2 px-1 text-center transition-all ${getCardClasses()}`}
                style={{
                  backgroundColor: isSelected ? `${theme.primaryColor}18` : theme.surfaceColor,
                  borderColor: isSelected ? theme.primaryColor : theme.surfaceBorder,
                  borderRadius: `${theme.borderRadius}px`,
                  color: isSelected ? theme.primaryColor : theme.textMuted,
                }}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-medium leading-none">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Specs Quickbar */}
        <div 
          className={`p-3 mb-3 ${getCardClasses()}`}
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: theme.textColor }}>Capture Parameters</span>
            <button 
              onClick={() => setShowConfigModal(showConfigModal ? null : 'specs')}
              className="text-[11px] font-medium flex items-center gap-1"
              style={{ color: theme.primaryColor }}
            >
              <Sliders className="w-3 h-3" />
              <span>Adjust</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Resolution */}
            <div 
              onClick={() => setResolution(resolution === '4K' ? '1080p' : resolution === '1080p' ? '720p' : '4K')}
              className="p-1.5 rounded-lg border cursor-pointer transition-colors"
              style={{ backgroundColor: theme.surfaceSubtle, borderColor: theme.surfaceBorder }}
            >
              <div className="text-[9px]" style={{ color: theme.textMuted }}>Resolution</div>
              <div className="text-xs font-bold font-mono" style={{ color: theme.textColor }}>{resolution}</div>
            </div>

            {/* FPS */}
            <div 
              onClick={() => setFps(fps === 60 ? 120 : fps === 120 ? 30 : 60)}
              className="p-1.5 rounded-lg border cursor-pointer transition-colors"
              style={{ backgroundColor: theme.surfaceSubtle, borderColor: theme.surfaceBorder }}
            >
              <div className="text-[9px]" style={{ color: theme.textMuted }}>Framerate</div>
              <div className="text-xs font-bold font-mono" style={{ color: theme.textColor }}>{fps} FPS</div>
            </div>

            {/* Audio Mode */}
            <div 
              onClick={() => setActiveScreen('audio-settings')}
              className="p-1.5 rounded-lg border cursor-pointer transition-colors"
              style={{ backgroundColor: theme.surfaceSubtle, borderColor: theme.surfaceBorder }}
            >
              <div className="text-[9px]" style={{ color: theme.textMuted }}>Audio Source</div>
              <div className="text-xs font-bold capitalize truncate" style={{ color: theme.textColor }}>
                {audioSource === 'mixed' ? 'Mixed' : audioSource}
              </div>
            </div>
          </div>

          {/* Quick toggles */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t text-xs" style={{ borderColor: theme.surfaceBorder }}>
            <button 
              onClick={() => setFacecamEnabled(!facecamEnabled)}
              className="flex items-center gap-1.5 text-[11px] font-medium"
              style={{ color: facecamEnabled ? theme.primaryColor : theme.textMuted }}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Facecam: {facecamEnabled ? 'On' : 'Off'}</span>
            </button>

            <button 
              onClick={() => setActiveScreen('facecam-settings')}
              className="text-[10px] font-medium"
              style={{ color: theme.textMuted }}
            >
              Configure Cam →
            </button>
          </div>
        </div>

        {/* Storage Info Card */}
        <div 
          className={`p-3 mb-3 flex items-center justify-between ${getCardClasses()}`}
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.surfaceSubtle, color: theme.primaryColor }}
            >
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold">Storage Remaining</div>
              <div className="text-[10px]" style={{ color: theme.textMuted }}>
                64.2 GB free / 128 GB (~14h 20m record time)
              </div>
            </div>
          </div>
          <div className="w-12 h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.surfaceSubtle }}>
            <div className="h-full rounded-full" style={{ width: '48%', backgroundColor: theme.primaryColor }} />
          </div>
        </div>
      </div>

      {/* Main Center Recording Button Zone */}
      <div className="py-2 flex flex-col items-center justify-center">
        {/* Render button according to active recordButtonDesign */}
        {theme.recordButtonDesign === 'pulse-radar' ? (
          <div className="relative flex items-center justify-center my-2">
            <div 
              className="absolute w-24 h-24 rounded-full animate-ping opacity-25"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <div 
              className="absolute w-20 h-20 rounded-full animate-pulse opacity-40"
              style={{ backgroundColor: theme.recordColor }}
            />
            <button
              onClick={handleStartRecording}
              className="relative w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95"
              style={{
                backgroundColor: theme.recordColor,
                color: '#ffffff',
                boxShadow: `0 0 25px ${theme.recordColor}88`,
              }}
            >
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-inner">
                <Play className="w-3 h-3 text-red-600 fill-current ml-0.5" />
              </div>
              <span className="text-[9px] font-bold tracking-wider mt-0.5 uppercase">REC</span>
            </button>
          </div>
        ) : theme.recordButtonDesign === 'studio-ring' ? (
          <div className="relative flex items-center justify-center my-2">
            <div 
              className="w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center transition-all p-1"
              style={{ borderColor: theme.primaryColor }}
            >
              <button
                onClick={handleStartRecording}
                className="w-16 h-16 rounded-full flex flex-col items-center justify-center transition-transform active:scale-95"
                style={{
                  backgroundColor: theme.recordColor,
                  color: '#ffffff',
                  boxShadow: `0 4px 14px ${theme.recordColor}66`,
                }}
              >
                <div className="w-4 h-4 rounded-full bg-white mb-0.5" />
                <span className="text-[9px] font-bold tracking-wider uppercase font-mono">RECORD</span>
              </button>
            </div>
          </div>
        ) : theme.recordButtonDesign === 'minimalist-core' ? (
          <button
            onClick={handleStartRecording}
            className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-transform active:scale-98 shadow-sm my-2"
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.isDark ? '#000000' : '#ffffff',
              borderRadius: `${theme.borderRadius}px`,
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>Start Screen Recording</span>
          </button>
        ) : (
          /* Classic Red Button */
          <div className="flex flex-col items-center my-2">
            <div 
              className="w-18 h-18 rounded-full border-4 flex items-center justify-center p-1 cursor-pointer transition-transform active:scale-95 shadow-md"
              style={{ borderColor: theme.surfaceBorder, backgroundColor: theme.surfaceColor }}
              onClick={handleStartRecording}
            >
              <div 
                className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white font-bold text-[10px]"
                style={{ backgroundColor: theme.recordColor, boxShadow: `0 4px 12px ${theme.recordColor}55` }}
              >
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span className="text-[8px] font-bold mt-0.5 tracking-wider">REC</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-[11px] text-center" style={{ color: theme.textMuted }}>
          Tap to capture · Selected mode: <span className="font-semibold capitalize" style={{ color: theme.textColor }}>{selectedMode}</span>
        </p>
      </div>

      {/* Bottom Floating Bar Preview / Quick Controls */}
      <div 
        className="p-2.5 rounded-xl border flex items-center justify-between"
        style={{
          backgroundColor: theme.surfaceColor,
          borderColor: theme.surfaceBorder,
          borderRadius: `${Math.max(10, theme.borderRadius - 4)}px`,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
          <span className="text-[11px] font-medium" style={{ color: theme.textMuted }}>Floating Widget:</span>
          <span className="text-[11px] font-semibold capitalize" style={{ color: theme.textColor }}>
            {theme.floatingControlsStyle.replace('-', ' ')}
          </span>
        </div>
        <button 
          onClick={() => setActiveScreen('fullscreen-recording')}
          className="text-[10px] font-semibold px-2.5 py-1 rounded-md"
          style={{ backgroundColor: theme.surfaceSubtle, color: theme.primaryColor }}
        >
          Test Overlay
        </button>
      </div>
    </div>
  );
};
