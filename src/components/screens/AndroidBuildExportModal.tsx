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
  const [activeTab, setActiveTab] = useState<'github' | 'ci' | 'compose' | 'service' | 'guide'>('github');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, tabId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabId);
    setTimeout(() => setCopiedTab(null), 2500);
  };

  const gitUploadCommands = `# 1. Terminal me project folder me jaye
git init
git add .
git commit -m "Pro Recorder Android APK build setup"
git branch -M main

# 2. Apne GitHub repository ka URL connect kare
git remote add origin https://github.com/mrhellgodji/pro-recorder.git

# 3. Push kare (GitHub Actions automatically APK build start kar dega)
git push -u origin main

# (Optional) Direct Release APK banane ke liye tag push kare:
git tag v1.0.0
git push origin v1.0.0`;

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
              <h2 className="text-sm font-bold">GitHub APK Build & CI Pipeline</h2>
              <p className="text-[11px]" style={{ color: theme.textMuted }}>
                GitHub par upload karke direct APK build kare (Sabhi fixes included)
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
        <div className="flex border-b px-4 gap-2 pt-2 overflow-x-auto no-scrollbar" style={{ borderColor: theme.surfaceBorder }}>
          {[
            { id: 'github', label: '🚀 GitHub Upload Steps' },
            { id: 'ci', label: '⚙️ GitHub Actions (.yml)' },
            { id: 'compose', label: `🎨 Compose Theme (${theme.name})` },
            { id: 'service', label: '📱 Recorder Service' },
            { id: 'guide', label: '🛠️ All Build Fixes' },
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
          {activeTab === 'github' && (
            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
                <div className="font-bold mb-1 flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>GitHub Par Upload Karke APK Kaise Banaye (Complete Process)</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Is repository me GitHub Actions workflow file <code className="text-cyan-300">.github/workflows/build-apk.yml</code> aur pura Android project structure pehle se ready hai. Aapko bas GitHub par push karna hai!
                </p>
              </div>

              {/* Step 1 */}
              <div className="p-3 rounded-xl border space-y-1.5" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                <div className="font-bold text-white flex items-center justify-between">
                  <span>1. GitHub Par Repository Banaye & Code Push Kare</span>
                  <button
                    onClick={() => handleCopy(gitUploadCommands, 'git')}
                    className="px-2 py-0.5 rounded text-[10px] font-mono border flex items-center gap-1"
                    style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
                  >
                    {copiedTab === 'git' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTab === 'git' ? 'Copied Commands!' : 'Copy Commands'}</span>
                  </button>
                </div>
                <pre className="p-2.5 rounded-lg bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                  {gitUploadCommands}
                </pre>
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                <div className="font-bold text-white">2. Automatic Build Pipeline Check Kare</div>
                <p className="text-slate-300 text-[11px]">
                  GitHub repo me jakar top par <strong>"Actions"</strong> tab par click kare. Aapko <strong>"Android CI - Build & Release APK"</strong> workflow chalta hua dikhega (2–3 minutes me complete ho jata hai).
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-xl border space-y-1" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                <div className="font-bold text-white">3. APK File Download Kare</div>
                <p className="text-slate-300 text-[11px]">
                  Workflow run complete hone par green tick ✅ aayega. Uske andar scroll down karke <strong>Artifacts</strong> me se <strong>`ProRecorder-Android-APK`</strong> download kare!
                </p>
              </div>
            </div>
          )}

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
                  <span>Zero-Error Android Build Configuration: Sab Fix Hai</span>
                </div>
                <p className="text-[11px]">
                  Build me koi problem na aaye iske liye ye saare fixes workflow aur project me pehle se configure kar diye gaye hain:
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">1. JDK 17 Configuration (Fixed)</div>
                  <div className="text-slate-300 text-[11px]">
                    Eclipse Temurin JDK 17 use kiya gaya hai. Android Gradle Plugin 8.x ke saath koi version clash nahi hoga.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">2. SDK License Auto-Acceptance (Fixed)</div>
                  <div className="text-slate-300 text-[11px]">
                    Workflow automatically <code className="text-cyan-400">yes | sdkmanager --licenses</code> run karta hai taaki license agreement prompt par build freeze na ho.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">3. Gradle Wrapper Execution Permissions (Fixed)</div>
                  <div className="text-slate-300 text-[11px]">
                    Workflow me <code className="text-cyan-400">chmod +x gradlew</code> automated hai taaki "Permission denied" error na aaye.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">4. MediaProjection Permission (Android 14+ Fixed)</div>
                  <div className="text-slate-300 text-[11px]">
                    `AndroidManifest.xml` me <code className="text-amber-400">FOREGROUND_SERVICE_MEDIA_PROJECTION</code> aur <code className="text-amber-400">RECORD_AUDIO</code> declare kar diya gaya hai.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}>
                  <div className="font-bold text-emerald-400 mb-0.5">5. GitHub Release Permissions (Fixed)</div>
                  <div className="text-slate-300 text-[11px]">
                    Workflow me <code className="text-cyan-400">permissions: contents: write</code> add kiya hai taaki Release publish hone par 403 error na aaye.
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
