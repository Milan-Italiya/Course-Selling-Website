import React, { useState, useEffect, useContext } from "react";
import "../css/Purchase.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import PurchaseCard from "../components/PurchaseCard";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Purchase = () => {
    // const [purchases, setPurchases] = useState([]);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const { fetchPurchases, purchase, fetchPurchasesBySearch } =
        useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    console.log("purchases:", purchase);

    // Show toast messages
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login", {
                state: { loginerrMessage: "please login first to access our website" },
            });
        }
        if (location.state && location.state?.purchaseMessage) {
            toast.success(location.state.purchaseMessage);
            navigate(location.pathname, { replace: true }); // clears state
        }

        if (location.state && location.state?.purchaseError) {
            toast.error(location.state.purchaseError);
        }
    }, []);

    // token verification
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsLoggedin(!!token);
    }, []);

    // purchase code
    useEffect(() => {
        // const token = sessionStorage.getItem('token');

        // const fetchPurchases = async () => {
        //     if (!token) {
        //         setErrMessage("Please login to purchase courses");
        //         toast.error("Please login to purchase courses");
        //         return;
        //     }

        //     try {
        //         const response = await fetch(`http://localhost:5000/api/v1/user/purchased`, {
        //             method: 'GET',
        //             headers: {
        //                 'Authorization': `Bearer ${token}`,
        //                 'Content-Type': 'application/json'
        //             },
        //             credentials: 'include'
        //         });

        //         const data = await response.json();
        //         console.log("data", data);

        //         setPurchases(data.courseData || []);
        //     } catch (error) {
        //         setErrMessage("Failed to load purchase data", error);
        //     }
        // };
        // fetchPurchases();
        try {
            fetchPurchases();
        } catch (error) {
            setErrMessage("Failed to load purchase data", error);
        }
    }, []);

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={2000} />
            {isLoggedin && (
                <div className="purchase-container">
                    <h2 className="purchase-heading">Purchase Items</h2>
                    <div className="search-container">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            name="searchbox"
                            id="searchbox"
                            onChange={(e) => {
                                fetchPurchasesBySearch(e.target.value);
                            }}
                            placeholder="Search Purchases..."
                        />
                    </div>
                    {errMessage && <div className="purchase-error">{errMessage}</div>}
                    <PurchaseCard purchases={purchase?.courseData || []} />
                </div>
            )}
            <Footer />
        </>
    );
};

export default Purchase;
