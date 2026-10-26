import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  THEME_PRESETS, 
  ThemeId, 
  ThemeConfig, 
  CardStyle, 
  ButtonShape, 
  IconStyle, 
  NavLayout, 
  RecordButtonDesign, 
  FloatingControlsStyle 
} from '../../types/theme';
import { 
  Palette, 
  Sliders, 
  Code, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Save, 
  Eye, 
  Moon, 
  Sun, 
  Smartphone, 
  Copy, 
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface DesignStudioSidebarProps {
  onOpenCiModal: () => void;
  onCloseMobile?: () => void;
}

export const DesignStudioSidebar: React.FC<DesignStudioSidebarProps> = ({ 
  onOpenCiModal,
  onCloseMobile 
}) => {
  const { 
    theme, 
    activeThemeId, 
    selectTheme, 
    updateThemeProperty, 
    saveDesign, 
    resetToDefault,
    isModified,
    setActiveScreen
  } = useTheme();

  const [activeTab, setActiveTab] = useState<'gallery' | 'customizer' | 'tokens'>('gallery');
  const [copiedTokens, setCopiedTokens] = useState(false);

  const themeList = Object.values(THEME_PRESETS);

  const handleCopyTokens = () => {
    navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 border-r border-slate-800 text-slate-100 overflow-hidden">
      {/* Top Header & Tabs */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">Design Studio</h2>
              <p className="text-[11px] text-slate-400">Pro Recorder UI Design Engine</p>
            </div>
          </div>

          {/* Quick CI Hub Link */}
          <button
            onClick={onOpenCiModal}
            className="text-[10px] font-semibold px-2 py-1 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
          >
            <Smartphone className="w-3 h-3" />
            <span>Android CI</span>
          </button>
        </div>

        {/* 3 Main Studio Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-1.5 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'gallery' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Themes</span>
          </button>

          <button
            onClick={() => setActiveTab('customizer')}
            className={`py-1.5 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'customizer' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          <button
            onClick={() => setActiveTab('tokens')}
            className={`py-1.5 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'tokens' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Tokens</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: 6 THEME CARDS */}
        {activeTab === 'gallery' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Select a design preset:</span>
              <span className="font-mono text-[10px] text-emerald-400">6 Curated Styles</span>
            </div>

            {themeList.map((preset) => {
              const isSelected = activeThemeId === preset.id;
              return (
                <div
                  key={preset.id}
                  className={`p-3.5 rounded-2xl border transition-all relative ${
                    isSelected 
                      ? 'border-emerald-500 bg-slate-800/80 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/50' 
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  {/* Selected Indicator Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Active</span>
                    </div>
                  )}

                  {/* Theme Title & Tagline */}
                  <div className="pr-16 mb-1.5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{preset.name}</span>
                      <span className="text-[10px] font-normal text-slate-400 font-mono">
                        {preset.isDark ? 'Dark Mode' : 'Light Mode'}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-300 font-medium">{preset.tagline}</p>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                    {preset.description}
                  </p>

                  {/* Color Palette Swatches Preview */}
                  <div className="mb-3">
                    <div className="text-[10px] text-slate-400 mb-1.5 font-medium">Palette Tokens:</div>
                    <div className="flex items-center gap-1.5">
                      <div 
                        className="w-7 h-7 rounded-lg border border-white/20 shadow-sm flex items-center justify-center text-[8px] font-mono text-black font-bold"
                        style={{ backgroundColor: preset.primaryColor }}
                        title={`Primary: ${preset.primaryColor}`}
                      >
                        P
                      </div>
                      <div 
                        className="w-7 h-7 rounded-lg border border-white/20 shadow-sm flex items-center justify-center text-[8px] font-mono text-white font-bold"
                        style={{ backgroundColor: preset.secondaryColor }}
                        title={`Secondary: ${preset.secondaryColor}`}
                      >
                        S
                      </div>
                      <div 
                        className="w-7 h-7 rounded-lg border border-white/20 shadow-sm flex items-center justify-center text-[8px] font-mono text-white font-bold"
                        style={{ backgroundColor: preset.backgroundColor }}
                        title={`Background: ${preset.backgroundColor}`}
                      >
                        BG
                      </div>
                      <div 
                        className="w-7 h-7 rounded-lg border border-white/20 shadow-sm flex items-center justify-center text-[8px] font-mono text-white font-bold"
                        style={{ backgroundColor: preset.surfaceColor.startsWith('#') ? preset.surfaceColor : '#222' }}
                        title={`Surface: ${preset.surfaceColor}`}
                      >
                        SF
                      </div>
                      <div 
                        className="w-7 h-7 rounded-lg border border-white/20 shadow-sm flex items-center justify-center text-[8px] font-mono text-white font-bold"
                        style={{ backgroundColor: preset.recordColor }}
                        title={`Rec Dot: ${preset.recordColor}`}
                      >
                        REC
                      </div>
                    </div>
                  </div>

                  {/* Two Buttons: Select This Design & Preview Full App */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                    <button
                      onClick={() => selectTheme(preset.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-500 text-black shadow-sm'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'Selected' : 'Select Design'}</span>
                    </button>

                    <button
                      onClick={() => {
                        selectTheme(preset.id);
                        setActiveScreen('home');
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview App</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: DEEP CUSTOM DESIGN EDITOR */}
        {activeTab === 'customizer' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Editing: <strong className="text-white">{theme.name}</strong></span>
              <button
                onClick={() => resetToDefault()}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Default</span>
              </button>
            </div>

            {/* Dark / Light Mode Switch */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {theme.isDark ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                <span className="text-xs font-semibold">Color Mode</span>
              </div>
              <button
                onClick={() => {
                  const newDark = !theme.isDark;
                  updateThemeProperty('isDark', newDark);
                  if (!newDark) {
                    updateThemeProperty('backgroundColor', '#f8fafc');
                    updateThemeProperty('surfaceColor', '#ffffff');
                    updateThemeProperty('textColor', '#0f172a');
                    updateThemeProperty('textMuted', '#64748b');
                  } else {
                    updateThemeProperty('backgroundColor', '#0a0c10');
                    updateThemeProperty('surfaceColor', '#131722');
                    updateThemeProperty('textColor', '#f1f5f9');
                    updateThemeProperty('textMuted', '#94a3b8');
                  }
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-700 bg-slate-900 text-slate-200"
              >
                {theme.isDark ? 'Dark Canvas' : 'Light Canvas'}
              </button>
            </div>

            {/* Color Pickers */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-200">Color Palette Tokens</div>

              {/* Primary Color */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Primary Accent</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => updateThemeProperty('primaryColor', e.target.value)}
                    className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={theme.primaryColor}
                    onChange={(e) => updateThemeProperty('primaryColor', e.target.value)}
                    className="w-20 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Secondary Accent</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => updateThemeProperty('secondaryColor', e.target.value)}
                    className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={theme.secondaryColor}
                    onChange={(e) => updateThemeProperty('secondaryColor', e.target.value)}
                    className="w-20 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Background Canvas</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.backgroundColor.startsWith('#') ? theme.backgroundColor : '#0a0c10'}
                    onChange={(e) => updateThemeProperty('backgroundColor', e.target.value)}
                    className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={theme.backgroundColor}
                    onChange={(e) => updateThemeProperty('backgroundColor', e.target.value)}
                    className="w-20 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono"
                  />
                </div>
              </div>

              {/* Recording Button Color */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Record REC Dot</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.recordColor}
                    onChange={(e) => updateThemeProperty('recordColor', e.target.value)}
                    className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={theme.recordColor}
                    onChange={(e) => updateThemeProperty('recordColor', e.target.value)}
                    className="w-20 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Card & Surface Geometry */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-200">Surfaces & Geometry</div>

              {/* Card Style */}
              <div>
                <div className="text-[11px] text-slate-400 mb-1.5">Card Style</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['bordered', 'flat', 'elevated', 'glass'] as CardStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateThemeProperty('cardStyle', style)}
                      className={`py-1.5 text-[10px] font-semibold rounded-lg border capitalize ${
                        theme.cardStyle === style
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Shape */}
              <div>
                <div className="text-[11px] text-slate-400 mb-1.5">Button Shape</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full'] as ButtonShape[]).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => updateThemeProperty('buttonShape', shape)}
                      className={`py-1.5 text-[9px] font-semibold rounded-lg border ${
                        theme.buttonShape === shape
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {shape.replace('rounded-', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Corner Radius Slider */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Corner Radius</span>
                  <span className="font-mono text-emerald-400">{theme.borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="28"
                  value={theme.borderRadius}
                  onChange={(e) => updateThemeProperty('borderRadius', Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Recorder Button & Floating Widget Controls */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-200">Recorder UX Controls</div>

              {/* Recording Button Design */}
              <div>
                <div className="text-[11px] text-slate-400 mb-1.5">Recording Button Style</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'studio-ring', label: 'Studio Ring' },
                    { id: 'pulse-radar', label: 'Pulse Radar' },
                    { id: 'classic-red', label: 'Classic Red' },
                    { id: 'minimalist-core', label: 'Minimal Core' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => updateThemeProperty('recordButtonDesign', btn.id as any)}
                      className={`py-1.5 text-[10px] font-semibold rounded-lg border ${
                        theme.recordButtonDesign === btn.id
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Overlay Widget Style */}
              <div>
                <div className="text-[11px] text-slate-400 mb-1.5">Floating Overlay Controller</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'pill', label: 'Mini Pill' },
                    { id: 'circular-bubble', label: 'Bubble Circle' },
                    { id: 'floating-badge', label: 'Compact Badge' },
                  ].map((ctrl) => (
                    <button
                      key={ctrl.id}
                      onClick={() => updateThemeProperty('floatingControlsStyle', ctrl.id as any)}
                      className={`py-1.5 text-[9px] font-semibold rounded-lg border ${
                        theme.floatingControlsStyle === ctrl.id
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {ctrl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Save & Reset Actions Bar */}
            <div className="pt-2 space-y-2">
              <button
                onClick={saveDesign}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40 hover:bg-emerald-400 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Design Configuration</span>
              </button>

              <button
                onClick={() => resetToDefault()}
                className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Preset Default</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE TOKENS INSPECTOR */}
        {activeTab === 'tokens' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Design Tokens (JSON)</span>
              <button
                onClick={handleCopyTokens}
                className="px-2 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1 text-[10px] font-mono border border-slate-700"
              >
                {copiedTokens ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedTokens ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-[460px]">
              {JSON.stringify(theme, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-400">
        <span>Active: <strong className="text-white">{theme.name}</strong></span>
        <button
          onClick={onOpenCiModal}
          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
        >
          <span>APK Build Guide</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
