import React from 'react';
import { ArrowDropDown, AttachMoney, AccessTime, Star } from '@mui/icons-material';
import './SearchFilters.css';

const SearchFilters = () => {
  return (
    <div className="search-filters-main-container">
      <div className="search-filters-section-container">
        <h3 className="search-filters-section-title">Sắp xếp theo</h3>
        <hr className="search-filters-section-divider" />
        <div className="search-filters-sorting-option">
          <span>Giá tăng dần</span>
          <ArrowDropDown />
        </div>
        <hr className="search-filters-section-divider" />
        <div className="search-filters-sorting-option">
          <span>Giá giảm dần</span>
          <ArrowDropDown />
        </div>
        <hr className="search-filters-section-divider" />
        <div className="search-filters-sorting-option">
          <span>Giờ khởi hành sớm nhất</span>
          <AccessTime />
        </div>
        <hr className="search-filters-section-divider" />
        <div className="search-filters-sorting-option">
          <span>Giờ khởi hành muộn nhất</span>
          <AccessTime />
        </div>
      </div>

      <div className="search-filters-section-container">
        <h3 className="search-filters-section-title">Bộ lọc</h3>
        <hr className="search-filters-section-divider" />
        <h4 className="search-filters-subsection-title">Thời gian khởi hành</h4>
        <div className="search-filters-time-range-selector">
          <div className="search-filters-time-input-container">
            <span>Từ</span>
            <div className="search-filters-time-selector">
              <span>00:00</span>
              <ArrowDropDown />
            </div>
          </div>
          <div className="search-filters-time-input-container">
            <span>Đến</span>
            <div className="search-filters-time-selector">
              <span>23:59</span>
              <ArrowDropDown />
            </div>
          </div>
        </div>

        <h4 className="search-filters-subsection-title">Khoảng giá</h4>
        <div className="search-filters-price-range-selector">
          <div className="search-filters-price-range-display">0đ - 1.000.000đ</div>
          <AttachMoney />
          <div className="search-filters-price-labels">
            <span>0đ</span>
            <span>1.000.000đ</span>
          </div>
        </div>

        <h4 className="search-filters-subsection-title">Đánh giá</h4>
        <div className="search-filters-rating-options-container">
          <div className="search-filters-rating-option">Tất cả</div>
          <div className="search-filters-rating-option">4+</div>
          <div className="search-filters-rating-option">3+</div>
          <div className="search-filters-rating-option">2+</div>
          <Star />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
