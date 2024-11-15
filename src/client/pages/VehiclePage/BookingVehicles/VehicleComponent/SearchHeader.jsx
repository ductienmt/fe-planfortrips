import React, { useState } from 'react';
import './SearchHeader.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ScheduleService } from '../../../../../services/apis/ScheduleService';
import Flatpickr from 'react-flatpickr';

const SearchHeader = ({ onSearch }) => {
    const [formData, setFormData] = useState({
        originalLocation: '',
        destination: '',
        startDate: '',
        endDate: '', // Thêm trường endDate
    });

    const [schedules, setSchedules] = useState([]);

    const handleSearch = async (data) => {
        try {
            const response = await ScheduleService.getSchedules(data);
            console.log(response.data);
            const fetchedSchedules = response.data.data;
            setSchedules(fetchedSchedules);
            localStorage.setItem("schedules", JSON.stringify(fetchedSchedules));
            onSearch();
        } catch (error) {
            console.error("Error:", error);
            const query = `[Javascript] fix error: ${error.message}`;
            window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (name) => (date) => {
        setFormData({ ...formData, [name]: date[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(formData);
    };

    return (
        <div className="search-header-container-wrapper">
            <div className="search-header-step-indicator">
                {['Tìm chuyến xe', 'Đặt vé', 'Thanh toán'].map((step, index) => (
                    <div className="search-header-step-indicator-item" key={index}>
                        <div className={`search-header-step-indicator-number ${index === 0 ? 'active' : ''}`}>
                            {index + 1}
                        </div>
                        <div className="search-header-step-indicator-text">{step}</div>
                    </div>
                ))}
            </div>
            <form className="search-header-form-container" onSubmit={handleSubmit}>
                <h2 className="search-header-title">Tìm chuyến xe</h2>
                <div className="search-header-text-location">
                    <Box sx={{ display: 'flex', gap: '12px', width: '100%' }} noValidate autoComplete="off">
                        <TextField
                            label="Điểm khởi hành"
                            variant="outlined"
                            name="originalLocation"
                            value={formData.originalLocation}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Điểm đến"
                            variant="outlined"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                        />
                    </Box>
                </div>
                <div className="search-header-date-selector">
                    <div className="search-header-date-info">
                        <span className="search-header-date-label">Ngày khởi hành</span>
                        <Flatpickr
                            name='startDate'
                            value={formData.startDate}
                            onChange={handleDateChange('startDate')} // Cập nhật cách gọi
                            options={{
                                dateFormat: 'Y-m-d',
                                enableTime: true,
                                time_24hr: true,
                            }}
                            className="search-header-input-field"
                        />
                    </div>
                    <div className="search-header-date-info">
                        <span className="search-header-date-label">Ngày kết thúc</span>
                        <Flatpickr
                            name='endDate'
                            value={formData.endDate}
                            onChange={handleDateChange('endDate')} // Cập nhật cách gọi
                            options={{
                                dateFormat: 'Y-m-d',
                                enableTime: true,
                                time_24hr: true,
                            }}
                            className="search-header-input-field"
                        />
                    </div>
                </div>
                <button type="submit" className="search-header-submit-button">Tìm kiếm</button>
            </form>
        </div>
    );
};

export default SearchHeader;
