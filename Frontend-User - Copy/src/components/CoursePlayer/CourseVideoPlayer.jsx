import React from "react";
import { FaPlay, FaPause, FaYoutube } from "react-icons/fa";
import VideoControls from "./VideoControls.jsx";

const CourseVideoPlayer = ({
  videoRef,
  videoBoxRef,
  playerLesson,
  videoUrl,
  isYouTubeVideo,
  getYouTubeEmbedUrl,
  showVideoControl,
  isFullScreen,
  isPlaying,
  isMuted,
  volume,
  duration,
  currentTime,
  playbackRate,
  progressPercentage,
  videoError,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onTogglePlay,
  onLoadedMetadata,
  onVideoPlay,
  onVideoPause,
  onVideoEnded,
  onVideoError,
  onTimeUpdate,
  onSeek,
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
      ref={videoBoxRef}
      className={`course-video-box ${
        showVideoControl ? "video-controls-visible" : "video-controls-hidden"
      } ${isFullScreen ? "course-video-fullscreen" : ""}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {videoUrl ? (
        <>
          {isYouTubeVideo ? (
            <iframe
              className="youtube-video-frame"
              src={getYouTubeEmbedUrl(videoUrl)}
              title={playerLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                preload="metadata"
                onClick={onTogglePlay}
                onLoadedMetadata={onLoadedMetadata}
                onPlay={onVideoPlay}
                onPause={onVideoPause}
                onEnded={onVideoEnded}
                onError={onVideoError}
                onTimeUpdate={onTimeUpdate}
              />

              <button
                type="button"
                className={`custom-video-play-btn ${
                  isPlaying ? "video-playing" : "video-paused"
                } ${showVideoControl ? "show-video-control" : "hide-video-control"}`}
                onClick={onTogglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <VideoControls
                showVideoControl={showVideoControl}
                currentTime={currentTime}
                duration={duration}
                progressPercentage={progressPercentage}
                isPlaying={isPlaying}
                isMuted={isMuted}
                volume={volume}
                playbackRate={playbackRate}
                isFullScreen={isFullScreen}
                onSeek={onSeek}
                onTogglePlay={onTogglePlay}
                onSkipBackward={onSkipBackward}
                onSkipForward={onSkipForward}
                onToggleMute={onToggleMute}
                onVolumeChange={onVolumeChange}
                onPlaybackRate={onPlaybackRate}
                onFullScreen={onFullScreen}
                formatTime={formatTime}
              />
            </>
          )}

          {isYouTubeVideo && (
            <div className="youtube-video-note">
              <FaYoutube />
              YouTube video uses YouTube controls.
            </div>
          )}

          {videoError && <div className="video-error-message">{videoError}</div>}
        </>
      ) : (
        <div className="course-video-empty">Video is not available for this lesson.</div>
      )}
    </div>
  );
};

export default CourseVideoPlayer;