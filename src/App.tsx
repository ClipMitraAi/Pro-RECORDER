import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { DesignStudioSidebar } from './components/studio/DesignStudioSidebar';
import { AndroidDeviceFrame } from './components/device/AndroidDeviceFrame';
import { AndroidBuildExportModal } from './components/screens/AndroidBuildExportModal';
import { THEME_PRESETS, ThemeId } from './types/theme';
import { 
  Palette, 
  Smartphone, 
  Sliders, 
  Sparkles, 
  Maximize2, 
  Layers, 
  Check, 
  X,
  Code
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { theme, activeThemeId, selectTheme } = useTheme();
  const [isCiModalOpen, setIsCiModalOpen] = useState(false);
  const [mobileStudioOpen, setMobileStudioOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Application Header Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-40">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm shadow-md transition-colors"
            style={{ backgroundColor: theme.primaryColor, color: theme.isDark ? '#000' : '#fff' }}
          >
            PR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">Pro Recorder</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                Studio Mode
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden sm:block">
              Interactive Design Selector & Android App Engine
            </div>
          </div>
        </div>

        {/* Quick Theme Switcher Pills (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {Object.values(THEME_PRESETS).map((preset) => {
            const isSelected = activeThemeId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => selectTheme(preset.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-slate-800 text-white shadow-sm ring-1' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                style={{
                  outlineColor: isSelected ? preset.primaryColor : 'transparent',
                }}
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: preset.primaryColor }} 
                />
                <span>{preset.name}</span>
                {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {/* Android CI/CD Guide Button */}
          <button
            onClick={() => setIsCiModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Android APK CI/CD</span>
            <span className="sm:hidden">CI/CD</span>
          </button>

          {/* Toggle Mobile Studio Drawer */}
          <button
            onClick={() => setMobileStudioOpen(!mobileStudioOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1 text-xs font-semibold"
          >
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>Themes</span>
          </button>

          {/* Desktop Focus Mode Toggle */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="hidden md:flex p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 items-center justify-center"
            title={isFocusMode ? 'Show Design Studio' : 'Focus Phone Only'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Workspace Layout: Side-by-side or Fullscreen */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Side: Design Studio Panel */}
        {!isFocusMode && (
          <aside className="hidden lg:block w-[420px] shrink-0 border-r border-slate-800 overflow-hidden">
            <DesignStudioSidebar 
              onOpenCiModal={() => setIsCiModalOpen(true)} 
            />
          </aside>
        )}

        {/* Center / Right: Android Device Viewport */}
        <main className="flex-1 flex flex-col items-center justify-center overflow-y-auto p-2 sm:p-6 bg-radial from-slate-900 to-slate-950">
          <AndroidDeviceFrame
            onOpenThemeStudio={() => setMobileStudioOpen(true)}
            onOpenCiHub={() => setIsCiModalOpen(true)}
            isFullscreen={isFocusMode}
            onToggleFullscreen={() => setIsFocusMode(!isFocusMode)}
          />
        </main>
      </div>

      {/* Mobile Slide-over Drawer for Design Studio */}
      {mobileStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end lg:hidden animate-fade-in">
          <div className="w-full max-w-md h-full bg-slate-900 flex flex-col shadow-2xl">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-sm">Theme Design Studio</span>
              <button 
                onClick={() => setMobileStudioOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <DesignStudioSidebar
                onOpenCiModal={() => {
                  setMobileStudioOpen(false);
                  setIsCiModalOpen(true);
                }}
                onCloseMobile={() => setMobileStudioOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Android CI/CD APK Build Workflow Modal */}
      <AndroidBuildExportModal
        isOpen={isCiModalOpen}
        onClose={() => setIsCiModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
