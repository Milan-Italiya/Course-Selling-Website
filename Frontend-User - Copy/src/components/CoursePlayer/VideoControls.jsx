import React from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaForward,
  FaBackward,
} from "react-icons/fa";

const VideoControls = ({
  showVideoControl,
  currentTime,
  duration,
  progressPercentage,
  isPlaying,
  isMuted,
  volume,
  playbackRate,
  isFullScreen,
  onSeek,
  onTogglePlay,
  onSkipBackward,
  onSkipForward,
  onToggleMute,
  onVolumeChange,
  onPlaybackRate,
  onFullScreen,
  formatTime,
}) => {
  return (
    <div
      className={`youtube-style-controls ${
        showVideoControl ? "show-video-control" : "hide-video-control"
      }`}
    >
      <div className="video-progress-wrapper">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={onSeek}
          className="video-progress-range"
          style={{
            background: `linear-gradient(to right, #00e5ff ${progressPercentage}%, rgba(255,255,255,0.35) ${progressPercentage}%)`,
          }}
        />
      </div>

      <div className="video-bottom-controls">
        <div className="video-controls-left">
          <button type="button" className="video-control-btn" onClick={onTogglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button type="button" className="video-control-btn" onClick={onSkipBackward}>
            <FaBackward />
          </button>

          <button type="button" className="video-control-btn" onClick={onSkipForward}>
            <FaForward />
          </button>

          <button type="button" className="video-control-btn" onClick={onToggleMute}>
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={onVolumeChange}
            className="volume-range"
          />

          <span className="video-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="video-controls-right">
          <button type="button" className="video-speed-btn" onClick={onPlaybackRate}>
            {playbackRate}x
          </button>

          <button type="button" className="video-control-btn" onClick={onFullScreen}>
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;