import React from "react";
import "./InfantAccommodation.css";

const AccommodationInfo = ({ text, className }) => {
    return <p className={className}>{text}</p>;
};

const InfantAccommodation = () => {
    const infantDetails = [
        {
            text: "Ở miễn phí nếu sử dụng giường có sẵn.",
            className: "infant-free-accommodation-text"
        },
        {
            text: "Cung cấp cũi/nôi em bé theo yêu cầu",
            className: "infant-crib-provision-text"
        },
    ];

    const childDetails = [
        {
            text: "Có thể tính thêm phí nếu yêu cầu giường phụ.",
            className: "child-extra-bed-fee-text"
        },
        {
            text: "Không có cũi/nôi em bé cho độ tuổi này.",
            className: "child-no-crib-text"
        },
    ];

    const adultDetails = [
        {
            text: "Phải sử dụng giường phụ nếu yêu cầu.",
            className: "adult-mandatory-extra-bed-text"
        },
        {
            text: "Tính phí như người lớn.",
            className: "adult-pricing-text"
        },
    ];

    const renderAccommodationSection = (title, iconUrl, details) => (
        <div className="info-section">
            <div className="info-container">
                <img
                    loading="lazy"
                    src={iconUrl}
                    className="infant-icon-image"
                    alt="Accommodation icon"
                />
                <h2 className="age-range-title">{title}</h2>
            </div>
            <div className="cards-container">
                {details.map((detail, index) => (
                    <AccommodationInfo
                        key={index}
                        text={detail.text}
                        className={detail.className}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="accommodation-info-container">
            <section className="accommodation-section">
                {renderAccommodationSection(
                    "Trẻ sơ sinh 0-2 tuổi [bao gồm cả bé 2 tuổi]",
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/506c7a4d2a1f4da6211fc290f6c9bd142cf20f52909c112d2bc0f0ad595cc007?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
                    infantDetails
                )}
                {renderAccommodationSection(
                    "Trẻ em 3-5 tuổi [bao gồm cả bé 5 tuổi]",
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/506c7a4d2a1f4da6211fc290f6c9bd142cf20f52909c112d2bc0f0ad595cc007?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
                    childDetails
                )}
                {renderAccommodationSection(
                    "Những khách từ 6 tuổi trở lên tính là người lớn",
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/506c7a4d2a1f4da6211fc290f6c9bd142cf20f52909c112d2bc0f0ad595cc007?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
                    adultDetails
                )}
            </section>
        </div>
    );
};

export default InfantAccommodation;
