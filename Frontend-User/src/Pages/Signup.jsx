import React, { useContext, useEffect, useState } from 'react';
import '../css/Signup.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Required
import { Link, useNavigate } from 'react-router-dom';
import NavbarLS from '../components/NavbarLS.jsx';
import { AuthContext } from '../Context/AuthContext.jsx';

const Signup = () => {
  const { handleSignup } = useContext(AuthContext)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const result = await handleSignup({
        firstName: firstname,
        lastName: lastname,
        email,
        password,
      });

      console.log("result:", result); // 🔍 Debugging

      if (result.ok) {
        navigate('/login', { state: { registerMessage: result.message || "Signup successful!" } });

        // ✅ Clear form fields
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
      } else {
        // ✅ Show all errors
        setLoading(false)
        if (Array.isArray(result.errors)) {
          result.errors.forEach((err) => toast.error(err));
        } else if (typeof result.errors === "string") {
          toast.error(result.errors);
        } else {
          toast.error("Signup failed. Please try again.");
        }
      }
    } catch (error) {
      setLoading(false)
      // ✅ Handle unexpected errors
      toast.error("Something went wrong. Please try again.");
      console.error("Unexpected signup error:", error);
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <NavbarLS />
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="signup-container">
        <h2 className="signup-heading">Create Your Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder='Enter your first name'
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder='Enter your last name'
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>{loading ? "Signing up, please wait..." : "Sign Up"}</button>

          <div className="login-link">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
