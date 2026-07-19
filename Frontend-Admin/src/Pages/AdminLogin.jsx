import React, { useContext, useEffect, useState } from "react";
import "../css/Login.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import Loader from "../components/Loader.jsx"; // change path only if needed

const AdminLoginPage = () => {
  const { handleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const {
        loginerrMessage,
        logoutMessage,
        registerMessage,
        dashboardMessage,
      } = location.state;

      if (loginerrMessage) toast.error(loginerrMessage);
      if (logoutMessage) toast.success(logoutMessage);
      if (registerMessage) toast.success(registerMessage);
      if (dashboardMessage) toast.error(dashboardMessage);

      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Loader starts immediately after Login click

      const response = await handleLogin({
        email,
        password,
      });

      if (response?.ok) {
        sessionStorage.setItem("admin", JSON.stringify(response.admin));
        sessionStorage.setItem("token", response.token);

        await new Promise((resolve) => setTimeout(resolve, 4000));

        navigate("/", {
          replace: true,
          state: {
            loginMessage: response.message || "Login successful!",
          },
        });

        // Do not use setLoading(false) here.
        // Loader stays visible until dashboard route opens.
        return;
      }

      setLoading(false);

      if (Array.isArray(response?.errors)) {
        response.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(response?.errors || "Login failed");
      }

      console.error("Login failed:", response);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {loading ? (
        <Loader />
      ) : (
        <div className="login-container">
          <form className="login-form" onSubmit={handlesubmit}>
            <h2>Login to Your Admin Account</h2>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />

                <span
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </div>
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>

            <div className="register-link">
              Don't have an account? <a href="/admin/signup">Register here</a>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminLoginPage;