import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "../css/CreateCourse.css";

import Sidebar from "../components/Sidebar";
import FormSkeleton from "../components/Skeleton/FormSkeleton.jsx";

import { CourseContext } from "../Context/CourseContext.jsx";
import { CurriculumContext } from "../Context/CurriculumContext.jsx";
import CourseCurriculumSkeleton from "../components/Skeleton/CourseCurriculumSkeleton.jsx";

const UpdateCourse = () => {
  const { courseId } = useParams();

  const { fetchCourseDetail, fetchUpdateCourse } = useContext(CourseContext);
  const { curriculumByCourse, fetchCurriculumByCourse } =
    useContext(CurriculumContext);

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    language: "",
  });

  const [originalData, setOriginalData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    language: "",
  });

  const [image, setImage] = useState(null);
  const [imgpreview, setImgpreview] = useState("");

  const [pageLoading, setPageLoading] = useState(true);
  const [curriculumLoading, setCurriculumLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    let formTimer;

    const loadCourse = async () => {
      try {
        setPageLoading(true);
        setCurriculumLoading(true);

        const courseData = await fetchCourseDetail(courseId);

        const course = courseData?.course;

        if (course) {
          const loadedData = {
            title: course.title || "",
            description: course.description || "",
            price: course.price?.toString() || "",
            category: course.category || "",
            language: course.language || "",
          };

          setFormData(loadedData);
          setOriginalData(loadedData);
          setImgpreview(course.image?.url || "");
        } else {
          toast.error("Course not found");
        }

        formTimer = setTimeout(() => {
          setPageLoading(false);
        }, 3000);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch course");

        setPageLoading(false);
        setCurriculumLoading(false);
      }
    };

    if (courseId) {
      loadCourse();
    }

    return () => {
      clearTimeout(formTimer);
    };
  }, [courseId]);

  useEffect(() => {
    let curriculumTimer;

    const loadCurriculum = async () => {
      if (pageLoading || !courseId) return;

      try {
        setCurriculumLoading(true);

        await fetchCurriculumByCourse(courseId);

        curriculumTimer = setTimeout(() => {
          setCurriculumLoading(false);
        }, 1800);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch curriculum");

        curriculumTimer = setTimeout(() => {
          setCurriculumLoading(false);
        }, 3000);
      }
    };

    loadCurriculum();

    return () => {
      clearTimeout(curriculumTimer);
    };
  }, [pageLoading, courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changePhotohandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImgpreview(reader.result);
    };

    reader.readAsDataURL(file);
    setImage(file);
  };

  const isChanged =
    image !== null ||
    Object.keys(formData).some((key) => formData[key] !== originalData[key]);

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (image) {
      payload.append("image", image);
    }

    try {
      setUpdateLoading(true);

      const data = await fetchUpdateCourse(courseId, payload);

      if (data?.success) {
        navigate("/admin/our-courses", {
          state: {
            updateMessage: data.message || "Course updated successfully!",
          },
        });
      } else {
        toast.error(data.errors || data.message || "Failed to update course");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update course");
    } finally {
      setUpdateLoading(false);
    }
  };

  const sortedCurriculums = Array.isArray(curriculumByCourse)
    ? [...curriculumByCourse].sort((a, b) => {
      const firstOrder = a.order ?? 0;
      const secondOrder = b.order ?? 0;
      return firstOrder - secondOrder;
    })
    : [];

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
            <h2 className="create-heading">Update Existing Course</h2>

            <div className="create-course-container">
              <form
                onSubmit={handleUpdateCourse}
                className="create-course-form"
                encType="multipart/form-data"
              >
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={updateLoading}
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: updateLoading ? "not-allowed" : "text",
                  }}
                />

                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={updateLoading}
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: updateLoading ? "not-allowed" : "text",
                  }}
                />

                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  disabled={updateLoading}
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: updateLoading ? "not-allowed" : "text",
                  }}
                />

                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  disabled={updateLoading}
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: updateLoading ? "not-allowed" : "text",
                  }}
                />

                <label>Language</label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  disabled={updateLoading}
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: updateLoading ? "not-allowed" : "text",
                  }}
                />

                <label>Course Image</label>

                {imgpreview && (
                  <div className="image-container">
                    <img src={imgpreview} alt="Preview" height="150" />
                  </div>
                )}

                <input
                  type="file"
                  name="image"
                  onChange={changePhotohandler}
                  accept="image/*"
                  disabled={updateLoading}
                  style={{
                    opacity: updateLoading ? "0.6" : "1",
                    cursor: updateLoading ? "not-allowed" : "default",
                  }}
                />

                <button
                  type="submit"
                  disabled={!isChanged || updateLoading}
                  style={{
                    opacity: !isChanged || updateLoading ? 0.6 : 1,
                    cursor:
                      !isChanged || updateLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {updateLoading ? "Course is updating..." : "Update Course"}
                </button>
              </form>
            </div>

            {curriculumLoading ? (
              <CourseCurriculumSkeleton count={4} />
            ) : (
              <div className="course-curriculum-update-section">
                <div className="course-curriculum-header">
                  <div>
                    <h2>Course Curriculum</h2>
                    <p>
                      Update lessons connected with this particular course.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="add-curriculum-btn"
                    onClick={() => navigate("/admin/create-curriculum")}
                  >
                    + Add Curriculum
                  </button>
                </div>

                <div className="course-curriculum-list">
                  {sortedCurriculums.length > 0 ? (
                    sortedCurriculums.map((item, index) => (
                      <div className="course-curriculum-card" key={item._id}>
                        <div className="course-curriculum-left">
                          <span className="course-curriculum-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>

                            <div className="course-curriculum-meta">
                              <span>Duration: {item.duration}</span>
                              <span>Order: {item.order ?? "Not set"}</span>
                              <span>
                                {item.isPreview ? "Free Preview" : "Locked"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="curriculum-edit-btn"
                          onClick={() =>
                            navigate(`/admin/update-curriculum/${item._id}`)
                          }
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="course-curriculum-empty">
                      No curriculum added for this course yet.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateCourse;