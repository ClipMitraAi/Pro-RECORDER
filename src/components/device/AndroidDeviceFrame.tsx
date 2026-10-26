import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AppScreenId } from '../../types/theme';
import { HomeScreen } from '../screens/HomeScreen';
import { FullScreenRecordingScreen } from '../screens/FullScreenRecordingScreen';
import { CustomAreaSelectionScreen } from '../screens/CustomAreaSelectionScreen';
import { AudioSettingsScreen } from '../screens/AudioSettingsScreen';
import { FacecamSettingsScreen } from '../screens/FacecamSettingsScreen';
import { RecordingsGalleryScreen } from '../screens/RecordingsGalleryScreen';
import { VideoEditorScreen } from '../screens/VideoEditorScreen';
import { GeneralSettingsScreen } from '../screens/GeneralSettingsScreen';
import { 
  Home, 
  Film, 
  Edit3, 
  Settings, 
  Wifi, 
  Battery, 
  Sparkles, 
  Layers, 
  Maximize2, 
  Minimize2,
  Check,
  X
} from 'lucide-react';

interface AndroidDeviceFrameProps {
  onOpenThemeStudio?: () => void;
  onOpenCiHub?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const AndroidDeviceFrame: React.FC<AndroidDeviceFrameProps> = ({
  onOpenThemeStudio,
  onOpenCiHub,
  isFullscreen,
  onToggleFullscreen
}) => {
  const { theme, activeScreen, setActiveScreen, toastMessage, dismissToast } = useTheme();

  // Screen selection tabs for direct quick navigation
  const screenNavTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'recordings', label: 'Recordings', icon: Film },
    { id: 'video-editor', label: 'Editor', icon: Edit3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'fullscreen-recording':
        return <FullScreenRecordingScreen />;
      case 'custom-area':
        return <CustomAreaSelectionScreen />;
      case 'audio-settings':
        return <AudioSettingsScreen />;
      case 'facecam-settings':
        return <FacecamSettingsScreen />;
      case 'recordings':
        return <RecordingsGalleryScreen />;
      case 'video-editor':
        return <VideoEditorScreen />;
      case 'settings':
        return <GeneralSettingsScreen onOpenThemeStudio={onOpenThemeStudio} onOpenCiHub={onOpenCiHub} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Toast Confirmation Message */}
      {toastMessage && (
        <div 
          className="absolute top-2 z-50 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md border flex items-center gap-2 animate-bounce transition-all"
          style={{
            backgroundColor: `${theme.surfaceColor}FA`,
            borderColor: theme.primaryColor,
            color: theme.textColor,
          }}
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primaryColor, color: theme.isDark ? '#000' : '#fff' }}>
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button onClick={dismissToast} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Screen Quick-Switch Bar above phone */}
      <div className="w-full max-w-[400px] mb-2 px-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Screen:</span>
          {[
            { id: 'home', label: 'Dashboard' },
            { id: 'fullscreen-recording', label: 'Recording' },
            { id: 'custom-area', label: 'Crop' },
            { id: 'audio-settings', label: 'Audio' },
            { id: 'facecam-settings', label: 'Facecam' },
            { id: 'recordings', label: 'Gallery' },
            { id: 'video-editor', label: 'Editor' },
            { id: 'settings', label: 'Settings' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id as any)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors whitespace-nowrap ${
                activeScreen === s.id 
                  ? 'bg-slate-700 text-white font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white ml-1 shrink-0"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Phone'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Realistic Android Smartphone Shell */}
      <div 
        className="w-[370px] sm:w-[390px] h-[720px] rounded-[48px] p-3 shadow-2xl relative border-[4px] border-slate-700/80 bg-slate-900 transition-all flex flex-col justify-between overflow-hidden ring-1 ring-slate-800"
        style={{
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px ${theme.primaryColor}15`,
        }}
      >
        {/* Hardware details: Ear Speaker Slit */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-slate-800 z-40" />

        {/* Screen Display Bezel Container */}
        <div 
          className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col justify-between border"
          style={{
            backgroundColor: theme.backgroundColor,
            borderColor: theme.surfaceBorder,
          }}
        >
          {/* Android Status Bar */}
          <div 
            className="h-8 px-5 flex items-center justify-between text-xs z-30 shrink-0 select-none"
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
            }}
          >
            {/* Clock */}
            <span className="font-semibold font-mono text-[11px] tracking-tight">09:41</span>

            {/* Front Camera Punch Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[10px] font-mono font-bold">5G</span>
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Active Viewport Screen Body */}
          <div className="flex-1 overflow-hidden relative">
            {renderActiveScreen()}
          </div>

          {/* Bottom Navigation Bar (Hidden during full-screen recording) */}
          {activeScreen !== 'fullscreen-recording' && (
            <div 
              className={`shrink-0 border-t z-30 ${
                theme.navLayout === 'floating-dock'
                  ? 'mx-3 mb-2 rounded-2xl shadow-xl'
                  : ''
              }`}
              style={{
                backgroundColor: theme.surfaceColor,
                borderColor: theme.surfaceBorder,
              }}
            >
              <div className="grid grid-cols-4 items-center h-14 px-2">
                {screenNavTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeScreen === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveScreen(tab.id as AppScreenId)}
                      className="flex flex-col items-center justify-center py-1 transition-all"
                      style={{
                        color: isActive ? theme.primaryColor : theme.textMuted,
                      }}
                    >
                      <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                      <span className="text-[10px] font-medium tracking-tight">{tab.label}</span>
                      {isActive && (
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-0.5"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Android Home Navigation Gesture Pill */}
              <div className="pb-1.5 flex justify-center">
                <div 
                  className="w-24 h-1 rounded-full opacity-60"
                  style={{ backgroundColor: theme.textColor }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
