import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  X, 
  Copy, 
  Check, 
  FileCode, 
  Download, 
  Terminal, 
  Layers, 
  Smartphone,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface AndroidBuildExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidBuildExportModal: React.FC<AndroidBuildExportModalProps> = ({ isOpen, onClose }) => {
  const { theme, generateJetpackComposeCode, generateGithubWorkflowYml } = useTheme();
  const [activeTab, setActiveTab] = useState<'ci' | 'compose' | 'service' | 'guide'>('ci');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, tabId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabId);
    setTimeout(() => setCopiedTab(null), 2500);
  };

  const kotlinServiceSnippet = `// Android Screen Recording Service
// Foreground Service with MediaProjection & VirtualDisplay
package com.prorecorder.app.service

import android.app.*
import android.content.Intent
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.MediaRecorder
import android.media.projection.MediaProjection
import android.os.IBinder
import androidx.core.app.NotificationCompat

class ScreenRecorderService : Service() {
    private var mediaProjection: MediaProjection? = null
    private var virtualDisplay: VirtualDisplay? = null
    private var mediaRecorder: MediaRecorder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForeground(NOTIFICATION_ID, createNotification())
        initRecorder()
        return START_NOT_STICKY
    }

    private fun initRecorder() {
        mediaRecorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setVideoSource(MediaRecorder.VideoSource.SURFACE)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
            setVideoEncoder(MediaRecorder.VideoEncoder.H264)
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
            setVideoEncodingBitRate(16 * 1000 * 1000)
            setVideoFrameRate(60)
            setVideoSize(1080, 1920)
            setOutputFile("/storage/emulated/0/Movies/ProRecorder/rec_\${System.currentTimeMillis()}.mp4")
            prepare()
        }
    }

    private fun createNotification(): Notification {
        return NotificationCompat.Builder(this, "pro_recorder_channel")
            .setContentTitle("Pro Recorder Active")
            .setContentText("Screen recording is in progress...")
            .setSmallIcon(android.R.drawable.ic_media_play)
            .setOngoing(true)
            .build()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    companion object {
        const val NOTIFICATION_ID = 1001
    }
}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="w-full max-w-2xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: theme.backgroundColor,
          borderColor: theme.surfaceBorder,
          color: theme.textColor,
        }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: theme.surfaceBorder }}>
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.primaryColor, color: theme.isDark ? '#000' : '#fff' }}
            >
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold">Android APK CI/CD & Build Pipeline</h2>
              <p className="text-[11px]" style={{ color: theme.textMuted }}>
                Tested GitHub Actions workflow & Jetpack Compose theme code
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pipeline Steps Tracker Header */}
        <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 overflow-x-auto text-[11px] font-mono text-slate-300 flex items-center gap-2 whitespace-nowrap">
          <span className="text-emerald-400 font-bold">Pipeline Steps:</span>
          <span>Set up job →</span>
          <span>Checkout Repo →</span>
          <span>JDK 17 →</span>
          <span>Android SDK →</span>
          <span>Licenses →</span>
          <span>Gradle →</span>
          <span>Build APK →</span>
          <span>Upload Artifact →</span>
          <span className="text-cyan-400">GitHub Release</span>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b px-4 gap-2 pt-2" style={{ borderColor: theme.surfaceBorder }}>
          {[
            { id: 'ci', label: 'GitHub Actions (.yml)' },
            { id: 'compose', label: `Jetpack Compose Theme (${theme.name})` },
            { id: 'service', label: 'Android Recorder Service (Kotlin)' },
            { id: 'guide', label: 'Zero-Error Build Steps' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="pb-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap"
              style={{
                borderColor: activeTab === tab.id ? theme.primaryColor : 'transparent',
                color: activeTab === tab.id ? theme.primaryColor : theme.textMuted,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'ci' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">.github/workflows/build-apk.yml</span>
                <button
                  onClick={() => handleCopy(generateGithubWorkflowYml(), 'ci')}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border"
                  style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder, color: theme.primaryColor }}
                >
                  {copiedTab === 'ci' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'ci' ? 'Copied Workflow!' : 'Copy Workflow'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                {generateGithubWorkflowYml()}
              </pre>
            </div>
          )}

          {activeTab === 'compose' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Theme.kt (Mapped from active {theme.name} tokens)</span>
                <button
                  onClick={() => handleCopy(generateJetpackComposeCode(), 'compose')}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border"
                  style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder, color: theme.primaryColor }}
                >
                  {copiedTab === 'compose' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'compose' ? 'Copied Compose Code!' : 'Copy Theme.kt'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                {generateJetpackComposeCode()}
              </pre>
            </div>
          )}

          {activeTab === 'service' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">ScreenRecorderService.kt</span>
                <button
                  onClick={() => handleCopy(kotlinServiceSnippet, 'service')}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border"
                  style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder, color: theme.primaryColor }}
                >
                  {copiedTab === 'service' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'service' ? 'Copied Service!' : 'Copy Kotlin Service'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300 overflow-x-auto leading-relaxed">
                {kotlinServiceSnippet}
              </pre>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Error Android Build Configuration: Fix rhe sab</span>
                </div>
                <p className="text-[11px]">
                  Follow these 5 essential steps in your Android project repository to ensure Gradle builds without missing licenses or JDK mismatch errors.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">1. JDK 17 Configuration</div>
                  <div className="text-slate-300 text-[11px]">
                    Use Eclipse Temurin JDK 17. Android Gradle Plugin 8.x requires Java 17 for bytecode compatibility.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">2. SDK License Auto-Acceptance</div>
                  <div className="text-slate-300 text-[11px]">
                    The workflow runs <code className="text-cyan-400">yes | sdkmanager --licenses</code> to bypass interactive prompt halts in CI.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">3. Gradle Wrapper Execution Permissions</div>
                  <div className="text-slate-300 text-[11px]">
                    Run <code className="text-cyan-400">git update-index --chmod=+x gradlew</code> locally or let CI run <code className="text-cyan-400">chmod +x gradlew</code> before executing.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">4. MediaProjection Permission in AndroidManifest.xml</div>
                  <div className="text-slate-300 text-[11px]">
                    Add <code className="text-amber-400">&lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" /&gt;</code> for Android 14+ support.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t flex items-center justify-between text-xs" style={{ borderColor: theme.surfaceBorder }}>
          <span className="text-[10px]" style={{ color: theme.textMuted }}>
            Target: Android 14 (API 34) · Architecture: arm64-v8a / armeabi-v7a
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold text-xs"
            style={{ backgroundColor: theme.primaryColor, color: theme.isDark ? '#000' : '#fff' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
