import React, { useState } from 'react';
import { AttachMoney, Star } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './SearchFilters.css';

const SearchFilters = () => {
  const [departureTimeFrom, setDepartureTimeFrom] = useState('00:00');
  const [departureTimeTo, setDepartureTimeTo] = useState('23:59');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [rating, setRating] = useState('Tất cả'); // Khởi tạo state rating

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className="search-filters-main-container">
      <div className="search-filters-section-container">
        <h3 className="search-filters-section-title">Sắp xếp theo</h3>
        <hr className="search-filters-section-divider" />
        <div className="search-filters-sorting-option">
          <select>
            <option value="ascending">Giá tăng dần</option>
            <option value="descending">Giá giảm dần</option>
            <option value="earliest">Giờ khởi hành sớm nhất</option>
            <option value="latest">Giờ khởi hành muộn nhất</option>
          </select>
        </div>
        <hr className="search-filters-section-divider" />
      </div>

      <div className="search-filters-section-container">
        <h3 className="search-filters-section-title">Bộ lọc</h3>
        <hr className="search-filters-section-divider" />

        <h4 className="search-filters-subsection-title">Thời gian khởi hành</h4>
        <div className="search-filters-time-range-selector">
          <div className="search-filters-time-input-container">
            <span>Từ</span>
            <div className="search-filters-time-selector">
              <select value={departureTimeFrom} onChange={(e) => setDepartureTimeFrom(e.target.value)}>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
                    {`${String(i).padStart(2, '0')}:00`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="search-filters-time-input-container">
            <span>Đến</span>
            <div className="search-filters-time-selector">
              <select value={departureTimeTo} onChange={(e) => setDepartureTimeTo(e.target.value)}>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
                    {`${String(i).padStart(2, '0')}:00`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <h4 className="search-filters-subsection-title">Khoảng giá</h4>
        <div className="search-filters-price-range-selector">
          <AttachMoney />
          <Box sx={{ width: 150, ml: 2 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              step={100000}
              min={0}
              max={1000000}
              marks={[
                { value: 0, label: '0đ' },
                { value: 1000000, label: '1.000.000đ' },
              ]}
            />
          </Box>
        </div>
        <Typography variant="body2" sx={{ ml: 3 }}>
          Giá: {priceRange[0]}đ - {priceRange[1]}đ
        </Typography>

        <h4 className="search-filters-subsection-title">Đánh giá</h4>
        <div className="search-filters-rating-options-container">
          {['Tất cả', '4+', '3+', '2+'].map((rate) => (
            <div
              key={rate}
              className={`search-filters-rating-option ${rating === rate ? 'selected' : ''}`}
              onClick={() => setRating(rate)}
            >
              {rate}
            </div>
          ))}
          <Star />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
