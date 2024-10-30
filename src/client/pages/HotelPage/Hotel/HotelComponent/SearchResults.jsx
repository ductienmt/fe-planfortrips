import React from 'react';
import './SearchResults.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const MAX = 1000;
const MIN = 0;
const marks = [
    {
        value: MIN,
        label: '',
    },
    {
        value: MAX,
        label: '',
    },
];

const SearchResults = () => {

    const [val, setVal] = React.useState(MIN);
    const handleChange = (_, newValue) => {
        setVal(newValue);
    };

    return (
        <div className="search-results-full-container">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728641751330!5m2!1svi!2s"
                width="270"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <h6 className="search-results-price-title">Khoảng giá</h6>
            <div className="search-results-price-range-container">
                <span className="search-results-price-value">3,300,000 VND</span>
                <Box sx={{ width: 150 }}>
                    <Slider
                        marks={marks}
                        step={10}
                        value={val}
                        valueLabelDisplay="auto"
                        min={MIN}
                        max={MAX}
                        onChange={handleChange}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            variant="body2"
                            onClick={() => setVal(MIN)}
                            sx={{ cursor: 'pointer' }}
                        >
                            {MIN} min
                        </Typography>
                        <Typography
                            variant="body2"
                            onClick={() => setVal(MAX)}
                            sx={{ cursor: 'pointer' }}
                        >
                            {MAX} max
                        </Typography>
                    </Box>
                </Box>

            </div>
            <h6 className="search-results-services-title">Dịch vụ có sẵn</h6>
            <ul className="search-results-services-checkbox-list">
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Bao gồm bữa sáng
                    </label>
                </li>
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Dịch vụ giặt là
                    </label>
                </li>
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Dịch vụ đưa đón sân bay
                    </label>
                </li>
            </ul>
            <h6 className="search-results-requirements-title">Yêu cầu khách hàng</h6>
            <ul className="search-results-requirements-checkbox-list">
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Chính sách thân thiện với thú cưng
                    </label>
                </li>
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Phòng không hút thuốc
                    </label>
                </li>
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Tùy chọn hủy miễn phí
                    </label>
                </li>
            </ul>
            <h6 className="search-results-types-title">Loại hình chỗ ở</h6>
            <ul className="search-results-types-checkbox-list">
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Chỗ ở homestay
                    </label>
                </li>
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Chỗ ở khách sạn
                    </label>
                </li>
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Chỗ ở resort
                    </label>
                </li>
                <li>
                    <label className="label-checkbox-container">
                        <input type="checkbox" className="search-results-checkbox" />
                        Chỗ ở căn hộ
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default SearchResults;
