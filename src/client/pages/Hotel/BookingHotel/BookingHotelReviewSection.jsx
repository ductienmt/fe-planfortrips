import React from 'react';
import BookingHotelStarRating from './BookingHotelStarRating';

function BookingHotelReviewSection() {
    const reviews = [
        { name: "Huỳnh Anh Quân", rating: 5, comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati similique debitis facilis, deleniti nostrum aperiam molestias repellendus exercitationem fugit ipsam sint?" },
        { name: "Huỳnh Anh Quân", rating: 5, comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati similique debitis facilis, deleniti nostrum aperiam molestias repellendus exercitationem fugit ipsam sint?" },
        { name: "Huỳnh Anh Quân", rating: 2, comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati similique debitis facilis, deleniti nostrum aperiam molestias repellendus exercitationem fugit ipsam sint?" }
    ];

    return (
        <section className="review-section">
            <div className="review-header">
                <h2 className="section-title">Đánh giá</h2>
                <span className="review-count">( hơn 45 đánh giá)</span>
                <button className="add-review-button">Thêm đánh giá</button>
            </div>
            <div className="review-summary">
                <div className="overall-rating">
                    <span className="rating-number">5.0</span> trên 5.0
                </div>
                <div className="rating-filters">
                    <button className="filter-button active">Tất cả</button>
                    <button className="filter-button">5 sao</button>
                    <button className="filter-button">4 sao</button>
                    <button className="filter-button">3 sao</button>
                    <button className="filter-button">2 sao</button>
                    <button className="filter-button">1 sao</button>
                </div>
            </div>
            <div className="review-list">
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <BookingHotelStarRating rating={review.rating} />
                        <h3 className="reviewer-name">{review.name}</h3>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))}
            </div>
            <style jsx>{`
        .review-section {
          width: 100%;
          margin-top: 35px;
        }
        .review-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .review-count {
          color: #999;
          font-size: 14px;
        }
        .add-review-button {
          background-color: #e4f3ff;
          color: #0976cf;
          border: 1px solid #0976cf;
          border-radius: 10px;
          padding: 8px 16px;
          font-weight: 700;
          cursor: pointer;
        }
        .review-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .overall-rating {
          font-size: 40px;
          color: #f9bd2e;
          font-weight: 600;
        }
        .rating-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .filter-button {
          background-color: #fff;
          border: 1px solid #cacaca;
          border-radius: 30px;
          padding: 4px 20px;
          font-size: 13px;
          color: #cacaca;
          cursor: pointer;
        }
        .filter-button.active {
          background-color: #e8f1fd;
          color: #196ada;
          border-color: #196ada;
        }
        .review-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .review-item {
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
        }
        .reviewer-name {
          font-weight: 700;
          margin: 10px 0;
        }
        .review-comment {
          color: #6f6f6f;
          font-size: 14px;
          line-height: 1.5;
        }
        @media (max-width: 991px) {
          .review-header, .review-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
        </section>
    );
}

export default BookingHotelReviewSection;
