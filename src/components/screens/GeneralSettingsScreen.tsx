import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  ArrowLeft, 
  Palette, 
  Clock, 
  Smartphone, 
  HardDrive, 
  ShieldCheck, 
  HelpCircle, 
  FileCode, 
  ChevronRight, 
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

interface GeneralSettingsScreenProps {
  onOpenThemeStudio?: () => void;
  onOpenCiHub?: () => void;
}

export const GeneralSettingsScreen: React.FC<GeneralSettingsScreenProps> = ({ 
  onOpenThemeStudio,
  onOpenCiHub 
}) => {
  const { theme, setActiveScreen } = useTheme();

  // Settings states
  const [countdown, setCountdown] = useState<number>(3); // 0, 3, 5, 10
  const [hideBubbleWhenRecording, setHideBubbleWhenRecording] = useState(false);
  const [shakeToStop, setShakeToStop] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(true);
  const [showTouches, setShowTouches] = useState(true);
  const [videoEncoder, setVideoEncoder] = useState<'h264' | 'hevc'>('h264');
  const [storagePath, setStoragePath] = useState('/Movies/ProRecorder');

  return (
    <div 
      className="h-full flex flex-col justify-between overflow-y-auto p-3 select-none"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div className="space-y-2.5">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: theme.surfaceBorder }}>
          <button
            onClick={() => setActiveScreen('home')}
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: theme.textColor }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <span className="text-[10px] font-mono" style={{ color: theme.textMuted }}>v2.4 Pro</span>
        </div>

        {/* Highlight Banner: Open UI Design Studio */}
        <div 
          onClick={onOpenThemeStudio}
          className="p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all hover:opacity-95 shadow-md"
          style={{
            backgroundColor: `${theme.primaryColor}18`,
            borderColor: theme.primaryColor,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
              style={{ backgroundColor: theme.primaryColor, color: theme.isDark ? '#000' : '#fff' }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>Theme Design Studio</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-emerald-500/20 text-emerald-400">
                  {theme.name}
                </span>
              </div>
              <div className="text-[10px]" style={{ color: theme.textMuted }}>
                Switch between 6 themes & customize colors
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: theme.primaryColor }} />
        </div>

        {/* Android CI & APK Build Hub */}
        <div 
          onClick={onOpenCiHub}
          className="p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all hover:opacity-95"
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
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold">Android APK & GitHub Actions</div>
              <div className="text-[10px]" style={{ color: theme.textMuted }}>
                Ready CI/CD workflow & Jetpack Compose theme code
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: theme.surfaceSubtle, color: theme.primaryColor }}>
            CI Export
          </span>
        </div>

        {/* Recording Controls */}
        <div 
          className="p-3 rounded-xl border space-y-2.5"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="text-xs font-semibold">Recording Controls</div>

          {/* Countdown timer */}
          <div className="flex items-center justify-between">
            <span className="text-[11px]">Countdown Timer</span>
            <div className="flex items-center gap-1">
              {[0, 3, 5, 10].map((t) => (
                <button
                  key={t}
                  onClick={() => setCountdown(t)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-colors"
                  style={{
                    backgroundColor: countdown === t ? theme.primaryColor : theme.surfaceSubtle,
                    color: countdown === t ? (theme.isDark ? '#000' : '#fff') : theme.textMuted,
                    borderColor: countdown === t ? theme.primaryColor : theme.surfaceBorder,
                  }}
                >
                  {t === 0 ? 'None' : `${t}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Hide Floating Ball */}
          <label className="flex items-center justify-between cursor-pointer pt-1 border-t" style={{ borderColor: theme.surfaceBorder }}>
            <span className="text-[11px]">Hide Floating Bubble During Recording</span>
            <input
              type="checkbox"
              checked={hideBubbleWhenRecording}
              onChange={() => setHideBubbleWhenRecording(!hideBubbleWhenRecording)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </label>

          {/* Shake to Stop */}
          <label className="flex items-center justify-between cursor-pointer pt-1 border-t" style={{ borderColor: theme.surfaceBorder }}>
            <span className="text-[11px]">Shake Device to Stop Recording</span>
            <input
              type="checkbox"
              checked={shakeToStop}
              onChange={() => setShakeToStop(!shakeToStop)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </label>

          {/* Show Touches */}
          <label className="flex items-center justify-between cursor-pointer pt-1 border-t" style={{ borderColor: theme.surfaceBorder }}>
            <span className="text-[11px]">Show Visual Screen Tap Dots</span>
            <input
              type="checkbox"
              checked={showTouches}
              onChange={() => setShowTouches(!showTouches)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </label>
        </div>

        {/* Video & Encoding */}
        <div 
          className="p-3 rounded-xl border space-y-2.5"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="text-xs font-semibold">Video Encoding & Codec</div>

          <div className="flex items-center justify-between">
            <span className="text-[11px]">Hardware Encoder</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'h264', label: 'H.264 (Compatible)' },
                { id: 'hevc', label: 'H.265 (High Efficiency)' },
              ].map((enc) => (
                <button
                  key={enc.id}
                  onClick={() => setVideoEncoder(enc.id as any)}
                  className="px-2 py-0.5 rounded text-[10px] font-bold border transition-colors"
                  style={{
                    backgroundColor: videoEncoder === enc.id ? theme.primaryColor : theme.surfaceSubtle,
                    color: videoEncoder === enc.id ? (theme.isDark ? '#000' : '#fff') : theme.textMuted,
                    borderColor: videoEncoder === enc.id ? theme.primaryColor : theme.surfaceBorder,
                  }}
                >
                  {enc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: theme.surfaceBorder }}>
            <div>
              <div className="text-[11px]">Storage Directory</div>
              <div className="text-[9px] font-mono text-slate-400">{storagePath}</div>
            </div>
            <button 
              onClick={() => alert(`Directory: /sdcard${storagePath}`)}
              className="text-[10px] font-semibold px-2 py-0.5 rounded border"
              style={{ backgroundColor: theme.surfaceSubtle, borderColor: theme.surfaceBorder }}
            >
              Browse
            </button>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() => setActiveScreen('home')}
          className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          style={{
            backgroundColor: theme.primaryColor,
            color: theme.isDark ? '#000' : '#fff',
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <Check className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
};
