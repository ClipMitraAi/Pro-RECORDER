import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  ArrowLeft, 
  Mic, 
  Volume2, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  Radio, 
  Check, 
  VolumeX,
  Play
} from 'lucide-react';

export const AudioSettingsScreen: React.FC = () => {
  const { theme, setActiveScreen } = useTheme();

  // Audio states
  const [internalAudio, setInternalAudio] = useState(true);
  const [micAudio, setMicAudio] = useState(true);
  const [mode, setMode] = useState<'mixed' | 'mic-only' | 'internal-only'>('mixed');
  const [micGain, setMicGain] = useState(4); // dB
  const [balance, setBalance] = useState(50); // 50% internal / 50% mic
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [sampleRate, setSampleRate] = useState<'48000' | '44100'>('48000');
  const [bitrate, setBitrate] = useState<'320' | '256' | '192'>('320');
  const [isTestingMic, setIsTestingMic] = useState(false);

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
            <span>Audio Configuration</span>
          </button>
          <span className="text-[10px] font-mono" style={{ color: theme.primaryColor }}>
            {sampleRate === '48000' ? '48 kHz Studio' : '44.1 kHz'}
          </span>
        </div>

        {/* Audio Mode Selector */}
        <div 
          className="p-3 rounded-xl border mb-3"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="text-xs font-semibold mb-2">Recording Audio Sources</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'mixed', label: 'Internal + Mic', sub: 'Combined' },
              { id: 'mic-only', label: 'Mic Only', sub: 'Voiceover' },
              { id: 'internal-only', label: 'Internal Only', sub: 'System Sound' },
            ].map((m) => {
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className="p-2 rounded-lg border text-left transition-all"
                  style={{
                    backgroundColor: isSelected ? `${theme.primaryColor}18` : theme.surfaceSubtle,
                    borderColor: isSelected ? theme.primaryColor : theme.surfaceBorder,
                  }}
                >
                  <div className="text-[11px] font-bold" style={{ color: isSelected ? theme.primaryColor : theme.textColor }}>
                    {m.label}
                  </div>
                  <div className="text-[9px]" style={{ color: theme.textMuted }}>{m.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Audio Meter & Sensitivity Test */}
        <div 
          className="p-3 rounded-xl border mb-3"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">Live Mic Sensitivity Meter</span>
            <button
              onClick={() => setIsTestingMic(!isTestingMic)}
              className="text-[10px] font-bold px-2 py-0.5 rounded border transition-colors"
              style={{
                borderColor: theme.primaryColor,
                color: isTestingMic ? '#fff' : theme.primaryColor,
                backgroundColor: isTestingMic ? theme.primaryColor : 'transparent',
              }}
            >
              {isTestingMic ? 'Stop Test' : 'Test Mic'}
            </button>
          </div>

          {/* VU Meter Bars */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] w-8 font-mono" style={{ color: theme.textMuted }}>CH 1</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden flex bg-slate-900 border border-slate-800">
                <div 
                  className="h-full transition-all duration-150 rounded-full"
                  style={{
                    width: isTestingMic ? '76%' : '32%',
                    backgroundColor: theme.primaryColor,
                  }}
                />
              </div>
              <span className="text-[10px] font-mono text-emerald-400">-6 dB</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] w-8 font-mono" style={{ color: theme.textMuted }}>CH 2</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden flex bg-slate-900 border border-slate-800">
                <div 
                  className="h-full transition-all duration-150 rounded-full"
                  style={{
                    width: isTestingMic ? '68%' : '28%',
                    backgroundColor: theme.secondaryColor,
                  }}
                />
              </div>
              <span className="text-[10px] font-mono text-emerald-400">-8 dB</span>
            </div>
          </div>
        </div>

        {/* Sliders for Gain & Balance */}
        <div 
          className="p-3 rounded-xl border mb-3 space-y-3"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          {/* Mic Gain */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold">Microphone Gain</span>
              <span className="font-mono font-bold" style={{ color: theme.primaryColor }}>
                {micGain > 0 ? `+${micGain}` : micGain} dB
              </span>
            </div>
            <input
              type="range"
              min="-12"
              max="12"
              value={micGain}
              onChange={(e) => setMicGain(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-0.5">
              <span>-12 dB</span>
              <span>0 dB (Unity)</span>
              <span>+12 dB Boost</span>
            </div>
          </div>

          {/* Balance Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold">Audio Mixing Balance</span>
              <span className="text-[10px]" style={{ color: theme.textMuted }}>
                Internal {100 - balance}% · Mic {balance}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full accent-cyan-500 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* DSP Enhancements & Sampling Rate */}
        <div 
          className="p-3 rounded-xl border mb-3 space-y-2.5"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: theme.surfaceBorder,
            borderRadius: `${theme.borderRadius}px`,
          }}
        >
          <div className="text-xs font-semibold">DSP & Hardware Processing</div>

          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-[11px]">AI Background Noise Suppression</span>
            <input
              type="checkbox"
              checked={noiseReduction}
              onChange={() => setNoiseReduction(!noiseReduction)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-[11px]">Acoustic Echo Cancellation (AEC)</span>
            <input
              type="checkbox"
              checked={echoCancellation}
              onChange={() => setEchoCancellation(!echoCancellation)}
              className="w-4 h-4 rounded accent-emerald-500"
            />
          </label>

          <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: theme.surfaceBorder }}>
            <span className="text-[11px]">Sample Rate</span>
            <div className="flex items-center gap-1.5">
              {['44100', '48000'].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSampleRate(rate as any)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-colors"
                  style={{
                    backgroundColor: sampleRate === rate ? theme.primaryColor : theme.surfaceSubtle,
                    color: sampleRate === rate ? (theme.isDark ? '#000' : '#fff') : theme.textMuted,
                    borderColor: sampleRate === rate ? theme.primaryColor : theme.surfaceBorder,
                  }}
                >
                  {rate === '48000' ? '48kHz' : '44.1kHz'}
                </button>
              ))}
            </div>
          </div>
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
        <span>Save Audio Profile</span>
      </button>
    </div>
  );
};
