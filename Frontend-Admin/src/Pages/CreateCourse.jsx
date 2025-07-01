import React, { useState } from "react";
import "../css/CreateCourse.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [image, setImage] = useState(null);
  const [imgpreview, setImgpreview] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "language":
        setLanguage(value);
        break;
      default:
        break;
    }
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
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("language", language);
    formData.append("image", image);

    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/api/v1/course/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
        credentials: "include"
      });

      const data = await response.json();
      // toast.success(data.message || "Course Created Successfully");

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setLanguage("");
      setImage(null);
      setImgpreview("");
      navigate("/admin/our-courses", { state: { createMessage: data.message } });
      setLoading(false)
      console.log("Course created successfully:", data)
    } catch (error) {
      console.error("Error in course creation", error);
      toast.error(error.response.data.errors || "Failed to create course");
    }
  };

  return (
    <>
      <div id="divider">
        <div className="left-sidebar">
          <Sidebar />
        </div>
        <div className="right-content">
          <h2 className="create-heading">Create New Course</h2>
          <div className="create-course-container">
            <form onSubmit={handleCreateCourse} className="create-course-form" encType="multipart/form-data">
              <label>Title</label>
              <input type="text" name="title" value={title} onChange={handleChange} required />

              <label>Description</label>
              <textarea name="description" value={description} onChange={handleChange} required />

              <label>Price</label>
              <input type="number" name="price" value={price} onChange={handleChange} required />

              <label>Category</label>
              <input type="text" name="category" value={category} onChange={handleChange} required />

              <label>Language</label>
              <input type="text" name="language" value={language} onChange={handleChange} required />

              <label>Course Image</label>
              {imgpreview && (
                <div className="image-container">
                  <img src={imgpreview} alt="Preview" height="150" />
                </div>
              )}
              <input type="file" name="image" onChange={changePhotohandler} accept="image/*" required />

              <button type="submit">{loading ? "Processing..." : "Create Course"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
