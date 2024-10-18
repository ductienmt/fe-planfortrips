import React from "react";

const AccommodationInfo = ({ text, className }) => {
    return <p className={className}>{text}</p>;
};

const InfantAccommodation = () => {
    const infantDetails = [
        {
            text: "Ở miễn phí nếu sử dụng giường có sẵn.",
            className: "free-accommodation"
        },
        {
            text: "Cung cấp cũi/nôi em bé theo yêu cầu",
            className: "crib-provision"
        },
    ];

    const childDetails = [
        {
            text: "Có thể tính thêm phí nếu yêu cầu giường phụ.",
            className: "extra-bed-fee"
        },
        {
            text: "Không có cũi/nôi em bé cho độ tuổi này.",
            className: "no-crib"
        },
    ];

    const adultDetails = [
        {
            text: "Phải sử dụng giường phụ nếu yêu cầu.",
            className: "mandatory-extra-bed"
        },
        {
            text: "Tính phí như người lớn.",
            className: "adult-pricing"
        },
    ];

    const renderAccommodationSection = (title, iconUrl, details) => (
        <div className="info-section">
            <div className="info-container">
                <img
                    loading="lazy"
                    src={iconUrl}
                    className="infant-icon"
                    alt="Accommodation icon"
                />
                <h2 className="age-range">{title}</h2>
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
        <section className="infant-accommodation">
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
            <style jsx>{`
                .infant-accommodation {
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    width: 100%;
                    color: #000;
                    padding: 8px 2px 23px 13px;
                    font: 900 12px/16px Inter, -apple-system, Roboto, Helvetica, sans-serif;
                    border: 1px solid #dddfe2;
                }

                .info-section {
                    border: 1px solid #dddfe2;
                    border-radius: 4px;
                    padding: 12px;
                }

                .info-container {
                    display: flex;
                    gap: 14px;
                }

                .infant-icon {
                    aspect-ratio: 1;
                    object-fit: contain;
                    object-position: center;
                    width: 24px;
                    align-self: start;
                    margin-top: 5px;
                }

                .age-range {
                    font-size: 12px;
                    line-height: 16px;
                    margin: 0;
                }

                .free-accommodation,
                .extra-bed-fee,
                .mandatory-extra-bed {
                    font-size: 14px;
                    line-height: 20px;
                    margin-top: 14px;
                    width: 246px;
                }

                .crib-provision,
                .no-crib,
                .adult-pricing {
                    color: #737373;
                }

                @media (max-width: 991px) {
                    .infant-accommodation {
                        margin-top: 13px;
                    }

                    .free-accommodation {
                        margin-right: 10px;
                    }
                }
            `}</style>
        </section>
    );
};

export default InfantAccommodation;
