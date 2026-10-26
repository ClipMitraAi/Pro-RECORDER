import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { INITIAL_RECORDINGS } from '../../data/mockRecordings';
import { RecordedVideo } from '../../types/theme';
import { 
  Play, 
  Search, 
  Trash2, 
  Edit, 
  Share2, 
  Film, 
  Clock, 
  HardDrive, 
  X, 
  Volume2, 
  VolumeX, 
  Pause,
  Sliders,
  MoreVertical
} from 'lucide-react';

export const RecordingsGalleryScreen: React.FC = () => {
  const { theme, setActiveScreen } = useTheme();
  const [recordings, setRecordings] = useState<RecordedVideo[]>(INITIAL_RECORDINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<RecordedVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playProgress, setPlayProgress] = useState(35);

  const filterTabs = ['All', 'Favorites', 'Gameplay', 'High-Res', 'Cropped'];

  const filtered = recordings.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeFilter === 'All' ? true : item.tags.includes(activeFilter);
    return matchesSearch && matchesTag;
  });

  const handleDeleteVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecordings((prev) => prev.filter((r) => r.id !== id));
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
    }
  };

  const handleOpenInEditor = (video: RecordedVideo) => {
    setSelectedVideo(null);
    setActiveScreen('video-editor');
  };

  return (
    <div 
      className="h-full flex flex-col justify-between overflow-y-auto p-3 select-none"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: theme.surfaceBorder }}>
          <div>
            <h1 className="text-sm font-bold">Recordings Library</h1>
            <p className="text-[10px]" style={{ color: theme.textMuted }}>
              {recordings.length} video captures · 2.1 GB used
            </p>
          </div>
          <button 
            onClick={() => setActiveScreen('video-editor')}
            className="text-[10px] font-semibold px-2 py-1 rounded-md border flex items-center gap-1"
            style={{ 
              backgroundColor: theme.surfaceSubtle, 
              borderColor: theme.surfaceBorder,
              color: theme.primaryColor 
            }}
          >
            <Edit className="w-3 h-3" />
            <span>Editor</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative my-2">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search captures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border outline-none transition-colors"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.surfaceBorder,
              color: theme.textColor,
            }}
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-2 no-scrollbar">
          {filterTabs.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors"
              style={{
                backgroundColor: activeFilter === tag ? theme.primaryColor : theme.surfaceColor,
                color: activeFilter === tag ? (theme.isDark ? '#000' : '#fff') : theme.textMuted,
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Video List */}
        <div className="flex-1 space-y-2 overflow-y-auto pr-0.5">
          {filtered.length === 0 ? (
            <div className="text-center py-10 opacity-60">
              <Film className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p className="text-xs font-semibold">No recordings found</p>
              <p className="text-[10px] text-slate-400">Try clearing filters or start a new recording.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedVideo(item)}
                className="p-2 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: theme.surfaceColor,
                  borderColor: theme.surfaceBorder,
                  borderRadius: `${theme.borderRadius}px`,
                }}
              >
                {/* Thumbnail Preview */}
                <div 
                  className={`w-20 h-14 rounded-lg bg-gradient-to-tr ${item.thumbnailGradient} flex items-center justify-center relative shrink-0 shadow-sm overflow-hidden`}
                >
                  <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white backdrop-blur-xs">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/75 text-[8px] font-mono text-white">
                    {item.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold truncate leading-tight">{item.title}</h3>
                  <div className="flex items-center gap-2 text-[9px] font-mono mt-1" style={{ color: theme.textMuted }}>
                    <span>{item.resolution}</span>
                    <span>·</span>
                    <span>{item.size}</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{item.date}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handleDeleteVideo(item.id, e)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
          <div 
            className="w-full max-w-sm rounded-2xl border overflow-hidden shadow-2xl flex flex-col"
            style={{
              backgroundColor: theme.backgroundColor,
              borderColor: theme.surfaceBorder,
              color: theme.textColor,
            }}
          >
            {/* Player Header */}
            <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: theme.surfaceBorder }}>
              <div className="truncate pr-2">
                <h4 className="text-xs font-bold truncate">{selectedVideo.title}</h4>
                <p className="text-[10px] font-mono" style={{ color: theme.textMuted }}>
                  {selectedVideo.resolution} · {selectedVideo.fps} FPS · {selectedVideo.size}
                </p>
              </div>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Viewport Simulated Canvas */}
            <div 
              className={`w-full h-48 bg-gradient-to-tr ${selectedVideo.thumbnailGradient} relative flex items-center justify-center`}
            >
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              {/* Scrubber bar */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center gap-2">
                <span className="text-[9px] font-mono text-white">01:14</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={playProgress}
                  onChange={(e) => setPlayProgress(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 h-1 rounded cursor-pointer"
                />
                <span className="text-[9px] font-mono text-slate-300">{selectedVideo.duration}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-3 flex items-center gap-2">
              <button
                onClick={() => handleOpenInEditor(selectedVideo)}
                className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: theme.isDark ? '#000' : '#fff',
                }}
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Open in Video Editor</span>
              </button>

              <button
                onClick={() => alert(`Sharing "${selectedVideo.title}" via Android Intent!`)}
                className="p-2 rounded-xl border flex items-center justify-center"
                style={{ backgroundColor: theme.surfaceColor, borderColor: theme.surfaceBorder }}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
