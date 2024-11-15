import React, { useState } from 'react';
import './hotelpage.css';
import styled from 'styled-components';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { flatpickrConfig } from '../../../utils/ConfigFlatpickr';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { color, width } from '@mui/system';

const Hotelpage = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleChangeoption = (event) => {
        setSelectedOption(event.target.value);
    };

    const [formData, setFormData] = useState({
        startDate: null, // Khởi tạo ngày mặc định là null
    });

    const [val, setVal] = useState(0); // Initialize the slider value state

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

    // Dữ liệu mẫu về các khách sạn
    const hotelList = [
        {
            image: 'https://th.bing.com/th?id=OIP.StkuckwXGnKd8HlEKyUdCwHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            name: 'Khách sạn ABC',
            address: 'Địa chỉ 123, Quận 1, TP.HCM',
            service: 'Tiện nghi',
            servicelist: 'Ăn sáng, Free Wifi, Gym',
            rating: 4.5,
            reviews: 120,
            originalPrice: '2,000,000 VND',
            discountedPrice: '1,500,000 VND',
        },
        {
            image: 'https://th.bing.com/th?id=OIP.StkuckwXGnKd8HlEKyUdCwHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            name: 'Khách sạn XYZ',
            address: 'Địa chỉ 456, Quận 3, TP.HCM',
            service: 'Tiện nghi',
            rating: 4.0,
            reviews: 95,
            originalPrice: '1,800,000 VND',
            discountedPrice: '1,400,000 VND',
        },
        // Thêm các khách sạn khác vào đây
    ];

    // Hàm cập nhật formData khi thay đổi ngày
    const handleDateChange = (name) => (date) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: date[0], // Lấy giá trị ngày đầu tiên từ mảng
        }));
    };

    const handleSliderChange = (event, newValue) => {
        setVal(newValue);
    };


    return (
        <div>
            <div className='hotelpage-main-container'>
                <div className='hotelpage-heeder-input'>

                    <div className="hotelpage-heeder-input-item">
                        <input type="text" required placeholder="Điểm đến" />
                        {/* <SearchOutlinedIcon /> */}


                    </div>

                </div>
                <div className='hotelpage-heeder-date'>
                    <Flatpickr
                        name='startDate'
                        value={formData.startDate}
                        onChange={handleDateChange('startDate')}
                        options={{
                            locale: flatpickrConfig,
                            dateFormat: 'Y-m-d',
                            enableTime: true,
                            time_24hr: true,
                        }}
                        className="search-header-input-field"
                    />

                    <Flatpickr
                        name='endDate'
                        value={formData.endDate}
                        onChange={handleDateChange('endDate')}
                        options={{
                            locale: flatpickrConfig,
                            dateFormat: 'Y-m-d',
                            enableTime: true,
                            time_24hr: true,
                        }}
                        className="search-header-input-field"
                    />

                </div>
                <div className='hotelpage-heeder-option'>
                    <select className='hotelpage-heeder-option-item' id="mySelect" value={selectedOption} onChange={handleChangeoption}>
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
                <div>
                    <button className='hotelpage-main-button-heeder' type="button">Tìm Kiếm</button>
                </div>
            </div>

            <div className='hotelpage-sidebarcard-content'>
                <div className="hotelpage-sidebar-container">
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728641751330!5m2!1svi!2s"
                            width="270"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div>
                        <h5 className='section-title'>Giá</h5>
                        <span className="search-results-price-value">3,300,000 VND</span>
                        <Box sx={{ width: 150 }}>
                            <Slider
                                marks={marks}
                                step={10}
                                value={val}
                                valueLabelDisplay="auto"
                                min={MIN}
                                max={MAX}
                                onChange={handleSliderChange}
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

                    <h5 className="section-title">Dịch vụ</h5>
                    <ul className="checkbox-list">
                        <li>
                            <input type="checkbox" id="breakfast" />
                            <label htmlFor="breakfast">Ăn sáng</label>
                        </li>
                        <li>
                            <input type="checkbox" id="laundry" />
                            <label htmlFor="laundry">Giặt ủi</label>
                        </li>
                        <li>
                            <input type="checkbox" id="room-service" />
                            <label htmlFor="room-service">Ăn tại phòng</label>
                        </li>
                    </ul>

                    <h5 className="section-title">Yêu cầu</h5>
                    <ul className="checkbox-list">
                        <li>
                            <input type="checkbox" id="pet-friendly" />
                            <label htmlFor="pet-friendly">Cho mang pet</label>
                        </li>
                        <li>
                            <input type="checkbox" id="smoking" />
                            <label htmlFor="smoking">Cho hút thuốc</label>
                        </li>
                        <li>
                            <input type="checkbox" id="free-cancellation" />
                            <label htmlFor="free-cancellation">Miễn phí hủy phòng</label>
                        </li>
                    </ul>

                    <h5 className="section-title">Loại</h5>
                    <ul className="checkbox-list">
                        <li>
                            <input type="checkbox" id="homestay" />
                            <label htmlFor="homestay">Homestay</label>
                        </li>
                        <li>
                            <input type="checkbox" id="hotel" />
                            <label htmlFor="hotel">Khách sạn</label>
                        </li>
                        <li>
                            <input type="checkbox" id="resort" />
                            <label htmlFor="resort">Resort</label>
                        </li>
                    </ul>
                </div>

                <div className="hotelpage-card-list-container">

                    <div className='hotelpage-card-deals'>
                        <h3> <b style={{ color: 'red' }}>Bạn muốn deals hời?</b></h3>
                        <span>Hãy đảm bảo rằng bạn đang đặt thông báo khuyến mãi</span>

                    </div>
                    <h3><b>Tìm thấy 73 nơi thích hợp</b>   </h3>
                    <div className='hotelpage-card-filter'>
                        <div className='hotelpage-card-filter-1'> Sắp xếp:</div>
                        <span className='hotelpage-card-filter-line'></span>
                        <div className='hotelpage-card-filter-2'>Giá</div>
                        <span className='hotelpage-card-filter-line'></span>
                        <div className='hotelpage-card-filter-3'>Xếp hạng</div>
                        <span className='hotelpage-card-filter-line'></span>
                        <div className='hotelpage-card-filter-4'>Hot deals!</div>
                    </div>
                    {hotelList.map((hotel, index) => (
                        <div div className="hotelpage-card" key={index} >
                            <div className='hotelpage-card-content'>
                                <div className='hotelpage-card-image'>
                                    <img src={hotel.image} alt="Hotel" />
                                </div>
                                <div className='hotelpage-card-content-right'>
                                    <h3>{hotel.name}</h3>
                                    <p>{hotel.address}</p>
                                    <h3>{hotel.service}</h3>
                                    <p>{hotel.servicelist}</p>
                                </div>
                                <p className='hotelpage-card-content-line'></p>
                                <div className='hotelpage-card-content-left'>
                                    <h3>Đánh Giá</h3>
                                    <span>⭐ {hotel.rating} </span>
                                    <p>{hotel.originalPrice}</p>
                                    <span>(đã bao gồm thuế) {hotel.discountedPrice}</span>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>

            </div>

        </div >
    );
}

const StyledWrapper = styled.div`
 s
`;

export default Hotelpage;
