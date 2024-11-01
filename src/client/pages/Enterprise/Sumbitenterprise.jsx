import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Sumbitenterprise.css';

const Sumbitenterprise = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                    <h2 className="formTitle">Hí </h2>

                    <TextField id="input-login" label="Tên người dùng" variant="outlined" placeholder="Email hoặc số điện thoại" />

                    <FormControl variant="outlined" sx={{ m: 1, width: '100%' }}>
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
                            label="Password"
                        />
                    </FormControl>

                    <TextField id="input-email" label="Email" type="email" variant="outlined" placeholder="Enter your email" />
                    <TextField id="input-enterpriseName" label="Doanh nghiệp" variant="outlined" placeholder="Doanh nghiệp" />
                    <TextField id="input-representative" label="Người đại diện" variant="outlined" placeholder="Người đại diện" />
                    <TextField id="input-taxCode" label="Mã số thuế" variant="outlined" placeholder="Mã số thuế" />
                    <TextField id="input-phoneNumber" label="Số điện thoại" type="tel" variant="outlined" placeholder="Sao điện thoại" />
                    <TextField id="input-address" label="Địa chỉ" variant="outlined" placeholder="Địa chỉ" />

                    <Button className="Sumbitform" variant="contained" color="primary">
                        Gữi
                    </Button>
                </Box>
                <hr className="separator" />
            </section>
        </main>
    );
};

export default Sumbitenterprise;
