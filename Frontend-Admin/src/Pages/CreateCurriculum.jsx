import React, { useContext, useEffect, useState } from "react";
import "../css/CreateCurriculum.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import { CourseContext } from "../Context/CourseContext";
import { CurriculumContext } from "../Context/CurriculumContext";
import FormSkeleton from "../components/Skeleton/FormSkeleton";

const CreateCurriculum = () => {
  const navigate = useNavigate();

  const { course, fetchCourses } = useContext(CourseContext);
  const { fetchCreateCurriculum } = useContext(CurriculumContext);

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  // New course-player fields
  const [order, setOrder] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setCourseLoading(true);
        await fetchCourses();
      } catch (error) {
        console.log(error);
        toast.error("Failed to load courses");
      } finally {
        setCourseLoading(false);

        setTimeout(() => {
          setPageLoading(false);
        }, 1500);
      }
    };

    loadCourses();
  }, []);

  const handleCreateCurriculum = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (!courseId) {
      toast.error("Please select a course");
      return;
    }

    if (!order || Number(order) < 1) {
      toast.error("Lesson order must be 1 or greater");
      return;
    }

    const curriculumData = {
      courseId,
      title,
      description,
      duration,
      isPreview,

      order: Number(order),
      videoUrl,
      content,
      isPublished,
    };

    try {
      setLoading(true);

      const data = await fetchCreateCurriculum(curriculumData);

      console.log("Create curriculum page response:", data);

      if (data?.success) {
        setCourseId("");
        setTitle("");
        setDescription("");
        setDuration("");
        setIsPreview(false);

        setOrder("");
        setVideoUrl("");
        setContent("");
        setIsPublished(true);

        navigate("/admin/manage-curriculum", {
          state: {
            createMessage:
              data.message || "Curriculum lesson created successfully!",
          },
        });
      } else {
        toast.error(
          data?.message || data?.errors || "Failed to create curriculum",
        );
      }
    } catch (error) {
      console.error("Error creating curriculum:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div id="divider" className={collapsed ? "sidebar-collapsed" : ""}>
        <div className="left-sidebar">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {pageLoading ? (
          <FormSkeleton />
        ) : (
          <div className="right-content">
            <h2 className="create-heading">Create New Curriculum Lesson</h2>

            <div className="create-curriculum-container">
              <form
                onSubmit={handleCreateCurriculum}
                className="create-curriculum-form"
              >
                <label>Select Course</label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                  disabled={loading || courseLoading}
                >
                  <option value="" disabled>
                    {courseLoading
                      ? "Loading courses..."
                      : "-- Select Course --"}
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
                  placeholder="e.g., Introduction to React Context"
                  required
                  disabled={loading}
                />

                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief overview of this lesson..."
                  required
                  disabled={loading}
                />

                <label>Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 15 minutes"
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
                  placeholder="Write lesson notes, explanation, important points, or instructions..."
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
                  disabled={loading || courseLoading}
                  style={{
                    opacity: loading || courseLoading ? 0.6 : 1,
                    cursor:
                      loading || courseLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Creating Lesson..." : "Create Lesson"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateCurriculum;