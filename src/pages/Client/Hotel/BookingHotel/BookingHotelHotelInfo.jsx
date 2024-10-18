import React from 'react';
import BookingHotelStarRating from './BookingHotelStarRating';

function BookingHotelHotelInfo() {
    return (
        <section className="hotel-info">
            <div className="hotel-details">
                <h1 className="hotel-name">Khách sạn Mường Thanh</h1>
                <p className="hotel-address">Địa chỉ: 086, Đường Thanh Niên, thành phố Lào Cai, Việt Nam</p>
                <BookingHotelStarRating rating={5} reviewCount={1000} />
            </div>
            <div className="booking-info">
                <div className="price-info">
                    <p className="original-price">Giá gốc: <span>3,690,000đ</span></p>
                    <p className="discounted-price">Giá sau giảm: <span>1,750,000đ</span></p>
                    <p className="tax-info">( Đã bao gồm thuế, phí )</p>
                </div>
                <button className="book-button">Đặt phòng</button>
            </div>
            <style jsx>{`
        .hotel-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 25px;
          width: 100%;
        }
        .hotel-name {
          color: #000;
          font-size: 23px;
          font-weight: 700;
          line-height: 30px;
        }
        .hotel-address {
          color: #828282;
          font-size: 14px;
          line-height: 21px;
        }
        .booking-info {
          text-align: right;
          margin-left: 750px;
          margin-top : -150px;
        }
        .price-info {
          margin-bottom: 10px;
        }
        .original-price {
          color: #0a0a0a;
          font-size: 14px;
        }
        .discounted-price {
          color: #eb0101;
          font-size: 18px;
          font-weight: 700;
        }
        .tax-info {
          color: #818181;
          font-size: 12px;
        }
        .book-button {
          background-color: #0976cf;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .hotel-info {
            flex-direction: column;
            gap: 20px;
          }
          .booking-info {
            text-align: left;
          }
        }
      `}</style>
        </section>
    );
}

export default BookingHotelHotelInfo;
