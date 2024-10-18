import React from 'react';
import "./styles.css"

const HotelDescription = () => {
    return (
        <div className="hotel-description">
            <div className="hotel-name-rating">
                <h2 className="hotel-name">Khách sạn Mường Thanh</h2>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <img key={star} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/359d68ff6db47925527305fd619fd5fea1f4b9a841fdb15e77d5236a1a8b7c53?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Star" className="star-icon" />
                    ))}
                </div>
            </div>
            <p className="hotel-address">Địa chỉ: 086, Đường Thanh Niên, thành phố Lào Cai, Việt Nam</p>
            <div className="separator" />
            <p className="hotel-description-text">
                Được xây dựng vào năm 2015, Khách sạn Mường Thanh Grand Lào Cai là một trong những cơ sở lưu trú lớn nhất Lào Cai và là sự lựa chọn tuyệt vời dành cho khách du lịch. Từ đây, khách có thể dễ dàng tiếp cận được nét đẹp sống động của thành phố ở mọi góc cạnh. Với vị trí thuận lợi, khách sạn dễ dàng tiếp cận những điểm tham quan du lịch nổi tiếng của thành phố. Khách sạn Mường Thanh Grand Lào Cai là một sự lựa chọn thông minh cho du khách khi đến Lào Cai, nơi mang lại cho họ một kì nghỉ thư giãn và thoải mái.
            </p>
        </div>
    );
};

export default HotelDescription;