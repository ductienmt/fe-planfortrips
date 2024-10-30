import React from 'react';
import "./HotelPolicies.css";
import InfantAccommodation from './InfantAccommodation';

const HotelPoliciesContainer = () => {
    const checkInPolicies = [
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f5ea5e6c1ba8adcd3cdc5d1ed3a31b394b01868d52898fd5abab6e28acbbf93d?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Nhận phòng từ: 14:00" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f5ea5e6c1ba8adcd3cdc5d1ed3a31b394b01868d52898fd5abab6e28acbbf93d?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Nhận phòng đến: 23:59" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f5ea5e6c1ba8adcd3cdc5d1ed3a31b394b01868d52898fd5abab6e28acbbf93d?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Trả phòng đến: 12:00" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b643aebfa4eb77e0c8e2e9a268379f5d0b55a26b27bd3008efeb24abe3b1f185?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Quầy tiếp tân mở đến: 23:59" },
    ];

    const hotelInfo = [
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6d57b3bda3fbe3ed70a961b3abcdce27ca9df36692db0de4f876b546efa8265?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Số lượng quán bar: 1" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ee59ab7d839d5709f4e99b28e3ab64c54ce0c86c910fd1da5f98b5cd7cb7025?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Số lượng tầng: 18" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bfbb660fb1416810b1b25d25cd1262676acf05f8f8103d1355b0807b6a3eb8a6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Số lượng nhà hàng: 1" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0b89055da1f450e538fe4a67272f8a3051e61f8d525c6dd7c64aacd7134de9b7?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Số lượng phòng: 195" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e47d5e3f0b4f0ce3372ca83662dc7846f58c732dbc2146b0090aad73f818502?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Được xây vào năm: 2015" },
    ];

    return (
        <div className="hotel-policies-container-wrapper">
            <div className="hotel-policies-container">
                <div className="policies-grid-wrapper">
                    <div className="policies-columns-wrapper">
                        <div className="policies-left-column">
                            <div className="policies-content-wrapper">
                                <h3 className="policies-title">Quy định chỗ nghỉ</h3>
                                <div className="policies-list-wrapper">
                                    <h4>Nhận phòng/ Trả phòng</h4>
                                    {checkInPolicies.map((policy, index) => (
                                        <div key={index} className="policy-item-wrapper">
                                            <img loading="lazy" src={policy.icon} alt="" className="policy-icon" />
                                            <span className="policy-description">{policy.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="policies-right-column">
                            <div className="policies-content-wrapper">
                                <h3 className="policies-title">Về khách sạn</h3>
                                <div className="policies-list-wrapper">
                                    {hotelInfo.map((info, index) => (
                                        <div key={index} className="policy-item-wrapper">
                                            <img loading="lazy" src={info.icon} alt="" className="policy-icon" />
                                            <span className="policy-description">{info.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="policies-title">Trẻ em và giường phụ</h3>
                <p>Giường phụ tùy thuộc vào loại phòng bạn chọn, xin vui lòng kiểm tra thông tin phòng để biết thêm chi tiết.</p>
                <p>Tất cả trẻ em đều được chào đón.</p>
                <InfantAccommodation />
            </div>
        </div>
    );
};

export default HotelPoliciesContainer;
