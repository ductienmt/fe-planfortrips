import React from 'react';
import './SearchBar.css';

const DetailedSearchBarContainer = () => {
    return (
        <form className="detailed-search-bar-container">
            <div className="detailed-search-bar-container-destination-input">
                <label htmlFor="destination" className="detailed-search-bar-container-input-label">
                    Điểm đến
                </label>
                <input type="text" id="destination" value="Lào Cai" className="detailed-search-bar-container-input-field" />
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/325743133b68bf84b4542a1afed13849c883d0c5cfa6e1adb88047799b43d7fa?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                    alt=""
                    className="detailed-search-bar-container-input-icon"
                />
            </div>
            <div className="detailed-search-bar-container-date-input">
                <div>
                    <label htmlFor="checkIn" className="detailed-search-bar-container-input-label">
                        Nhận phòng
                    </label>
                    <input type="text" id="checkIn" value="T2, 02 thg12" className="detailed-search-bar-container-input-field" />
                </div>
                <span className="detailed-search-bar-container-nights-count">10 đêm</span>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c7fde8f6d333855cddf7ca00062c54c87283b282ddb1b1469a73d8faf63e92a?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                    alt=""
                    className="detailed-search-bar-container-calendar-icon"
                />
                <div>
                    <label htmlFor="checkOut" className="detailed-search-bar-container-input-label">
                        Trả phòng
                    </label>
                    <input type="text" id="checkOut" value="T5, 12 thg 12" className="detailed-search-bar-container-input-field" />
                </div>
            </div>
            <div className="detailed-search-bar-container-guests-input">
                <label htmlFor="guests" className="detailed-search-bar-container-input-label">
                    Phòng và khách
                </label>
                <input type="text" id="guests" value="1 Phòng, 2 Người Lớn, 0 Trẻ Em" className="detailed-search-bar-container-input-field" />
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/07221e7643d44a28ab07a01a816c262f116013713628fde37828300b806a309e?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                    alt=""
                    className="detailed-search-bar-container-guests-icon"
                />
            </div>
            <button type="submit" className="detailed-search-bar-container-search-button">
                Tìm kiếm
            </button>
        </form>
    );
};

export default DetailedSearchBarContainer;
