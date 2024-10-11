import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import "./HotelBooking.css";

export default function HotelBooking() {
    return (
        <div className="hotel-booking-wrapper">
            <div className="hotel-booking-header">
                <TextField placeholder="Điểm đến" className="hotel-booking-input" variant="outlined" fullWidth />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeRangePicker']}>
                        <DateTimeRangePicker
                            localeText={{ start: 'Nhận phòng', end: 'Trả phòng' }}
                            renderInput={(startProps, endProps) => (
                                <>
                                    <TextField {...startProps} />
                                    <TextField {...endProps} />
                                </>
                            )}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <TextField placeholder="Phòng và khách" className="hotel-booking-input" variant="outlined" fullWidth />
                <Button variant="contained" color="primary" className="hotel-booking-button">Tìm kiếm</Button>
            </div>
            <div className="hotel-booking-content">
                <div className="hotel-booking-sidebar">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728641751330!5m2!1svi!2s"
                        width="250"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="hotel-booking-filter">
                        <Typography variant="h6">Giá</Typography>
                        <Typography variant="body1">3.3000</Typography>
                        <input type="range" min="0" max="5000" />
                        <Typography variant="h6">Dịch vụ</Typography>
                        <ul style={{ padding: 0, listStyleType: 'none' }}>
                            <li><FormControlLabel control={<Checkbox />} label="Ăn sáng" /></li>
                            <li><FormControlLabel control={<Checkbox />} label="Giặt ủi" /></li>
                            <li><FormControlLabel control={<Checkbox />} label="Đưa đón sân bay" /></li>
                        </ul>
                        <Typography variant="h6">Yêu cầu</Typography>
                        <ul style={{ padding: 0, listStyleType: 'none' }}>
                            <li><FormControlLabel control={<Checkbox />} label="Cho mang pet" /></li>
                            <li><FormControlLabel control={<Checkbox />} label="Không hút thuốc" /></li>
                            <li><FormControlLabel control={<Checkbox />} label="Miễn phí hủy phòng" /></li>
                        </ul>
                        <Typography variant="h6">Loại</Typography>
                        <ul style={{ padding: 0, listStyleType: 'none' }}>
                            <li><FormControlLabel control={<Checkbox />} label="Homestay" /></li>
                            <li><FormControlLabel control={<Checkbox />} label="Khách sạn" /></li>
                            <li><FormControlLabel control={<Checkbox />} label="Resort" /></li>
                            <li><FormControlLabel control={<Checkbox />} label="Căn hộ" /></li>
                        </ul>
                    </div>
                </div>
                <div className="hotel-booking-main">
                    <div className="hotel-booking-alert">
                        Bạn muốn có deals hot? <a href="#">Nhận thông báo</a>
                    </div>
                    <div className="hotel-card" tabIndex={0}>
                        <div className="hotel-card-content">
                            <div className="hotel-image-container">
                                <img
                                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                                    alt="Căn Hộ 8386"
                                    className="hotel-image"
                                    aria-label="Hotel image"
                                />
                            </div>
                            <div className="hotel-details">
                                <h5 className="hotel-title" aria-label="Hotel name">Căn Hộ 8386</h5>
                                <p className="hotel-address" aria-label="Hotel address">
                                    <span className="icon">📍</span> 74 ĐL Trần Hưng Đạo
                                </p>
                                <p className="hotel-amenities" aria-label="Hotel amenities">
                                    <span className="badge">🍳 Ăn sáng</span>
                                    <span className="badge">🌐 Free Wi-Fi</span>
                                    <span className="badge">🏋️‍♂️ Gym</span>
                                </p>
                                <p className="hotel-partnership">
                                    <small><span className="icon">🏅</span> Quan hệ đối tác</small>
                                </p>
                                <div className="hotel-rating-price">
                                    <p className="hotel-rating" aria-label="Hotel rating">
                                        <span className="star">⭐</span>
                                        <span className="star">⭐</span>
                                        <span className="star">⭐</span>
                                        <span className="star">⭐</span>
                                        <span className="star">⭐</span>
                                        <small className="reviews">1k+ reviews</small>
                                    </p>
                                    <p className="hotel-pricing">
                                        <s className="old-price">3,600,000₫</s>
                                        <span className="new-price">2,999,000₫</span>
                                    </p>
                                    <p className="additional-info">
                                        <small>Includes taxes and fees</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HotelCard({ imageUrl, title, location, amenities, oldPrice, newPrice, rating }) {
    return (
        <div className="hotel-card">
            <img src={imageUrl} alt={title} className="hotel-card-image" />
            <div className="hotel-card-info">
                <h5>{title}</h5>
                <p>{location}</p>
                <p>Tiện nghi: {amenities.join(", ")}</p>
                <div className="hotel-card-prices">
                    <span className="hotel-card-old-price">{oldPrice}₫</span>
                    <span className="hotel-card-new-price">{newPrice}₫</span>
                </div>
                <div className="hotel-card-rating">Đánh giá: {Array(rating).fill("⭐")}</div>
            </div>
        </div>
    );
}
