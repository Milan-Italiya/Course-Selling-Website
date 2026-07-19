import React, { useState } from 'react'; // Import useState
import '../css/TermsCondition.css'; // Import your CSS file
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const TermsCondition = () => {
    const [agreed, setAgreed] = useState(false); // State for the checkbox

    const handleCheckboxChange = (event) => {
        setAgreed(event.target.checked);
    };

    const handleAgree = () => {
        // This is where you'd typically redirect the user or enable account creation.
        // For demonstration, we'll just log to the console.
        console.log("User agreed to the Terms and Conditions!");
        alert("Thank you for agreeing to our Terms and Conditions!");
        // Example: navigate('/dashboard') or proceed with user registration/login flow
    };

    return (
        <>
            <Navbar />
            <div className="terms-container">
                <h1 className="terms-title">Terms and Conditions</h1>
                <p className="terms-date">Last updated: June 20, 2025</p>

                <section className="terms-section">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Learnova, you agree to be bound by these Terms and Conditions ("Terms"), our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these Terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>2. Services Offered</h2>
                    <p>
                        Learnova provides an online platform that offers various educational courses, tutorials, and learning materials ("Courses") created by our instructors. These Courses may include video lectures, written content, quizzes, assignments, and other resources.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>3. User Accounts</h2>
                    <h3>Registration</h3>
                    <p>
                        To access certain features of the Site and enroll in Courses, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                    </p>
                    <h3>Account Security</h3>
                    <p>
                        You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We are not liable for any loss or damage arising from your failure to comply with this security obligation.
                    </p>
                    <h3>Eligibility</h3>
                    <p>
                        By creating an account, you represent and warrant that you are at least 18 years of age or the age of legal majority in your jurisdiction, and are otherwise capable of forming a binding contract. If you are under 18, you may use the Site only with the involvement of a parent or guardian.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>4. Course Enrollment and Access</h2>
                    <h3>Payment</h3>
                    <p>
                        All Course enrollments are subject to payment of the applicable fees. Prices for Courses are displayed on the Site and are subject to change. All payments are processed securely through our third-party payment processors: Stripe. You agree to pay all fees and applicable taxes incurred by you or anyone using your account.
                    </p>
                    <h3>Course Access</h3>
                    <p>
                        Upon successful payment, you will be granted a non-exclusive, non-transferable, limited license to access and view the purchased Course content through the Site for the lifetime of the course, 5 years, 1 year or as otherwise specified on the course page. This license is for your personal, non-commercial use only.
                    </p>
                    <h3>Refunds</h3>
                    <p>
                        Our refund policy is as follows: Clearly state your refund policy, "Full refunds are available within 7 days of purchase if less than 10% of the course content has been viewed," or "No refunds once the course has been accessed." Be very specific. For refund requests, please contact our support team support@learnova.com.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>5. Intellectual Property Rights</h2>
                    <h3>Our Content</h3>
                    <p>
                        The Site and all content, features, and functionality including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof, are owned by Learnova, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                    </p>
                    <h3>Course Content</h3>
                    <p>
                        All Course content, including but not limited to videos, texts, images, and supplementary materials, is the intellectual property of Learnova or its instructors who have granted us the right to use and distribute their content. You are granted a limited, non-exclusive, non-transferable license to access and view the Course content solely for your personal, non-commercial educational purposes.
                    </p>
                    <p>
                        You agree not to reproduce, redistribute, transmit, assign, sell, broadcast, rent, share, lend, modify, adapt, edit, create derivative works of, sublicense, or otherwise transfer or use any Course content unless expressly authorized by us in writing.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>6. User Conduct</h2>
                    <p>You agree not to:</p>
                    <ul>
                        <li>Use the Site for any unlawful purpose or in any way that could harm, disable, overburden, or impair the Site.</li>
                        <li>Attempt to gain unauthorized access to any portion or feature of the Site, or any other systems or networks connected to the Site.</li>
                        <li>Upload, post, transmit, or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
                        <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                        <li>Violate any applicable local, state, national, or international law.</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2>7. Disclaimers</h2>
                    <p>
                        THE SITE AND COURSES ARE PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS.LEARNOVA MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS AND NEGATES ALL OTHER WARRANTIES, INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.
                    </p>
                    <p>
                        FURTHER, LEARNOVA DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS CONCERNING THE ACCURACY, LIKELY RESULTS, OR RELIABILITY OF THE USE OF THE MATERIALS ON ITS WEBSITE OR OTHERWISE RELATING TO SUCH MATERIALS OR ON ANY SITES LINKED TO THIS SITE.
                    </p>
                    <p>
                        We do not guarantee that your use of our service will be uninterrupted, timely, secure, or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>8. Limitation of Liability</h2>
                    <p>
                        IN NO EVENT SHALL LEARNOVA OR ITS SUPPLIERS BE LIABLE FOR ANY DAMAGES INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF DATA OR PROFIT, OR DUE TO BUSINESS INTERRUPTION ARISING OUT OF THE USE OR INABILITY TO USE THE MATERIALS ON LEARNOVA's WEBSITE, EVEN IF LEARNOVA OR A LEARNOVA AUTHORIZED REPRESENTATIVE HAS BEEN NOTIFIED ORALLY OR IN WRITING OF THE POSSIBILITY OF SUCH DAMAGE. BECAUSE SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES, OR LIMITATIONS OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THESE LIMITATIONS MAY NOT APPLY TO YOU.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>9. Governing Law and Jurisdiction</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Gujarat, India and you irrevocably submit to the exclusive jurisdiction of the courts in Surat, Gujarat, India.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>10. Changes to Terms</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.
                    </p>
                </section>

                <section className="terms-section">
                    <h2>11. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms, please contact us:
                    </p>
                    <ul>
                        <li>By email: support@learnova.com</li>
                        <li>By visiting this page on our website: www.learnova.com</li>
                        <li>By mail: 123 Course Lane, Suite 456, Learning City, LC 78901 </li>
                    </ul>
                </section>

                {/* New Checkbox and Button Section */}
                <div className="agreement-checkbox-container">
                    <input
                        type="checkbox"
                        id="terms-agree"
                        checked={agreed}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms-agree">
                        I have read and agree to the **Terms and Conditions**.
                    </label>
                    <button
                        className="agree-button"
                        onClick={handleAgree}
                        disabled={!agreed}
                    >
                        Agree and Proceed
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsCondition;