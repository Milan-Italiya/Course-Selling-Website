import React, { useContext, useEffect, useState } from "react";
import "../css/CreateCourse.css"; // Note: You can rename this to CourseForm.css later if shared!
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import { CourseContext } from "../Context/CourseContext";
import FormSkeleton from "../components/Skeleton/FormSkeleton";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { fetchCreateCourse } = useContext(CourseContext);
  const [collapsed, setCollapsed] = useState(false);

  // Optimized: Bundled individual primitive states into a clean state object
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    language: "",
  });
  const [image, setImage] = useState(null);
  const [imgpreview, setImgpreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true)

  // Optimized: Universal input field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    payload.append("image", image);

    try {
      setLoading(true);
      const data = await fetchCreateCourse(payload);

      if (data?.success) {
        toast.success(data.message || "Course created successfully!");

        // Clear Form Object Fields
        setFormData({
          title: "",  
          description: "",
          price: "",
          category: "",
          language: "",
        });
        setImage(null);
        setImgpreview("");

        navigate("/admin/our-courses", {
          state: {
            createMessage: data.message || "Course created successfully!",
          },
        });
      } else {
        toast.error(
          data?.message || data?.errors || "Failed to create course"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
            <h2 className="create-heading">Create New Course</h2>
            <div className="create-course-container">
              <form
                onSubmit={handleCreateCourse}
                className="create-course-form"
                encType="multipart/form-data"
              >
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Ethical Hacking Basics"
                  required
                  disabled={loading}
                  style={{
                    opacity: loading ? "0.6" : "1",
                    cursor: loading ? "not-allowed" : "text",
                  }}
                />

                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a comprehensive course overview detailing curriculum, scope, and objectives..."
                  required
                  disabled={loading}
                  style={{
                    opacity: loading ? "0.6" : "1",
                    cursor: loading ? "not-allowed" : "text",
                  }}
                />

                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter course fee (e.g., 7000)"
                  required
                  disabled={loading}
                  style={{
                    opacity: loading ? "0.6" : "1",
                    cursor: loading ? "not-allowed" : "text",
                  }}
                />

                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Cybersecurity, Web Development"
                  required
                  disabled={loading}
                  style={{
                    opacity: loading ? "0.6" : "1",
                    cursor: loading ? "not-allowed" : "text",
                  }}
                />

                <label>Language</label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="e.g., English, Hindi, Spanish"
                  required
                  disabled={loading}
                  style={{
                    opacity: loading ? "0.6" : "1",
                    cursor: loading ? "not-allowed" : "text",
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
                  required
                  disabled={loading}
                  style={{
                    opacity: loading ? "0.6" : "1",
                    cursor: loading ? "not-allowed" : "default",
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    opacity: loading ? "0.6" : "1",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Course is creating..." : "Create Course"}
                </button>
              </form>
            </div>
          </div>
        )
        }

      </div>
    </>
  );
};

export default CreateCourse;