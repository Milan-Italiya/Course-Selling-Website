import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import '../css/CreateCourse.css'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

const UpdateCourse = () => {
  const { courseId } = useParams()
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [image, setImage] = useState(null);
  const [imgpreview, setImgpreview] = useState("");
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/course/${courseId}`, {
          credentials: 'include'
        })
        const data = await response.json()
        const course = data.course
        console.log(data)
        setTitle(course.title)
        setDescription(course.description)
        setPrice(course.price)
        setCategory(course.category)
        setLanguage(course.language)
        setImgpreview(course.image.url)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching course details:', error)
        setLoading(false)
      }
    }
    fetchCourseDetails()
  }, [courseId])

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

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("language", language);
    if (image) {
      formData.append("image", image);
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/v1/course/update/${courseId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
        credentials: "include"
      });

      const data = await response.json();
      // toast.success(data.message || "Course Updated Successfully");

      // Reset form
      // setTitle("");
      // setDescription("");
      // setPrice("");
      // setCategory("");
      // setLanguage("");
      // setImage(null);
      // setImgpreview("");

      if (data.message) {
        navigate("/admin/our-courses", { state: { createMessage: data.message } });
        // toast.success(data.message || "Course updated successfully:");
      } else if (data.errors) {
        toast.error(data.errors);
      }
    } catch (error) {
      console.log("Error in course updation", error.message);
      toast.error(error.response.data.errors || "Failed to update course");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div id="divider">
        <div className="left-sidebar">
          <Sidebar />
        </div>
        <div className="right-content">
          <h2 className="create-heading">Update Existing Course</h2>
          <div className="create-course-container">
            <form onSubmit={handleUpdateCourse} className="create-course-form" encType="multipart/form-data">
              <label>Title</label>
              <input type="text" name="title" value={title || 'N/A'} onChange={handleChange} required />

              <label>Description</label>
              <textarea name="description" value={description || 'N/A'} onChange={handleChange} required />

              <label>Price</label>
              <input type="number" name="price" value={price || 0} onChange={handleChange} required />

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
              <input type="file" name="image" onChange={changePhotohandler} accept="image/*" />

              <button type="submit">Update Course</button>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}

export default UpdateCourse