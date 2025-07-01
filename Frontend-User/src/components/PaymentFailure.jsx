import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/PaymentFailure.css';

const PaymentFailure = () => {
    return (
        <>
            <Navbar />
            <div className="payment-failed-container">
                <div className="failed-card">
                    <div className="cross-container">
                        <div className="cross-circle">
                            <svg className="cross-icon" viewBox="0 0 52 52">
                                <line x1="16" y1="16" x2="36" y2="36" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                                <line x1="36" y1="16" x2="16" y2="36" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                    <h1>❌ Payment Failed</h1>
                    <p>Oops! Something went wrong while processing your payment.</p>
                    <p>Please try again or contact support if the issue persists.</p>
                    <a href="/courses">
                        <button className="failed-btn">Back to Courses</button>
                    </a>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentFailure;
