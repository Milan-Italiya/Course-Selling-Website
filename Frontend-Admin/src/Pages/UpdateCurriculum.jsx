import React, { useContext, useEffect, useState } from "react";
import "../css/CreateCurriculum.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import { CurriculumContext } from "../Context/CurriculumContext";
import { CourseContext } from "../Context/CourseContext";
import FormSkeleton from "../components/Skeleton/FormSkeleton";

const UpdateCurriculum = () => {
  const navigate = useNavigate();
  const { curriculumId } = useParams();

  const {
    fetchCurriculumById,
    fetchUpdateCurriculum,
  } = useContext(CurriculumContext);

  const { course, fetchCourses } = useContext(CourseContext);

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  // New Course Player fields
  const [order, setOrder] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [originalData, setOriginalData] = useState({
    courseId: "",
    title: "",
    description: "",
    duration: "",
    isPreview: false,
    order: "",
    videoUrl: "",
    content: "",
    isPublished: true,
  });

  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        await fetchCourses();

        const data = await fetchCurriculumById(curriculumId);

        if (data?.success && data?.curriculum) {
          const curriculum = data.curriculum;

          const loadedData = {
            courseId: curriculum.courseId?._id || curriculum.courseId || "",
            title: curriculum.title || "",
            description: curriculum.description || "",
            duration: curriculum.duration || "",
            isPreview: curriculum.isPreview === true,

            order:
              curriculum.order !== undefined && curriculum.order !== null
                ? String(curriculum.order)
                : "",

            videoUrl: curriculum.videoUrl || "",
            content: curriculum.content || "",

            isPublished:
              curriculum.isPublished === undefined
                ? true
                : curriculum.isPublished,
          };

          setCourseId(loadedData.courseId);
          setTitle(loadedData.title);
          setDescription(loadedData.description);
          setDuration(loadedData.duration);
          setIsPreview(loadedData.isPreview);

          setOrder(loadedData.order);
          setVideoUrl(loadedData.videoUrl);
          setContent(loadedData.content);
          setIsPublished(loadedData.isPublished);

          setOriginalData(loadedData);
        } else {
          toast.error(data?.message || "Curriculum not found");
        }
      } catch (error) {
        console.log("Fetch curriculum error:", error.message);
        toast.error("Failed to fetch curriculum");
      } finally {
        setTimeout(() => {
          setPageLoading(false);
        }, 1500);
      }
    };

    if (curriculumId) {
      loadCurriculum();
    }
  }, [curriculumId]);

  const isChanged =
    courseId !== originalData.courseId ||
    title !== originalData.title ||
    description !== originalData.description ||
    duration !== originalData.duration ||
    isPreview !== originalData.isPreview ||
    order !== originalData.order ||
    videoUrl !== originalData.videoUrl ||
    content !== originalData.content ||
    isPublished !== originalData.isPublished;

  const handleUpdateCurriculum = async (e) => {
    e.preventDefault();

    if (!courseId) {
      toast.error("Please select a course");
      return;
    }

    if (!order || Number(order) < 1) {
      toast.error("Lesson order must be 1 or greater");
      return;
    }

    if (!videoUrl.trim()) {
      toast.error("Please enter a video URL");
      return;
    }

    const updatedData = {
      courseId,
      title,
      description,
      duration,
      isPreview,

      order: Number(order),
      videoUrl: videoUrl.trim(),
      content: content.trim(),
      isPublished,
    };

    try {
      setLoading(true);

      const response = await fetchUpdateCurriculum(
        curriculumId,
        updatedData,
      );

      if (response?.success) {
        navigate("/admin/manage-curriculum", {
          state: {
            updateMessage:
              response.message || "Curriculum updated successfully!",
          },
        });
      } else {
        toast.error(
          response?.errors ||
            response?.message ||
            "Failed to update curriculum",
        );
      }
    } catch (error) {
      console.log("Update curriculum error:", error.message);
      toast.error("Failed to update curriculum");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div id="divider">
        <div className="left-sidebar">
          <Sidebar />
        </div>

        {pageLoading ? (
          <FormSkeleton />
        ) : (
          <div className="right-content">
            <h2 className="create-heading">Update Curriculum Lesson</h2>

            <div className="create-curriculum-container">
              <form
                className="create-curriculum-form"
                onSubmit={handleUpdateCurriculum}
              >
                <label>Select Course</label>
                <select
                  className="course-select"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="" disabled>
                    -- Select Course --
                  </option>

                  {course?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>

                <label>Lesson Order</label>
                <input
                  type="number"
                  min="1"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="e.g., 1"
                  required
                  disabled={loading}
                />

                <label>Lesson Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter lesson title"
                  required
                  disabled={loading}
                />

                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a short lesson description"
                  required
                  disabled={loading}
                />

                <label>Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 15 Minutes or 1 Hour"
                  required
                  disabled={loading}
                />

                <label>Video URL</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/lesson-video.mp4"
                  required
                  disabled={loading}
                />

                <label>Lesson Content / Notes</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Add notes, important concepts, instructions, or explanation..."
                  disabled={loading}
                />

                <label>Preview Available</label>
                <select
                  value={String(isPreview)}
                  onChange={(e) => setIsPreview(e.target.value === "true")}
                  disabled={loading}
                >
                  <option value="false">No, locked lesson</option>
                  <option value="true">Yes, free preview</option>
                </select>

                <label>Lesson Status</label>
                <select
                  value={String(isPublished)}
                  onChange={(e) => setIsPublished(e.target.value === "true")}
                  disabled={loading}
                >
                  <option value="true">Published</option>
                  <option value="false">Hidden / Draft</option>
                </select>

                <button
                  type="submit"
                  disabled={loading || !isChanged}
                  style={{
                    opacity: loading || !isChanged ? 0.6 : 1,
                    cursor:
                      loading || !isChanged ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Updating Lesson..." : "Update Lesson"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateCurriculum;