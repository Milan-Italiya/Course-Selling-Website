import React, { useContext, useEffect, useState } from "react";
import "../css/Course.css";
import { CourseContext } from "../Context/CourseContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import CourseSkeleton from "../components/Skeleton/CourseSkeleton";
import ConfirmModal from "../components/ConfirmModel";

const OurCourses = () => {
  const {course,fetchCourses,fetchCoursesBySearch,coursesByCount,fetchCoursesByCount,fetchDeleteCourse} = useContext(CourseContext);

  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/admin/login", {
        state: {
          loginerrMessage: "please login first to admin dashboard",
        },
      });
      return;
    }

    fetchCourses();
    fetchCoursesByCount();

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (location.state?.createMessage || location.state?.updateMessage) {
      const msg = location.state.createMessage || location.state.updateMessage;

      toast.dismiss();
      toast.success(msg);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDeleteCourse = async () => {
    try {
      setDeleteLoading(true);

      const data = await fetchDeleteCourse(selectedCourseId);

      toast.dismiss();

      if (data?.success || data?.message) {
        toast.success(data.message || "Course deleted successfully!");

        await fetchCourses();
        await fetchCoursesByCount();

        setShowDeleteModal(false);
        setSelectedCourseId(null);
      } else {
        toast.error(data.message || "Failed to delete course");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the course.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} limit={1} />

      <div id="divider" className={collapsed ? "sidebar-collapsed" : ""}>
        <div className="left-sidebar">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        <div className="right-content">
          {loading ? (
            <CourseSkeleton courseCount={coursesByCount} />
          ) : (
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="course-container">
                <h2 className="course-heading">Courses</h2>

                <div className="search-container">
                  <i className="fas fa-search"></i>

                  <input
                    type="text"
                    name="searchbox"
                    id="searchbox"
                    placeholder="Search Courses..."
                    onChange={(e) => fetchCoursesBySearch(e.target.value)}
                  />
                </div>

                <div className="icon-right">
                  <span className="add-course">Add Courses</span>

                  <i
                    className="fa-solid fa-plus add-icon"
                    onClick={() => navigate("/admin/create-course")}
                  ></i>
                </div>

                <div className="course-list">
                  {course.length > 0 ? (
                    course.map((course) => (
                      <div className="course-card" key={course._id}>
                        <img
                          src={course.image?.url}
                          alt={course.title}
                          className="course-image"
                        />

                        <h3>{course.title}</h3>

                        <p>{course.description}</p>

                        <div className="course-btn-container">
                          <button
                            type="button"
                            className="course-btn"
                            onClick={() =>
                              navigate(`/admin/update-course/${course._id}`)
                            }
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                            Edit
                          </button>

                          <button
                            type="button"
                            className="course-btn"
                            onClick={() => {
                              setSelectedCourse(course);
                              setSelectedCourseId(course._id);
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="course-error">No courses found</div>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Course"
        message={
          <>
            Are you sure you want to permanently delete{" "}
            <span className="highlight-course">{selectedCourse?.title}</span>?
          </>
        }
        confirmText="Delete"
        loading={deleteLoading}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCourseId(null);
          setSelectedCourse(null);
        }}
        onConfirm={handleDeleteCourse}
      />
    </>
  );
};

export default OurCourses;
