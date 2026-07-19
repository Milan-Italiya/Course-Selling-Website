import React, { useState, useEffect, useContext } from "react";
import "../css/Purchase.css";
import "../css/AppAnimation.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PurchaseCard from "../components/PurchaseCard";

import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

import AOS from "aos";
import "aos/dist/aos.css";

const Purchase = () => {
  const [errMessage, setErrMessage] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [pendingToast, setPendingToast] = useState(null);

  const { fetchPurchases, purchase, fetchPurchasesBySearch } =
    useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let loaderTimer;

    document.body.classList.add("loading");

    const loadPurchases = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        document.body.classList.remove("loading");

        navigate("/login", {
          state: {
            loginerrMessage: "please login first to access our website",
          },
        });

        return;
      }

      try {
        window.scrollTo(0, 0);

        if (location.state?.purchaseMessage) {
          setPendingToast({
            type: "success",
            message: location.state.purchaseMessage,
          });
        }

        if (location.state?.purchaseError) {
          setPendingToast({
            type: "error",
            message: location.state.purchaseError,
          });
        }

        if (location.state?.purchaseMessage || location.state?.purchaseError) {
          navigate(location.pathname, { replace: true });
        }

        await fetchPurchases();

        loaderTimer = setTimeout(() => {
          setShowLoader(false);
          document.body.classList.remove("loading");
        }, 1800);
      } catch (error) {
        console.log(error);

        setErrMessage("Failed to load purchase data");
        setShowLoader(false);
        document.body.classList.remove("loading");
      }
    };

    loadPurchases();

    return () => {
      clearTimeout(loaderTimer);
      document.body.classList.remove("loading");
    };
  }, []);

  // Toast will show only after loader is completed
  useEffect(() => {
    if (showLoader || !pendingToast) return;

    const toastTimer = setTimeout(() => {
      toast.dismiss();

      if (pendingToast.type === "success") {
        toast.success(pendingToast.message);
      }

      if (pendingToast.type === "error") {
        toast.error(pendingToast.message);
      }

      setPendingToast(null);
    }, 200);

    return () => clearTimeout(toastTimer);
  }, [showLoader, pendingToast]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token || showLoader) return;

    const interval = setInterval(() => {
      fetchPurchases();
    }, 5000);

    return () => clearInterval(interval);
  }, [showLoader]);

  useEffect(() => {
    if (!showLoader) {
      AOS.refresh();
    }
  }, [purchase, showLoader]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ zIndex: 999999 }}
      />

      {showLoader ? (
        <div className="loader-container">
          <div className="loader">
            <span></span>
          </div>
        </div>
      ) : (
        <div className="purchase-page page-animation">
          <Navbar />

          <div className="purchase-container">
            <h2
              className="purchase-heading"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              My Courses
            </h2>

            <div
              className="search-container"
              data-aos="zoom-in"
              data-aos-delay="250"
            >
              <i className="fas fa-search"></i>

              <input
                type="text"
                name="searchbox"
                id="searchbox"
                onChange={(e) => fetchPurchasesBySearch(e.target.value)}
                placeholder="Search Purchases..."
              />
            </div>

            {errMessage && (
              <div
                className="purchase-error"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                {errMessage}
              </div>
            )}

            <div
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="1000"
            >
              <PurchaseCard purchases={purchase?.courseData || []} />
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Purchase;