import React from 'react';
import '../css/BuyCard.css'; // Make sure this CSS file matches your theme

const BuyCard = ({ course, onClick }) => {
  if (!course) return null;

  return (
    <div className="buy-card">
      <img src={course.image?.url || '/default.jpg'} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p className="buy-price">Price: ₹{course.price}</p>
      <button className="buy-btn" onClick={() => onClick(course._id)}>
        Buy Now
      </button>
    </div>
  );
};

export default BuyCard;
