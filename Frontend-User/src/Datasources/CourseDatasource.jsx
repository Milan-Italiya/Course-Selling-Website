import { toast } from "react-toastify";

export async function getCourses() {
  try {
    const response = await fetch('http://localhost:5000/api/v1/course/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("data", data);
    return data.course;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // rethrow so caller knows there was a failure
  }
}
export async function getCoursesBySearch() {
  try {
    const response = await fetch('http://localhost:5000/api/v1/course/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("Courses: ", data);
    return data.course;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // rethrow so caller knows there was a failure
  }
}

export async function getCourseDetails(courseId) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/course/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("Course Details: ", data);
    return data.course;
  } catch (error) {
    console.log("Error fetching course details:", error);
    throw error; // rethrow so caller knows there was a failure
  }
}

export const buyCourses = async (courseId) => {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:5000/api/v1/course/buy/${courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    const data = await response.json();
    console.log("datasource buy data:", data);
    return {
      ok: response.ok,
      message: data.message,
      errors: data.errors || data.error || [],
      status: response.status,
      course: data.course,
      clientSecret: data.clientSecret
    }
  } catch (error) {
    console.log("error in fetch buy data", error)
  }
}

export const orderCourse = async (orderData) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    toast.error("Please login to purchase courses");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/v1/order`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
    const data = await response.json();
    console.log("datasource order data:", data);
    return {
      ok: response.ok,
      status: response.status,
      orderInformation: data.orderInfo
    }
  } catch (error) {
    console.log("error in fetch buy data", error)
  }
}