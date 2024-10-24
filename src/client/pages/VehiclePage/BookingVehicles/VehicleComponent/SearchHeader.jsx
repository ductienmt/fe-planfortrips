import React, { useEffect, useState } from 'react';
import './SearchHeader.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ScheduleService } from '../../../../../services/apis/ScheduleService';



const SearchHeader = () => {

    const [formData, setFormData] = useState({

        originalLocation: "City X",
        destination: "City Z",
        startDate: "2024-10-10",
    })

    useEffect(() => {
        handleSearch(formData)
    }, [])

    const handleSearch = async (data) => {


        try {
            const response = await ScheduleService.getSchedules(data);
            console.log(response.data)
            // setResults(response.data);
        } catch (error) {
            console.error("Error:", error);
            const query = `[Javascript] fix error: ${error.message}`;
            window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.originalLocation]: e.target.value });
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
            <form className="search-header-form-container">
                <h2 className="search-header-title">Tìm chuyến xe</h2>
                <div className='search-header-text-location'>
                    <Box
                        sx={{ display: 'flex', gap: '12px', width: '100%' }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField label="Điểm khởi hành" variant="outlined" />
                        <TextField label="Điểm đến" variant="outlined" />
                    </Box>
                </div>
                <div className="search-header-date-selector">
                    <div className="search-header-date-info">
                        <span className="search-header-date-label">Ngày khởi hành</span>
                        <div className="search-header-selected-date">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Chọn ngày" sx={{ width: '100%' }} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <button className="search-header-submit-button">Tìm kiếm</button>
            </form>
        </div>
    );
};

export default SearchHeader;
