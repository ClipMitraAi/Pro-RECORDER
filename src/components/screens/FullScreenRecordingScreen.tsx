import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Pause, 
  Play, 
  Square, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Edit3, 
  Trash2, 
  RotateCcw,
  Volume2,
  X,
  ChevronDown
} from 'lucide-react';

export const FullScreenRecordingScreen: React.FC = () => {
  const { theme, setActiveScreen } = useTheme();
  const [isRecording, setIsRecording] = useState(true);
  const [seconds, setSeconds] = useState(14);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#ef4444');
  const [brushSize, setBrushSize] = useState(4);
  const [floatingMinimized, setFloatingMinimized] = useState(false);

  // Canvas for drawing annotations
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPaintingRef = useRef(false);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setActiveScreen('recordings');
  };

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isPaintingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPaintingRef.current || !canvasRef.current || !isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    isPaintingRef.current = false;
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-slate-950 flex flex-col justify-between">
      {/* Simulated Screen Content: Cyber / Game Screen in background */}
      <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-between p-4 pointer-events-none">
        {/* Animated Gaming / App Simulation */}
        <div className="flex items-center justify-between opacity-80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow">
              PRO
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">CYBER STRIKE 3D</div>
              <div className="text-[10px] text-slate-400">Match 14 · Rank Master</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-emerald-400">FPS: 59.8</div>
            <div className="text-[10px] text-slate-400">Ping: 22ms</div>
          </div>
        </div>

        {/* Center Game Graphic Simulation */}
        <div className="flex flex-col items-center justify-center my-auto opacity-75">
          <div className="w-36 h-36 rounded-full border-2 border-indigo-500/30 flex items-center justify-center relative">
            <div className="w-28 h-28 rounded-full border border-dashed border-cyan-400/40 animate-spin flex items-center justify-center" />
            <div className="absolute w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-white text-xs font-mono font-bold">
              REC
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 font-mono">Simulated Game Activity Feed</p>
        </div>

        {/* Bottom Game HUD elements */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
          <span>HEALTH: 100/100</span>
          <span>SCORE: 18,450</span>
          <span>ZONE 3</span>
        </div>
      </div>

      {/* Interactive Drawing Canvas Layer */}
      <canvas
        ref={canvasRef}
        width={380}
        height={650}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={`absolute inset-0 z-10 w-full h-full ${isDrawing ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'}`}
      />

      {/* Facecam Floating Overlay (Top-Right) */}
      {isCameraOn && (
        <div 
          className="absolute top-12 right-3 z-20 shadow-xl border-2 overflow-hidden transition-all"
          style={{
            borderColor: theme.primaryColor,
            borderRadius: theme.borderRadius > 16 ? '9999px' : '16px',
            width: '84px',
            height: '84px',
            backgroundColor: '#0a0d14',
          }}
        >
          {/* Simulated Webcam Stream pattern */}
          <div className="w-full h-full relative bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center text-white">
            <div className="w-7 h-7 rounded-full bg-slate-700/80 border border-white/20 flex items-center justify-center text-[10px] font-bold">
              👤
            </div>
            <span className="text-[9px] font-medium text-slate-300 mt-1">Facecam</span>
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>
      )}

      {/* Top Recording Status Pill & Audio Waveform */}
      <div className="relative z-20 pt-2 px-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 px-2.5 py-1 rounded-full shadow-md backdrop-blur-md border"
          style={{
            backgroundColor: `${theme.surfaceColor}E6`,
            borderColor: theme.surfaceBorder,
            color: theme.textColor,
          }}
        >
          <div 
            className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'animate-pulse' : ''}`}
            style={{ backgroundColor: theme.recordColor }}
          />
          <span className="text-xs font-mono font-bold tracking-wider">
            {formatTimer(seconds)}
          </span>
          <span className="text-[10px] font-semibold text-red-500 uppercase">
            {isRecording ? 'REC' : 'PAUSED'}
          </span>
        </div>

        {/* Live Audio Waveform meter */}
        <div 
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full backdrop-blur-md border"
          style={{
            backgroundColor: `${theme.surfaceColor}E6`,
            borderColor: theme.surfaceBorder,
          }}
        >
          <Volume2 className="w-3 h-3" style={{ color: isMicOn ? theme.primaryColor : '#94a3b8' }} />
          <div className="flex items-end gap-0.5 h-3 w-10">
            {[4, 10, 7, 12, 6, 9].map((height, idx) => (
              <div
                key={idx}
                className="w-1 rounded-full transition-all duration-150"
                style={{
                  height: isRecording && isMicOn ? `${height}px` : '2px',
                  backgroundColor: isMicOn ? theme.primaryColor : '#64748b',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Drawing Tools Palette (appears when brush active) */}
      {isDrawing && (
        <div 
          className="relative z-20 mx-3 p-2 rounded-xl backdrop-blur-md border flex items-center justify-between shadow-xl"
          style={{
            backgroundColor: `${theme.surfaceColor}F2`,
            borderColor: theme.surfaceBorder,
          }}
        >
          <div className="flex items-center gap-1.5">
            {['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#ffffff'].map((c) => (
              <button
                key={c}
                onClick={() => setBrushColor(c)}
                className={`w-5 h-5 rounded-full border-2 transition-transform ${brushColor === c ? 'scale-110 border-white' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCanvas}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={() => setIsDrawing(false)}
              className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Recorder Control Bar */}
      <div className="relative z-20 px-3 pb-3">
        {/* Render floating controls according to theme.floatingControlsStyle */}
        {theme.floatingControlsStyle === 'circular-bubble' ? (
          <div className="flex items-center justify-between gap-2">
            <div 
              className="flex items-center gap-2 p-1.5 rounded-full shadow-2xl backdrop-blur-lg border mx-auto"
              style={{
                backgroundColor: `${theme.surfaceColor}F2`,
                borderColor: theme.surfaceBorder,
              }}
            >
              {/* Pause / Resume */}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90"
                style={{ backgroundColor: theme.surfaceSubtle, color: theme.textColor }}
                title={isRecording ? 'Pause' : 'Resume'}
              >
                {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              {/* Stop Recording */}
              <button
                onClick={handleStopRecording}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 text-white"
                style={{ backgroundColor: theme.recordColor }}
                title="Stop & Save"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>

              {/* Toggle Mic */}
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90"
                style={{ backgroundColor: theme.surfaceSubtle, color: isMicOn ? theme.primaryColor : '#ef4444' }}
                title="Toggle Mic"
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              {/* Toggle Brush */}
              <button
                onClick={() => setIsDrawing(!isDrawing)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90"
                style={{ backgroundColor: isDrawing ? theme.primaryColor : theme.surfaceSubtle, color: isDrawing ? '#000' : theme.textColor }}
                title="Draw on Screen"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              {/* Toggle Facecam */}
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90"
                style={{ backgroundColor: theme.surfaceSubtle, color: isCameraOn ? theme.primaryColor : '#94a3b8' }}
                title="Toggle Cam"
              >
                {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : (
          /* Pill / Floating Badge Style */
          <div 
            className="p-2.5 rounded-2xl shadow-2xl backdrop-blur-lg border flex items-center justify-between"
            style={{
              backgroundColor: `${theme.surfaceColor}F2`,
              borderColor: theme.surfaceBorder,
              borderRadius: `${theme.borderRadius + 4}px`,
            }}
          >
            <div className="flex items-center gap-2">
              {/* Pause / Resume */}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className="p-2 rounded-xl flex items-center justify-center transition-colors"
                style={{ backgroundColor: theme.surfaceSubtle, color: theme.textColor }}
              >
                {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              {/* Stop & Save */}
              <button
                onClick={handleStopRecording}
                className="px-3.5 py-2 rounded-xl flex items-center gap-1.5 font-bold text-xs text-white shadow"
                style={{ backgroundColor: theme.recordColor }}
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Mic toggle */}
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className="p-2 rounded-xl transition-colors"
                style={{ 
                  backgroundColor: theme.surfaceSubtle, 
                  color: isMicOn ? theme.primaryColor : '#ef4444' 
                }}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              {/* Facecam toggle */}
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className="p-2 rounded-xl transition-colors"
                style={{ 
                  backgroundColor: theme.surfaceSubtle, 
                  color: isCameraOn ? theme.primaryColor : '#94a3b8' 
                }}
              >
                {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </button>

              {/* Brush */}
              <button
                onClick={() => setIsDrawing(!isDrawing)}
                className="p-2 rounded-xl transition-colors"
                style={{ 
                  backgroundColor: isDrawing ? theme.primaryColor : theme.surfaceSubtle, 
                  color: isDrawing ? (theme.isDark ? '#000' : '#fff') : theme.textColor 
                }}
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
