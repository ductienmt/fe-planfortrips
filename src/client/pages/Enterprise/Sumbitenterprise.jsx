import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    MenuItem,
    Select
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Sumbitenterprise.css';

const Sumbitenterprise = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState('');

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <main className="signInFormContainer">
            <section className="formContainer">
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h2 className="formTitle">PlanForTrips</h2>

                    <TextField
                        id="input-login"
                        label="Tên người dùng"
                        variant="outlined"
                        placeholder="Email hoặc số điện thoại"
                        fullWidth
                    />

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mật khẩu"
                        />
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            id="input-email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            placeholder="Nhập email của bạn"
                            fullWidth
                        />
                        <TextField
                            id="input-enterpriseName"
                            label="Doanh nghiệp"
                            variant="outlined"
                            placeholder="Doanh nghiệp"
                            fullWidth
                        />
                    </Box>

                    <TextField
                        id="input-representative"
                        label="Người đại diện"
                        variant="outlined"
                        placeholder="Người đại diện"
                    />
                    <TextField
                        id="input-taxCode"
                        label="Mã số thuế"
                        variant="outlined"
                        placeholder="Mã số thuế"
                    />
                    <TextField
                        id="input-phoneNumber"
                        label="Số điện thoại"
                        type="tel"
                        variant="outlined"
                        placeholder="Số điện thoại"
                    />
                    <TextField
                        id="input-address"
                        label="Địa chỉ"
                        variant="outlined"
                        placeholder="Địa chỉ"
                    />

                    <FormControl fullWidth>
                        <InputLabel id="business-type-label">Loại Doanh Nghiệp</InputLabel>
                        <Select
                            labelId="business-type-label"
                            id="business-type-select"
                            value={type}
                            label="Loại Doanh Nghiệp"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Khách Sạn</MenuItem>
                            <MenuItem value={20}>Xe Khách</MenuItem>
                            <MenuItem value={30}>Dịch Vụ Khác</MenuItem>
                        </Select>
                    </FormControl>

                    <Button className="Sumbitform" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Gửi
                    </Button>
                </Box>

                <hr className="separator" />
            </section>
            <div className="brandName">PlanForTrips</div>
        </main>
    );
};

export default Sumbitenterprise;
