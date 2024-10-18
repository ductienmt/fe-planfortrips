import React from 'react';

function BookingHotelRoomOptions() {
    const rooms = [
        {
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac8292497f64c74b532d6b7d2dd1d5fe04e98b3a6c37b4972fa0ff7c4c1f2b8f?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
            capacity: "Giới hạn: 1 người",
            price: "750,000đ / đêm"
        },
        {
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/005c6759c126cf537ca94af2698983de0d0a60752bb3435d050b52c3811d68b9?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
            capacity: "Giới hạn: 2 người",
            price: "950,000đ / đêm"
        },
        {
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ad1249466ab09c450af471f876ae44c5ad0a2ba87835a0c5b810e59c882724c9?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
            capacity: "Giới hạn: 2 người lớn, 1-2 trẻ em từ 3-7 tuổi",
            price: "1,050,000đ / đêm"
        }
    ];

    return (
        <section className="room-options">
            <h2 className="section-title">Phòng hiện có</h2>
            {rooms.map((room, index) => (
                <div key={index} className="room-option">
                    <img src={room.image} alt={`Room option ${index + 1}`} className="room-image" />
                    <div className="room-details">
                        <p className="room-capacity">{room.capacity}</p>
                        <p className="room-amenities">Bao gồm tất cả tiện ích</p>
                    </div>
                    <div className="room-price">
                        <span className="price-label">Từ</span>
                        <span className="price-amount">{room.price}</span>
                    </div>
                </div>
            ))}
            <style jsx>{`
        .room-options {
          width: 100%;
          margin-top: 20px;
        }
        .room-option {
          display: flex;
          align-items: center;
          gap: 20px;
          background-color: #f4feff;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 12px;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }
        .room-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
        }
        .room-details {
          flex-grow: 1;
        }
        .room-capacity {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .room-amenities {
          color: #6f6f6f;
          font-size: 14px;
        }
        .room-price {
          text-align: right;
        }
        .price-label {
          display: block;
          color: #818181;
          font-size: 12px;
        }
        .price-amount {
          color: #eb0101;
          font-size: 18px;
          font-weight: 700;
        }
        @media (max-width: 991px) {
          .room-option {
            flex-direction: column;
            align-items: flex-start;
          }
          .room-price {
            align-self: flex-end;
          }
        }
      `}</style>
        </section>
    );
}

export default BookingHotelRoomOptions;
