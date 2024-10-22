import React from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import { LocationOn, CalendarToday, People } from '@mui/icons-material';
import './SearchBar.css';

const DetailedSearchBarContainer = () => {
    return (
        <form className="detailed-search-bar-container">
            <div className="detailed-search-bar-container-item">
                <TextField
                    label="Điểm đến"
                    variant="outlined"
                    defaultValue="Lào Cai"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" className="MuiInputAdornment-root">
                                <LocationOn />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
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
