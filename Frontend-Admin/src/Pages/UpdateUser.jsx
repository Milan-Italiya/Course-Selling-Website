import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../css/UpdateUser.css";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../Context/UserContext";
import FormSkeleton from "../components/Skeleton/FormSkeleton";

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { fetchUserById, fetchUpdateUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true)

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [originalUser, setOriginalUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {

        const data = await fetchUserById(userId);

        console.log("Fetched User:", data);

        if (data?.success) {
          const fetchedUser = {
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            email: data.user.email || "",
            password: "",
          };

          setUser(fetchedUser);
          setOriginalUser(fetchedUser);
        } else {
          toast.error(data?.errors || "User not found");
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message || "Failed to fetch user");
      } finally {
        setTimeout(() => {
          setPageLoading(false);
        }, 1500);
      }
    };

    if (userId) {
      loadUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const isChanged =
    user.firstName !== originalUser.firstName ||
    user.lastName !== originalUser.lastName ||
    user.email !== originalUser.email ||
    user.password !== "";

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = { ...user };

    if (!payload.password) {
      delete payload.password;
    }

    try {
      setUpdateLoading(true);

      const data = await fetchUpdateUser(userId, payload);

      console.log("Update Response:", data);

      if (data?.success) {
        navigate("/admin/users", {
          state: {
            updateMessage: data.message || "User updated successfully!",
          },
        });
      } else {
        toast.error(data?.errors || data?.message || "Failed to update user");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Failed to update user");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div id="divider">
        <div className="left-sidebar">
          <Sidebar />
        </div>

        {
          pageLoading ? (<FormSkeleton />
          ) : (
            <div className="right-content">
              <h2 className="user-heading">Update User</h2>
              <div className="user-course-container">
                <form onSubmit={handleUpdate} className="user-course-form">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />

                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />

                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />

                  <div className="form-group">
                    <label>Password</label>

                    <div className="password-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep same"
                      />

                      <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <i className="fa-solid fa-eye"></i>
                        ) : (
                          <i className="fa-solid fa-eye-slash"></i>
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={updateLoading || !isChanged}
                    style={{
                      opacity: updateLoading || !isChanged ? "0.6" : "1",
                      cursor:
                        updateLoading || !isChanged ? "not-allowed" : "pointer",
                    }}
                  >
                    {updateLoading ? "Updating..." : "Update User"}
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

export default UpdateUser;