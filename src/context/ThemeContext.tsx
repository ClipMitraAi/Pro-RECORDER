import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeConfig, ThemeId, THEME_PRESETS, AppScreenId } from '../types/theme';

interface ThemeContextType {
  theme: ThemeConfig;
  activeThemeId: ThemeId;
  activeScreen: AppScreenId;
  setActiveScreen: (screen: AppScreenId) => void;
  selectTheme: (id: ThemeId) => void;
  updateThemeProperty: <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => void;
  saveDesign: () => void;
  resetToDefault: (themeId?: ThemeId) => void;
  isModified: boolean;
  toastMessage: string | null;
  dismissToast: () => void;
  generateJetpackComposeCode: () => string;
  generateGithubWorkflowYml: () => string;
}

const STORAGE_THEME_ID_KEY = 'pro_recorder_active_theme_id_v1';
const STORAGE_CUSTOM_THEMES_KEY = 'pro_recorder_custom_themes_v1';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial theme ID from storage or default to 'midnight-pro'
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_THEME_ID_KEY) as ThemeId | null;
      if (savedId && THEME_PRESETS[savedId]) {
        return savedId;
      }
    } catch {
      // LocalStorage fallback
    }
    return 'midnight-pro';
  });

  // Load custom overrides from storage if any
  const [customThemes, setCustomThemes] = useState<Partial<Record<ThemeId, ThemeConfig>>>(() => {
    try {
      const savedCustom = localStorage.getItem(STORAGE_CUSTOM_THEMES_KEY);
      if (savedCustom) {
        return JSON.parse(savedCustom);
      }
    } catch {
      // Ignore
    }
    return {};
  });

  const [activeScreen, setActiveScreen] = useState<AppScreenId>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Current active theme configuration
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    return customThemes[activeThemeId] || THEME_PRESETS[activeThemeId];
  });

  // Track if current settings differ from saved or preset
  const isModified = JSON.stringify(theme) !== JSON.stringify(THEME_PRESETS[activeThemeId]);

  // Sync theme when activeThemeId changes
  useEffect(() => {
    const target = customThemes[activeThemeId] || THEME_PRESETS[activeThemeId];
    setTheme(target);
  }, [activeThemeId, customThemes]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const selectTheme = (id: ThemeId) => {
    setActiveThemeId(id);
    const target = customThemes[id] || THEME_PRESETS[id];
    setTheme(target);
    try {
      localStorage.setItem(STORAGE_THEME_ID_KEY, id);
    } catch {
      // Ignore storage errors
    }
    showToast('Your design has been selected.');
  };

  const updateThemeProperty = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    setTheme((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveDesign = () => {
    const updated = {
      ...customThemes,
      [theme.id]: theme,
    };
    setCustomThemes(updated);
    try {
      localStorage.setItem(STORAGE_CUSTOM_THEMES_KEY, JSON.stringify(updated));
      localStorage.setItem(STORAGE_THEME_ID_KEY, theme.id);
    } catch {
      // Fallback
    }
    showToast('Design settings saved successfully.');
  };

  const resetToDefault = (targetId?: ThemeId) => {
    const idToReset = targetId || activeThemeId;
    const defaultPreset = THEME_PRESETS[idToReset];
    const updated = { ...customThemes };
    delete updated[idToReset];
    setCustomThemes(updated);
    setTheme(defaultPreset);
    try {
      localStorage.setItem(STORAGE_CUSTOM_THEMES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    showToast(`Reset ${defaultPreset.name} to default values.`);
  };

  const dismissToast = () => {
    setToastMessage(null);
  };

  // Helper to generate Jetpack Compose Color & Theme file
  const generateJetpackComposeCode = () => {
    const hexToCompose = (hex: string) => {
      const clean = hex.replace('#', '');
      if (clean.length === 6) return `Color(0xFF${clean.toUpperCase()})`;
      return `Color(0xFF10B981)`;
    };

    return `// ==========================================
// Jetpack Compose Design System Tokens
// Generated from Pro Recorder UI Design Studio
// Theme: ${theme.name}
// ==========================================

package com.prorecorder.app.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.unit.dp

// Color Palette
val PrimaryColor = ${hexToCompose(theme.primaryColor)}
val SecondaryColor = ${hexToCompose(theme.secondaryColor)}
val AccentColor = ${hexToCompose(theme.accentColor)}
val BackgroundCanvas = ${hexToCompose(theme.backgroundColor)}
val SurfaceCard = ${hexToCompose(theme.surfaceColor.startsWith('#') ? theme.surfaceColor : '#161B26')}
val SurfaceSubtle = ${hexToCompose(theme.surfaceSubtle.startsWith('#') ? theme.surfaceSubtle : '#202636')}
val HairlineBorder = ${hexToCompose(theme.surfaceBorder.startsWith('#') ? theme.surfaceBorder : '#2C3549')}
val TextPrimary = ${hexToCompose(theme.textColor)}
val TextMuted = ${hexToCompose(theme.textMuted)}
val RecordActiveColor = ${hexToCompose(theme.recordColor)}

// Shape & Elevation System
val CardRadius = ${theme.borderRadius}.dp
val AppShapes = Shapes(
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(CardRadius),
    large = RoundedCornerShape(${theme.borderRadius + 4}.dp)
)

// Material 3 Color Scheme
private val ProRecorderColorScheme = ${theme.isDark ? 'darkColorScheme' : 'lightColorScheme'}(
    primary = PrimaryColor,
    secondary = SecondaryColor,
    tertiary = AccentColor,
    background = BackgroundCanvas,
    surface = SurfaceCard,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onBackground = TextPrimary,
    onSurface = TextPrimary
)

@Composable
fun ProRecorderTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = ProRecorderColorScheme,
        shapes = AppShapes,
        content = content
    )
}`;
  };

  // Helper to generate GitHub Actions APK build workflow requested by user
  const generateGithubWorkflowYml = () => {
    return `# .github/workflows/build-apk.yml
name: Android CI - Build Release & Debug APK

on:
  push:
    branches: [ "main", "master" ]
    tags: [ "v*" ]
  pull_request:
    branches: [ "main", "master" ]
  workflow_dispatch:

jobs:
  build:
    name: Build Android APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
          cache: 'gradle'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Configure Android SDK & Accept Licenses
        run: |
          yes | sdkmanager --licenses || true
          sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

      - name: Setup Gradle
        uses: gradle/actions/setup-gradle@v3
        with:
          gradle-version: wrapper

      - name: Generate Wrapper and Build Android Debug APK
        run: |
          chmod +x gradlew || gradle wrapper
          ./gradlew assembleDebug --stacktrace

      - name: Prepare APK for Distribution
        run: |
          mkdir -p output_apks
          cp app/build/outputs/apk/debug/*.apk output_apks/ProRecorder-debug.apk
          ls -lah output_apks/

      - name: Upload Public APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ProRecorder-debug-apk
          path: output_apks/ProRecorder-debug.apk
          retention-days: 14

      - name: Publish Public GitHub Release (on Tag or Manual Run)
        if: startsWith(github.ref, 'refs/tags/v') || github.event_name == 'workflow_dispatch'
        uses: softprops/action-gh-release@v2
        with:
          files: output_apks/ProRecorder-debug.apk
          name: Pro Recorder Android Release \${{ github.ref_name }}
          draft: false
          prerelease: false
          generate_release_notes: true
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        activeThemeId,
        activeScreen,
        setActiveScreen,
        selectTheme,
        updateThemeProperty,
        saveDesign,
        resetToDefault,
        isModified,
        toastMessage,
        dismissToast,
        generateJetpackComposeCode,
        generateGithubWorkflowYml,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
