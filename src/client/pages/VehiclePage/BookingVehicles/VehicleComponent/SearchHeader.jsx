import React from 'react';
import './SearchHeader.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SearchHeader = () => {
    return (
        <div className="search-header-container-wrapper">
            <div className="search-header-step-indicator">
                <div className="search-header-step-indicator-item">
                    <div className="search-header-step-indicator-number active">1</div>
                    <div className="search-header-step-indicator-text">Tìm chuyến xe</div>
                </div>
                <div className="search-header-step-indicator-item">
                    <div className="search-header-step-indicator-number">2</div>
                    <div className="search-header-step-indicator-text">Đặt vé</div>
                </div>
                <div className="search-header-step-indicator-item">
                    <div className="search-header-step-indicator-number">3</div>
                    <div className="search-header-step-indicator-text">Thanh toán</div>
                </div>
            </div>
            <form className="search-header-form-container">
                <h2 className="search-header-title">Tìm chuyến xe</h2>
                <input className="search-header-input-field" type="text" aria-label="Search for bus trips" />
                <div className="search-header-date-selector">
                    <CalendarTodayIcon style={{ marginRight: '18px' }} />
                    <div className="search-header-date-info">
                        <span className="search-header-date-label">Ngày khởi hành</span>
                        <span className="search-header-selected-date">Chủ nhật, 06/10/2024</span>
                    </div>
                    <ArrowDropDownIcon />
                </div>
                <button className="search-header-submit-button">Tìm kiếm</button>
            </form>
        </div>
    );
};

export default SearchHeader;
