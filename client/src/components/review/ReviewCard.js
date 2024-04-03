import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-user">
        <img src={review.user.img} alt={review.user.username} />
        <span>{review.user.username}</span>
      </div>
      <div className="review-content">
        <p>{review.content}</p>
      </div>
      <div className="review-rating">{review.rating}/10</div>
    </div>
  );
};

export default ReviewCard;