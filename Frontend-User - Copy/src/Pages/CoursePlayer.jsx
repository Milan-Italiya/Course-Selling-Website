import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { CoursePlayerContext } from "../Context/CoursePlayerContext.jsx";

import "../css/CoursePlayer.css";
import CoursePlayerSkeleton from "../skeletons/CoursePlayerSkeleton.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import CoursePlayerHeader from "../components/CoursePlayer/CoursePlayerHeader.jsx";
import CourseVideoPlayer from "../components/CoursePlayer/CourseVideoPlayer.jsx";
import LessonDetailsCard from "../components/CoursePlayer/LessonDetailsCard.jsx";
import LessonNotesCard from "../components/CoursePlayer/LessonNotesCard.jsx";
import LessonSummarySidebar from "../components/CoursePlayer/LessonSummarySidebar.jsx";
import PlayerAccessCard from "../components/CoursePlayer/PlayerAccessCard.jsx";

const CoursePlayer = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();

  const videoRef = useRef(null);
  const videoBoxRef = useRef(null);
  const hideControlTimerRef = useRef(null);
  const loadingTimerRef = useRef(null);
  const lastSavedPositionRef = useRef(0);

  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideoControl, setShowVideoControl] = useState(true);
  const [videoError, setVideoError] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const {
    playerLesson,
    playerAccess,
    playerProgress,
    playerError,
    fetchPlayerLesson,
    saveLessonProgress,
  } = useContext(CoursePlayerContext);

  const videoUrl = useMemo(() => {
    return playerLesson?.videoUrl?.trim() || "";
  }, [playerLesson]);

  const isYouTubeVideo = useMemo(() => {
    return videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  }, [videoUrl]);

  const isNativeVideo = useMemo(() => {
    return Boolean(videoUrl && !isYouTubeVideo);
  }, [videoUrl, isYouTubeVideo]);

  const getYouTubeVideoId = useCallback((url) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.replace("/", "");
      }

      if (parsedUrl.hostname.includes("youtube.com")) {
        if (parsedUrl.pathname.includes("/embed/")) {
          return parsedUrl.pathname.split("/embed/")[1]?.split("/")[0] || "";
        }

        return parsedUrl.searchParams.get("v") || "";
      }

      return "";
    } catch (err) {
      if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1]?.split("?")[0] || "";
      }

      if (url.includes("watch?v=")) {
        return url.split("watch?v=")[1]?.split("&")[0] || "";
      }
      console.log("some error occured: ",err);
      

      return "";
    }
  }, []);

  const getYouTubeEmbedUrl = useCallback(
    (url) => {
      const videoId = getYouTubeVideoId(url);

      if (!videoId) return url;

      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    },
    [getYouTubeVideoId],
  );

  const clearHideControlTimer = useCallback(() => {
    if (hideControlTimerRef.current) {
      clearTimeout(hideControlTimerRef.current);
      hideControlTimerRef.current = null;
    }
  }, []);

  const startHideControlTimer = useCallback(() => {
    clearHideControlTimer();

    hideControlTimerRef.current = setTimeout(() => {
      const isVideoPlaying = videoRef.current && !videoRef.current.paused;
      const isInFullScreen = Boolean(document.fullscreenElement);

      if (isVideoPlaying || isInFullScreen) {
        setShowVideoControl(false);
      }
    }, 3000);
  }, [clearHideControlTimer]);

  const revealVideoControls = useCallback(() => {
    setShowVideoControl(true);

    if (isNativeVideo || document.fullscreenElement) {
      startHideControlTimer();
    }
  }, [isNativeVideo, startHideControlTimer]);

  // const resetPlayerState = useCallback(() => {
  //   setIsPlaying(false);
  //   setShowVideoControl(true);
  //   setVideoError("");
  //   setCurrentTime(0);
  //   setDuration(0);
  //   setIsFullScreen(false);
  //   setPlaybackRate(1);
  //   lastSavedPositionRef.current = 0;
  // }, []);

  const saveCurrentProgressSilently = useCallback(async () => {
    const token = sessionStorage.getItem("token");

    if (!token || !courseId || !lessonId || !isNativeVideo) return;
    if (!videoRef.current) return;

    const position = Math.floor(videoRef.current.currentTime || 0);

    if (position <= 0) return;
    if (Math.abs(position - lastSavedPositionRef.current) < 10) return;

    lastSavedPositionRef.current = position;

    await saveLessonProgress(courseId, lessonId, {
      lastPosition: position,
      watchedSeconds: position,
      isCompleted: false,
    });
  }, [courseId, lessonId, isNativeVideo, saveLessonProgress]);

  const handleVideoMouseMove = () => {
    revealVideoControls();
  };

  const handleVideoMouseLeave = () => {
    if (document.fullscreenElement) {
      startHideControlTimer();
      return;
    }

    clearHideControlTimer();
    setShowVideoControl(false);
  };

  useEffect(() => {
    let isMounted = true;

    const loadPlayerLesson = async () => {
      if (!courseId || !lessonId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        window.scrollTo(0, 0);

        await fetchPlayerLesson(courseId, lessonId);

        if (!isMounted) return;

        setIsPlaying(false);
        setShowVideoControl(true);
        setVideoError("");
        setCurrentTime(0);
        setDuration(0);
        setIsFullScreen(false);
        setPlaybackRate(1);
      } catch (error) {
        console.log("Load player lesson error:", error.message);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      }
    };

    loadPlayerLesson();

    return () => {
      isMounted = false;
    };
  }, [courseId, lessonId]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      const activeFullScreen = Boolean(document.fullscreenElement);

      setIsFullScreen(activeFullScreen);
      setShowVideoControl(true);

      if (activeFullScreen) {
        startHideControlTimer();
      } else {
        clearHideControlTimer();
      }
    };

    const handleFullScreenAction = () => {
      if (document.fullscreenElement) {
        revealVideoControls();
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("mousemove", handleFullScreenAction);
    document.addEventListener("keydown", handleFullScreenAction);
    document.addEventListener("click", handleFullScreenAction);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("mousemove", handleFullScreenAction);
      document.removeEventListener("keydown", handleFullScreenAction);
      document.removeEventListener("click", handleFullScreenAction);
    };
  }, [revealVideoControls, startHideControlTimer, clearHideControlTimer]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (isPlaying) {
        saveCurrentProgressSilently();
      }
    }, 15000);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isPlaying, saveCurrentProgressSilently]);

  useEffect(() => {
    return () => {
      clearHideControlTimer();

      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, [clearHideControlTimer]);

  const handleLoginRedirect = () => {
    sessionStorage.removeItem("token");

    navigate("/login", {
      state: {
        redirectTo: `/course/${courseId}/lesson/${lessonId}`,
      },
    });
  };

  const handleBuyCourse = () => {
    navigate(`/buy/${courseId}`);
  };

  const handleLoadedMetadata = () => {
    setVideoError("");

    if (!videoRef.current) return;

    const videoDuration = videoRef.current.duration || 0;

    setDuration(videoDuration);

    videoRef.current.volume = volume;
    videoRef.current.playbackRate = playbackRate;

    if (playerProgress?.lastPosition && playerProgress.lastPosition > 0) {
      videoRef.current.currentTime = playerProgress.lastPosition;
      setCurrentTime(playerProgress.lastPosition);
    }
  };

  const handleTogglePlay = async () => {
    const video = videoRef.current;

    if (!isNativeVideo || !video) return;

    if (videoError) {
      toast.error(videoError);
      return;
    }

    try {
      if (video.paused) {
        await video.play();

        setIsPlaying(true);
        setShowVideoControl(true);
        startHideControlTimer();
      } else {
        video.pause();

        setIsPlaying(false);
        setShowVideoControl(true);
        saveCurrentProgressSilently();

        if (document.fullscreenElement) {
          startHideControlTimer();
        } else {
          clearHideControlTimer();
        }
      }
    } catch (error) {
      const message =
        error.name === "NotSupportedError"
          ? "This video URL is not supported. Use a direct MP4 video URL."
          : "Unable to play video. Please check the video URL.";

      setVideoError(message);
      toast.error(message);
    }
  };

  const handleSkipBackward = () => {
    if (!videoRef.current) return;

    const newTime = Math.max(videoRef.current.currentTime - 10, 0);

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    revealVideoControls();
  };

  const handleSkipForward = () => {
    if (!videoRef.current) return;

    const newTime = Math.min(videoRef.current.currentTime + 10, duration || 0);

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    revealVideoControls();
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setShowVideoControl(true);
    startHideControlTimer();
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowVideoControl(true);
    saveCurrentProgressSilently();

    if (document.fullscreenElement) {
      startHideControlTimer();
    } else {
      clearHideControlTimer();
    }
  };

  const handleVideoEnded = async () => {
    setIsPlaying(false);
    setShowVideoControl(true);
    clearHideControlTimer();

    const token = sessionStorage.getItem("token");

    if (!token || !courseId || !lessonId) return;

    const finalPosition = Math.floor(duration || currentTime || 0);

    const response = await saveLessonProgress(courseId, lessonId, {
      isCompleted: true,
      lastPosition: finalPosition,
      watchedSeconds: finalPosition,
    });

    if (response?.success) {
      toast.success("Lesson completed!");
    }
  };

  const handleVideoError = () => {
    setIsPlaying(false);
    setShowVideoControl(true);
    clearHideControlTimer();

    const error = videoRef.current?.error;

    let message = "Video cannot be played. Please check the video URL.";

    if (error?.code === 4) {
      message = "This video URL is not supported. Use a direct MP4 video URL.";
    }

    setVideoError(message);
    toast.error(message);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    setCurrentTime(videoRef.current.currentTime || 0);
  };

  const handleSeek = (event) => {
    const seekTime = Number(event.target.value);

    if (!videoRef.current) return;

    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
    revealVideoControls();
  };

  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);

    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }

    setIsMuted(newVolume === 0);
    revealVideoControls();
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;

    const nextMuted = !isMuted;

    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && volume === 0) {
      setVolume(1);
      videoRef.current.volume = 1;
    }

    revealVideoControls();
  };

  const handlePlaybackRate = () => {
    if (!videoRef.current) return;

    const rates = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];

    setPlaybackRate(nextRate);
    videoRef.current.playbackRate = nextRate;
    revealVideoControls();
  };

  const handleFullScreen = async () => {
    if (!videoBoxRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await videoBoxRef.current.requestFullscreen();

        setIsFullScreen(true);
        setShowVideoControl(true);
        startHideControlTimer();
      } else {
        await document.exitFullscreen();

        setIsFullScreen(false);
        setShowVideoControl(true);
        clearHideControlTimer();
      }
    } catch (error) {
      console.log("Fullscreen error:", error.message);
      toast.error("Unable to enter fullscreen mode.");
    }
  };

  const handlePlayerKeyDown = (event) => {
    if (!isNativeVideo) return;

    const targetTag = event.target?.tagName?.toLowerCase();

    if (targetTag === "input") return;

    if (event.code === "Space") {
      event.preventDefault();
      handleTogglePlay();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handleSkipBackward();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleSkipForward();
    }

    if (event.key.toLowerCase() === "m") {
      handleToggleMute();
    }

    if (event.key.toLowerCase() === "f") {
      handleFullScreen();
    }

    revealVideoControls();
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";

    const totalSeconds = Math.floor(time);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
        }`;
    }

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleMarkComplete = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please login to save lesson progress.");

      setTimeout(() => {
        handleLoginRedirect();
      }, 800);

      return;
    }

    const position = Math.floor(currentTime || duration || 0);

    const response = await saveLessonProgress(courseId, lessonId, {
      isCompleted: true,
      lastPosition: position,
      watchedSeconds: position,
    });

    if (response?.success) {
      toast.success("Lesson marked as completed!");
      return;
    }

    if (response?.status === 401) {
      sessionStorage.removeItem("token");

      toast.error("Session expired. Please login again.");

      setTimeout(() => {
        handleLoginRedirect();
      }, 900);

      return;
    }

    toast.error(response?.message || "Unable to save progress.");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <CoursePlayerSkeleton />
        <Footer />
      </>
    );
  }

  if (playerError) {
    return (
      <>
        <Navbar />

        <PlayerAccessCard
          title="Lesson Locked"
          message={playerError.message || "You do not have access to this lesson."}
          showLogin={playerError.status === 401}
          onLogin={handleLoginRedirect}
          onBuyCourse={handleBuyCourse}
          onGoBack={() => navigate(-1)}
        />

        <Footer />
      </>
    );
  }

  if (!playerLesson) {
    return (
      <>
        <Navbar />

        <PlayerAccessCard
          title="No Lesson Found"
          message="This lesson is not available right now."
          showLogin={false}
          onGoBack={() => navigate(-1)}
        />

        <Footer />
      </>
    );
  }

  const progressPercentage =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  const lessonStatus = playerProgress?.isCompleted ? "Completed" : "In Progress";

  return (
    <>
      <Navbar />

      <div className="course-player-page">
        <ToastContainer position="top-right" autoClose={3000} />

        <CoursePlayerHeader
          playerLesson={playerLesson}
          onBack={() => navigate(-1)}
        />

        <div className="course-player-layout">
          <main className="course-player-main">
            <CourseVideoPlayer
              videoRef={videoRef}
              videoBoxRef={videoBoxRef}
              playerLesson={playerLesson}
              videoUrl={videoUrl}
              isYouTubeVideo={isYouTubeVideo}
              getYouTubeEmbedUrl={getYouTubeEmbedUrl}
              showVideoControl={showVideoControl}
              isFullScreen={isFullScreen}
              isPlaying={isPlaying}
              isMuted={isMuted}
              volume={volume}
              duration={duration}
              currentTime={currentTime}
              playbackRate={playbackRate}
              progressPercentage={progressPercentage}
              videoError={videoError}
              onMouseMove={handleVideoMouseMove}
              onMouseEnter={handleVideoMouseMove}
              onMouseLeave={handleVideoMouseLeave}
              onKeyDown={handlePlayerKeyDown}
              onTogglePlay={handleTogglePlay}
              onLoadedMetadata={handleLoadedMetadata}
              onVideoPlay={handleVideoPlay}
              onVideoPause={handleVideoPause}
              onVideoEnded={handleVideoEnded}
              onVideoError={handleVideoError}
              onTimeUpdate={handleTimeUpdate}
              onSeek={handleSeek}
              onSkipBackward={handleSkipBackward}
              onSkipForward={handleSkipForward}
              onToggleMute={handleToggleMute}
              onVolumeChange={handleVolumeChange}
              onPlaybackRate={handlePlaybackRate}
              onFullScreen={handleFullScreen}
              formatTime={formatTime}
            />

            <LessonDetailsCard
              playerLesson={playerLesson}
              playerAccess={playerAccess}
              playerProgress={playerProgress}
              isYouTubeVideo={isYouTubeVideo}
              lessonStatus={lessonStatus}
              onMarkComplete={handleMarkComplete}
              onBuyCourse={handleBuyCourse}
            />

            <LessonNotesCard content={playerLesson.content} />
          </main>

          <LessonSummarySidebar
            playerLesson={playerLesson}
            playerAccess={playerAccess}
            playerProgress={playerProgress}
            isYouTubeVideo={isYouTubeVideo}
            onCourseDetails={() => navigate(`/courses/${courseId}`)}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursePlayer;