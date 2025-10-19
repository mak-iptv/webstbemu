import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Slider } from '../components/ui/slider';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const controlsTimeoutRef = useRef(null);

  const { content, type } = location.state || {};

  useEffect(() => {
    if (!content) {
      navigate('/dashboard');
    }
  }, [content, navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!content) return null;

  return (
    <div 
      className="min-h-screen bg-black flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-6 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{content.name}</h1>
            {type === 'movie' && (
              <p className="text-slate-300 text-sm">{content.genre} • {content.duration} • {content.year}</p>
            )}
            {type === 'live' && (
              <p className="text-slate-300 text-sm">{content.category} • Live TV</p>
            )}
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 relative flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full"
          src={content.stream_url}
          onClick={togglePlay}
        >
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="icon"
              onClick={togglePlay}
              className="w-20 h-20 bg-blue-500/80 hover:bg-blue-600/80 rounded-full backdrop-blur-sm"
            >
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="space-y-4">
          {/* Progress Bar */}
          {type !== 'live' && (
            <div className="flex items-center gap-3">
              <span className="text-white text-sm font-medium">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={(value) => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = value[0];
                  }
                }}
                className="flex-1"
              />
              <span className="text-white text-sm font-medium">{formatTime(duration)}</span>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/10"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/10"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>

              {type === 'live' && (
                <span className="px-3 py-1 bg-red-500 rounded-full text-white text-sm font-semibold animate-pulse">
                  LIVE
                </span>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/10"
            >
              {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
