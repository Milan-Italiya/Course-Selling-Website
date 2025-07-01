import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import '../css/Buy.css';
import { CourseContext } from '../Context/CourseContext';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const Buy = () => {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [course, setCourse] = useState({})
    const [clientSecret, setClientSecret] = useState("")
    const [error, setError] = useState("")
    const { courseDetails, order, fetchCourseDetails, fetchBuyCourse, fetchOrderCourse } = useContext(CourseContext);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [cardSuccess, setCardSuccess] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCourseDetails(courseId);
    }, [courseId]);

    if (!token) {
        toast.error("Please login to buy the course");
    }

    // with stripe include

    useEffect(() => {
        const fetchBuyCourseData = async () => {
            try {
                const data = await fetchBuyCourse(courseId)
                console.log("Buy course: ", data)
                if (data?.status === 400) {
                    setError("you have already purchased this course");
                    navigate("/purchases", { state: { purchaseError: data.errors } });
                }
                setCourse(data?.course)
                setClientSecret(data?.clientSecret)
                console.log("client secret : ", data?.clientSecret);
                setLoading(false)
            } catch (error) {
                setLoading(false);
                setError(error.message || "Something went wrong.");
            }
        }
        fetchBuyCourseData()
    }, [])

    const handlePurchase = async (event) => {
        event.preventDefault();

        try {
            if (!stripe || !elements) {
                console.log("stripe or elements are not found.");
                return;
            }
            setLoading(true)
            const card = elements.getElement(CardElement);

            if (card == null) {
                console.log("card is not found.");
                setLoading(false)
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (error) {
                console.log('Stripe Payment Method Error:', error);
                setLoading(false)
                setCardError(error.message)
            } else {
                console.log('[PaymentMethod Created Successfully]', paymentMethod);
            }
            if (!clientSecret) {
                console.log("No clientsecret found");
                setLoading(false)
                return;
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: user?.firstName + " " + user?.lastName,
                            email: user?.email,
                        },
                    },
                },
            );
            if (confirmError) {
                setCardError(confirmError.message);
            }
            else if (paymentIntent.status === "succeeded") {
                console.log("Payment Succeeded", paymentIntent)
                setCardSuccess(`Payment ID : ${paymentIntent.id}`)
                const PaymentInfo = {
                    name: user?.firstName + " " + user?.lastName,
                    email: user?.email,
                    userId: user._id,
                    courseId: courseId,
                    courseTitle: courseDetails.title,
                    paymentId: paymentIntent.id,
                    status: paymentIntent.status,
                    amount: paymentIntent.amount,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                console.log("PaymentInfo:", PaymentInfo)

                // order details

                const response = await fetchOrderCourse(PaymentInfo)
                console.log("order response in page: ", response)

                if (!response.ok) {
                    console.log("Order Resonse error: ", response)
                } else {
                    console.log("Order Resonse success: ", response)
                }
                navigate('/purchases', { state: { purchaseMessage: "Course purchased successfully" } })
            }
            setLoading(false)
        } catch (error) {
            console.error("Unexpected Error:", error);
            toast.error("Something went wrong while processing your request");
        } finally {
            setLoading(false);
        }


    };


    // without stripe include
    // const handlePurchase1 = async () => {
    // if (!token) {
    //     toast.error("Please login to buy the course");
    //     return;
    // }

    // try {
    //     setLoading(true);

    //     const response = await fetch(`http://localhost:5000/api/v1/course/buy/${courseId}`, {
    //         method: 'POST', // Specify POST method
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`
    //         },
    //         credentials: 'include'
    //     });

    //     const data = await response.json();

    //     if (!response.ok) {
    //         // Handle specific server-side error messages
    //         if (response.status === 400) {
    //             toast.error("You have already purchased this course");
    //         } else {
    //             toast.error(data.errors || "Something went wrong");
    //         }
    //         return;
    //     }

    //     toast.success(data.message || "Course purchased successfully");
    //     navigate('/purchases');
    // } catch (error) {
    //     console.error("Unexpected Error:", error);
    //     toast.error("Something went wrong while processing your request");
    // } finally {
    //     setLoading(false);
    // }
    // };


    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={1000} />
            <div className="payment-wrapper">
                <div className="payment-left">
                    <h2>Purchase Course</h2>
                    <form onSubmit={handlePurchase}>
                        <p><strong>Course:</strong> {courseDetails.title}</p>
                        <p><strong>Price:</strong> ₹ {courseDetails.price}</p>
                        {courseDetails ? (
                            <>
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#fff',
                                                backgroundColor: '#2c2c2c',
                                                iconColor: '#00e6e6',
                                                '::placeholder': {
                                                    color: '#aaa',
                                                },
                                            },
                                            invalid: {
                                                color: '#ff4d4d',
                                                iconColor: '#ff4d4d',
                                            },
                                        },
                                    }}
                                />
                                {cardError && <p id='card-error-show'>{cardError}</p>}
                                {cardSuccess && <p id='card-success-show'>{cardSuccess}</p>}
                                <button className="pay-btn" disabled={!stripe || loading}>
                                    {loading ? 'Processing...' : 'Buy Now'}
                                </button>
                            </>
                        ) : (
                            <p>{loading ? 'Loading course details...' : 'Course not found'}</p>
                        )}
                    </form>
                </div>
                <div className="payment-right">
                    <h2>User Info</h2>
                    <div className="info-box">
                        <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Buy;