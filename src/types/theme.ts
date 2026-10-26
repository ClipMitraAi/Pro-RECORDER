export type ThemeId = 
  | 'midnight-pro'
  | 'cyber-neon'
  | 'minimal-white'
  | 'creator-purple'
  | 'gaming-red'
  | 'glass-premium';

export type CardStyle = 'flat' | 'elevated' | 'glass' | 'bordered';
export type ButtonShape = 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-full';
export type IconStyle = 'minimal' | 'filled' | 'duotone';
export type NavLayout = 'bottom-tabs' | 'floating-dock';
export type RecordButtonDesign = 'classic-red' | 'pulse-radar' | 'studio-ring' | 'minimalist-core';
export type FloatingControlsStyle = 'pill' | 'circular-bubble' | 'floating-badge';

export type AppScreenId = 
  | 'home'
  | 'fullscreen-recording'
  | 'custom-area'
  | 'audio-settings'
  | 'facecam-settings'
  | 'recordings'
  | 'video-editor'
  | 'settings';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  isDark: boolean;
  
  // Colors
  primaryColor: string;       // Accent / Main CTA
  secondaryColor: string;     // Supporting tone
  accentColor: string;        // Highlights / Badges
  backgroundColor: string;    // Main canvas bg
  surfaceColor: string;       // Card / Container bg
  surfaceSubtle: string;      // Inset / Hover bg
  surfaceBorder: string;      // Hairline borders
  textColor: string;          // Main text
  textMuted: string;          // Secondary text
  recordColor: string;        // Active recording red/accent
  
  // Design properties
  cardStyle: CardStyle;
  buttonShape: ButtonShape;
  borderRadius: number;       // px (e.g. 16)
  iconStyle: IconStyle;
  fontSize: 'compact' | 'normal' | 'relaxed';
  fontFamily: string;
  navLayout: NavLayout;
  recordButtonDesign: RecordButtonDesign;
  floatingControlsStyle: FloatingControlsStyle;
}

