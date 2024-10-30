import React from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import { LocationOn, CalendarToday, People } from '@mui/icons-material';
import './SearchBar.css';

const DetailedSearchBarContainer = ({keyword,setKeyword}) => {
    
    return (
        <form className="detailed-search-bar-container">
            <div className="detailed-search-bar-container-destination-input">
                <label htmlFor="destination" className="detailed-search-bar-container-input-label">
                    Điểm đến
                </label>
                <input type="text" id="destination" value={keyword} className="detailed-search-bar-container-input-field" onChange={(e)=>setKeyword(e.target.value)} placeholder='Nhập nơi bạn muốn đến'/>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/325743133b68bf84b4542a1afed13849c883d0c5cfa6e1adb88047799b43d7fa?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                    alt=""
                    className="detailed-search-bar-container-input-icon"
                />
            </div>
            <div className="detailed-search-bar-container-date-input">
                <div className="detailed-search-bar-container-item">
                    <TextField
                        label="Nhận phòng"
                        variant="outlined"
                        defaultValue="T2, 02 thg12"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" className="MuiInputAdornment-root">
                                    <CalendarToday />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                </div>
                <span className="detailed-search-bar-container-nights-count">10 đêm</span>
                <div className="detailed-search-bar-container-item">
                    <TextField
                        label="Trả phòng"
                        variant="outlined"
                        defaultValue="T5, 12 thg 12"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" className="MuiInputAdornment-root">
                                    <CalendarToday />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                </div>
            </div>
            <div className="detailed-search-bar-container-item">
                <TextField
                    label="Phòng và khách"
                    variant="outlined"
                    defaultValue="1 Phòng, 2 Người Lớn, 0 Trẻ Em"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" className="MuiInputAdornment-root">
                                <People />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />
            </div>
            <Button variant="contained" className="detailed-search-bar-container-search-button">
                Tìm kiếm
            </Button>
        </form>
    );
};

export default DetailedSearchBarContainer;
