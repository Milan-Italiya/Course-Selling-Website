import React, { useContext, useState } from 'react';
import '../css/Contact.css'; // Import your CSS file
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../Context/UserContext';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const { fetchFeedBackData } = useContext(UserContext)

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error for the specific field when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        }
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Name is required.';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.subject) {
            newErrors.subject = 'Subject is required.';
        }
        if (!formData.message) {
            newErrors.message = 'Message is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitSuccess(false);
        setSubmitError(null);

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            fetchFeedBackData({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            })


            // await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        } catch (error) {
            setSubmitError(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <section className="contact-section">
                <div className="contact-container">
                    <h2>Contact Us</h2>
                    <p className="contact-intro">
                        Have questions about our courses or need assistance? We're here to help!
                        Fill out the form below or reach out to us directly using the information provided.
                    </p>

                    <div className="contact-content">
                        <div className="contact-info">
                            <h3>Our Details</h3>
                            <p><strong>Email:</strong> <a href="mailto:support@yourcourses.com">office@learnova.com</a></p>
                            <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                            <p><strong>Address:</strong> 123 Course Lane, Suite 456, Learning City, LC 78901</p>
                            <p><strong>Business Hours:</strong> Mon - Fri, 9:00 AM - 5:00 PM (EST)</p>
                            <div className="social-media">
                                <h3>Follow Us</h3>
                                <a href="https://facebook.com/yourcourses" target="_blank" rel="noopener noreferrer">Facebook</a>
                                <a href="https://twitter.com/yourcourses" target="_blank" rel="noopener noreferrer">Twitter</a>
                                <a href="https://linkedin.com/company/yourcourses" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                {/* Add more social links as needed */}
                            </div>
                        </div>

                        <div className="contact-form-wrapper">
                            <h3>Send us a Message</h3>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        aria-invalid={errors.name ? "true" : "false"}
                                        aria-describedby={errors.name ? "name-error" : null}
                                    />
                                    {errors.name && <p className="error-message" id="name-error">{errors.name}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        aria-invalid={errors.email ? "true" : "false"}
                                        aria-describedby={errors.email ? "email-error" : null}
                                    />
                                    {errors.email && <p className="error-message" id="email-error">{errors.email}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Briefly describe your inquiry"
                                        aria-invalid={errors.subject ? "true" : "false"}
                                        aria-describedby={errors.subject ? "subject-error" : null}
                                    />
                                    {errors.subject && <p className="error-message" id="subject-error">{errors.subject}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Type your message here..."
                                        aria-invalid={errors.message ? "true" : "false"}
                                        aria-describedby={errors.message ? "message-error" : null}
                                    ></textarea>
                                    {errors.message && <p className="error-message" id="message-error">{errors.message}</p>}
                                </div>

                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {submitSuccess && (
                                    <p className="success-message">
                                        Your message has been sent successfully! We'll get back to you soon.
                                    </p>
                                )}

                                {submitError && (
                                    <p className="error-message">
                                        {submitError}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;