export const THEME_PRESETS: Record<ThemeId, ThemeConfig> = {
  'midnight-pro': {
    id: 'midnight-pro',
    name: 'Midnight Pro',
    tagline: 'Black Studio & Emerald Accents',
    description: 'Black background, emerald green accents, premium recording studio aesthetic for audio-visual pros.',
    isDark: true,
    primaryColor: '#10b981',       // Emerald 500
    secondaryColor: '#059669',     // Emerald 600
    accentColor: '#34d399',        // Emerald 400
    backgroundColor: '#0a0c10',    // Pitch Black Slate
    surfaceColor: '#131722',       // Dark studio surface
    surfaceSubtle: '#1c2233',      // Subtle studio block
    surfaceBorder: '#232c40',      // Precise hairline border
    textColor: '#f1f5f9',          // Slate 100
    textMuted: '#94a3b8',          // Slate 400
    recordColor: '#ef4444',        // Crisp red
    cardStyle: 'bordered',
    buttonShape: 'rounded-xl',
    borderRadius: 14,
    iconStyle: 'duotone',
    fontSize: 'normal',
    fontFamily: 'Plus Jakarta Sans',
    navLayout: 'bottom-tabs',
    recordButtonDesign: 'studio-ring',
    floatingControlsStyle: 'pill',
  },
  
  'cyber-neon': {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    tagline: 'Electric Blue & Violet Aura',
    description: 'Dark navy background with electric cyan-blue and neon violet glows for modern streamers.',
    isDark: true,
    primaryColor: '#06b6d4',       // Cyan 500
    secondaryColor: '#8b5cf6',     // Violet 500
    accentColor: '#38bdf8',        // Sky 400
    backgroundColor: '#070b19',    // Deep Navy
    surfaceColor: '#0f172a',       // Dark Navy surface
    surfaceSubtle: '#1e293b',      // Navy subtle
    surfaceBorder: '#334155',      // Navy border
    textColor: '#f8fafc',          // Clean White
    textMuted: '#94a3b8',          // Light slate
    recordColor: '#f43f5e',        // Rose record
    cardStyle: 'elevated',
    buttonShape: 'rounded-2xl',
    borderRadius: 18,
    iconStyle: 'filled',
    fontSize: 'normal',
    fontFamily: 'Plus Jakarta Sans',
    navLayout: 'floating-dock',
    recordButtonDesign: 'pulse-radar',
    floatingControlsStyle: 'circular-bubble',
  },

  'minimal-white': {
    id: 'minimal-white',
    name: 'Minimal White',
    tagline: 'Pure White & Modern Blue',
    description: 'Clean white background, subtle gray structural surfaces, and cobalt blue accents for distraction-free focus.',
    isDark: false,
    primaryColor: '#2563eb',       // Blue 600
    secondaryColor: '#4f46e5',     // Indigo 600
    accentColor: '#3b82f6',        // Blue 500
    backgroundColor: '#f8fafc',    // Slate 50
    surfaceColor: '#ffffff',       // Pure White
    surfaceSubtle: '#f1f5f9',      // Slate 100
    surfaceBorder: '#e2e8f0',      // Slate 200 hairline
    textColor: '#0f172a',          // Slate 900
    textMuted: '#64748b',          // Slate 500
    recordColor: '#dc2626',        // Red 600
    cardStyle: 'flat',
    buttonShape: 'rounded-xl',
    borderRadius: 12,
    iconStyle: 'minimal',
    fontSize: 'normal',
    fontFamily: 'Plus Jakarta Sans',
    navLayout: 'bottom-tabs',
    recordButtonDesign: 'minimalist-core',
    floatingControlsStyle: 'pill',
  },

  'creator-purple': {
    id: 'creator-purple',
    name: 'Creator Purple',
    tagline: 'Dark Velvet & Vibrant Gradients',
    description: 'Deep violet background, rich purple gradients, and modern creator-focused mobile controls.',
    isDark: true,
    primaryColor: '#a855f7',       // Purple 500
    secondaryColor: '#ec4899',     // Pink 500
    accentColor: '#c084fc',        // Purple 400
    backgroundColor: '#0d0718',    // Midnight Violet
    surfaceColor: '#170e2b',       // Deep Purple surface
    surfaceSubtle: '#261642',      // Purple subtle
    surfaceBorder: '#3b2064',      // Purple border
    textColor: '#faf5ff',          // Purple 50
    textMuted: '#c4b5fd',          // Purple 300
    recordColor: '#f43f5e',        // Rose
    cardStyle: 'elevated',
    buttonShape: 'rounded-2xl',
    borderRadius: 20,
    iconStyle: 'duotone',
    fontSize: 'normal',
    fontFamily: 'Plus Jakarta Sans',
    navLayout: 'floating-dock',
    recordButtonDesign: 'pulse-radar',
    floatingControlsStyle: 'floating-badge',
  },

  'gaming-red': {
    id: 'gaming-red',
    name: 'Gaming Red',
    tagline: 'Carbon Charcoal & Crimson Fire',
    description: 'Charcoal carbon background with high-contrast crimson accents and esports-inspired recording buttons.',
    isDark: true,
    primaryColor: '#ef4444',       // Red 500
    secondaryColor: '#f97316',     // Orange 500
    accentColor: '#f87171',        // Red 400
    backgroundColor: '#0c0d10',    // Carbon black
    surfaceColor: '#16181d',       // Gunmetal surface
    surfaceSubtle: '#22252c',      // Charcoal inset
    surfaceBorder: '#2e323b',      // Industrial border
    textColor: '#f3f4f6',          // Gray 100
    textMuted: '#9ca3af',          // Gray 400
    recordColor: '#ff2d55',        // Crimson bright
    cardStyle: 'bordered',
    buttonShape: 'rounded-lg',
    borderRadius: 10,
    iconStyle: 'filled',
    fontSize: 'compact',
    fontFamily: 'Plus Jakarta Sans',
    navLayout: 'bottom-tabs',
    recordButtonDesign: 'classic-red',
    floatingControlsStyle: 'circular-bubble',
  },

  'glass-premium': {
    id: 'glass-premium',
    name: 'Glass Premium',
    tagline: 'Frosted Translucency & Amber Gold',
    description: 'Dark translucent frosted glass surfaces, subtle backdrop blurs, and champagne gold accent lines.',
    isDark: true,
    primaryColor: '#f59e0b',       // Amber 500
    secondaryColor: '#d97706',     // Amber 600
    accentColor: '#fbbf24',        // Amber 400
    backgroundColor: '#080c14',    // Pitch Obsidian
    surfaceColor: 'rgba(255, 255, 255, 0.05)', // Translucent glass
    surfaceSubtle: 'rgba(255, 255, 255, 0.08)',
    surfaceBorder: 'rgba(255, 255, 255, 0.12)',
    textColor: '#ffffff',          // Pure white
    textMuted: '#94a3b8',          // Slate 400
    recordColor: '#f43f5e',        // Rose
    cardStyle: 'glass',
    buttonShape: 'rounded-2xl',
    borderRadius: 22,
    iconStyle: 'duotone',
    fontSize: 'normal',
    fontFamily: 'Plus Jakarta Sans',
    navLayout: 'floating-dock',
    recordButtonDesign: 'studio-ring',
    floatingControlsStyle: 'pill',
  },
};

export interface RecordedVideo {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  resolution: string;
  fps: number;
  size: string;
  date: string;
  tags: string[];
  thumbnailGradient: string;
}
