import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/PaymentSuccess.css'; // Optional for styling

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [paymentId, setPaymentId] = useState("")
    const [purchasedCourses, setPurchasedCourses] = useState([]);

    const sessionId = new URLSearchParams(location.search).get('session_id')
    console.log(sessionId)
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!sessionId) return;

        const fetchPaymentInfo = async () => {  
            try {
                const res = await fetch(`http://localhost:5000/api/v1/course/verify?session_id=${sessionId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch payment info");

                const data = await res.json();
                console.log(data);
                setPaymentId(data.paymentId); // Adjust key according to backend response
            } catch (error) {
                toast.error("Failed to fetch payment info.");
                console.error(error);
            }
        };

        fetchPaymentInfo();
    }, [sessionId, token]);



    // useEffect(() => {
    //     const fetchPurchasedCourses = async () => {
    //         try {
    //             const res = await fetch('http://localhost:5000/api/v1/user/purchased', {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             if (!res.ok) throw new Error('Failed to fetch purchased courses');

    //             const data = await res.json();
    //             setPurchasedCourses(data.courses);
    //         } catch (error) {
    //             toast.error(error.message);
    //         }
    //     };

    //     if (token) {
    //         fetchPurchasedCourses();
    //     }
    // }, [token]);



    const handleGoToCourses = () => {
        navigate('/course'); // Or wherever your user's courses are listed
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={1000} />
            <div className="payment-success-container">
                <div className="success-card">
                    <div className="tick-container">
                        <div className="checkmark-circle">
                            <svg className="checkmark-icon" viewBox="0 0 52 52">
                                <path d="M14 27l7 7 17-17" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>


                    <h1>✅ Payment Successful!</h1>
                    <p>Thank you for your purchase. You now have access to the course.</p>
                    {paymentId && <p className="payment-id">Transaction ID: {paymentId}</p>}
                    <div className="success-buttons">
                        <button onClick={handleGoToCourses}>Go to My Courses</button>
                        <button onClick={handleGoHome}>Go to Home</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentSuccess;
