import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  ArrowLeft, 
  Scissors, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  RotateCw, 
  Crop, 
  Check, 
  Clock,
  Sparkles,
  Sliders
} from 'lucide-react';

export const VideoEditorScreen: React.FC = () => {
  const { theme, setActiveScreen } = useTheme();

  // Trimmer states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(25); // 0-100%
  const [trimStart, setTrimStart] = useState(10);
  const [trimEnd, setTrimEnd] = useState(85);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<'1080p' | '4k' | '720p'>('1080p');

  const startExportSimulation = () => {
    setIsExporting(true);
    setExportProgress(10);
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <div 
      className="h-full flex flex-col justify-between overflow-y-auto p-3 select-none"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b mb-2" style={{ borderColor: theme.surfaceBorder }}>
          <button
            onClick={() => setActiveScreen('recordings')}
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: theme.textColor }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Pro Studio Editor</span>
          </button>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
            style={{
              backgroundColor: theme.primaryColor,
              color: theme.isDark ? '#000' : '#fff',
            }}
          >
            <Download className="w-3 h-3" />
            <span>Export MP4</span>
          </button>
        </div>

        {/* Video Canvas Stage Preview */}
        <div className="relative w-full h-44 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden mb-3 flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-purple-900/30 to-slate-900 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
          </div>

          {/* Timecode overlay */}
          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 font-mono text-[9px] text-white">
            00:01:24 / 00:04:18
          </div>

          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 font-mono text-[9px] text-emerald-400">
            {playbackSpeed}x SPEED
          </div>
        </div>

        {/* Multi-Track Trimmer Timeline */}
        <div 
          className="p-3 rounded-xl border mb-3"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
              <span>Timeline Trimmer</span>
            </span>
            <span className="text-[10px] font-mono" style={{ color: theme.textMuted }}>
              Trim: {trimStart}% – {trimEnd}%
            </span>
          </div>

          {/* Draggable Scrubber Timeline */}
          <div className="relative h-14 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex items-center">
            {/* Visual Waveform track */}
            <div className="absolute inset-0 flex items-center justify-around opacity-40 px-2 pointer-events-none">
              {[6, 14, 8, 22, 16, 28, 12, 24, 18, 30, 10, 20, 14, 26, 8, 16, 22, 12, 18, 24].map((h, i) => (
                <div key={i} className="w-1 rounded-full bg-cyan-400" style={{ height: `${h}px` }} />
              ))}
            </div>

            {/* Inactive Dimmed Left Region */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-black/70 border-r-2" 
              style={{ width: `${trimStart}%`, borderColor: theme.primaryColor }} 
            />

            {/* Inactive Dimmed Right Region */}
            <div 
              className="absolute right-0 top-0 bottom-0 bg-black/70 border-l-2" 
              style={{ width: `${100 - trimEnd}%`, borderColor: theme.primaryColor }} 
            />

            {/* Active Playhead needle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-md z-10"
              style={{ left: `${playhead}%` }}
            >
              <div className="w-2.5 h-2.5 -ml-1 rounded-full bg-red-500" />
            </div>
          </div>

          {/* Quick Trim Range Sliders */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <span className="text-[9px] text-slate-400">Trim Start Handle</span>
              <input
                type="range"
                min="0"
                max="45"
                value={trimStart}
                onChange={(e) => setTrimStart(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 rounded cursor-pointer"
              />
            </div>
            <div>
              <span className="text-[9px] text-slate-400">Trim End Handle</span>
              <input
                type="range"
                min="55"
                max="100"
                value={trimEnd}
                onChange={(e) => setTrimEnd(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Speed & Audio controls */}
        <div 
          className="p-3 rounded-xl border mb-3 space-y-2.5"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          {/* Speed Presets */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">Playback Speed</span>
            <div className="flex items-center gap-1">
              {[0.5, 1.0, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setPlaybackSpeed(s)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-colors"
                  style={{
                    backgroundColor: playbackSpeed === s ? theme.primaryColor : theme.surfaceSubtle,
                    color: playbackSpeed === s ? (theme.isDark ? '#000' : '#fff') : theme.textMuted,
                    borderColor: playbackSpeed === s ? theme.primaryColor : theme.surfaceBorder,
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Mute Audio track toggle */}
          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: theme.surfaceBorder }}>
            <span className="text-xs">Original Soundtrack</span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-semibold border"
              style={{
                backgroundColor: isMuted ? '#ef444422' : theme.surfaceSubtle,
                borderColor: isMuted ? '#ef4444' : theme.surfaceBorder,
                color: isMuted ? '#ef4444' : theme.textColor,
              }}
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              <span>{isMuted ? 'Muted' : 'Enabled'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
          <div 
            className="w-full max-w-sm rounded-2xl border p-4 shadow-2xl space-y-3"
            style={{
              backgroundColor: theme.backgroundColor,
              borderColor: theme.surfaceBorder,
              color: theme.textColor,
            }}
          >
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: theme.surfaceBorder }}>
              <div className="font-bold text-xs">Export Studio Render</div>
              <button 
                onClick={() => { setShowExportModal(false); setExportProgress(0); }}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Quality Presets */}
            <div>
              <div className="text-[11px] font-semibold mb-1.5">Export Quality Preset</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1080p', label: '1080p 60fps', size: '~240 MB' },
                  { id: '4k', label: '4K Ultra', size: '~680 MB' },
                  { id: '720p', label: '720p Social', size: '~95 MB' },
                ].map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuality(q.id as any)}
                    className="p-1.5 rounded-lg border text-left transition-colors"
                    style={{
                      backgroundColor: selectedQuality === q.id ? `${theme.primaryColor}18` : theme.surfaceSubtle,
                      borderColor: selectedQuality === q.id ? theme.primaryColor : theme.surfaceBorder,
                    }}
                  >
                    <div className="text-[10px] font-bold" style={{ color: selectedQuality === q.id ? theme.primaryColor : theme.textColor }}>
                      {q.label}
                    </div>
                    <div className="text-[8px] text-slate-400 font-mono">{q.size}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar if rendering */}
            {isExporting || exportProgress > 0 ? (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono">
                  <span>{exportProgress < 100 ? 'Rendering MP4 with Android Hardware H.264...' : 'Export Complete!'}</span>
                  <span className="font-bold text-emerald-400">{exportProgress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            ) : null}

            {exportProgress === 100 ? (
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Video saved to /storage/emulated/0/Movies/ProRecorder</span>
              </div>
            ) : (
              <button
                onClick={startExportSimulation}
                disabled={isExporting}
                className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: theme.isDark ? '#000' : '#fff',
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Exporting...' : 'Start Render'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
