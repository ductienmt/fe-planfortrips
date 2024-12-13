import React, { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Statitical from '../Statistical/Statistical';
import AdminList from './AdminList/AdminList';
import './HomePage.css';
import { StatisticalService } from '../../../services/apis/StatisticalService';

function HomePage() {
    const currentYear = new Date().getFullYear(); 
    const [cBookingDetail, setCBookingDetail] = useState([]);
    const [year, setYear] = useState(currentYear); 

    const fetchData = async () => {
        const dataBooking = await StatisticalService.BookingHotelDetailByYear(year);
        setCBookingDetail(dataBooking);
    };

    useEffect(() => {
        fetchData();
    }, [year]);

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setYear(newYear);
    };

    return (
        <div style={{ width: '100%' }}>
            <div className="admin__hompage">
                <div className="admin__homepage-container">
                    <div className="admin__homepage-nav">
                        <div className="admin__homepage-nav-container d-flex justify-content-between">
                            <div className="admin__homepage-nav-left">
                                <h3 className='text-white fw-bold'>Dash board</h3>
                            </div>
                            <div className="admin__homepage-nav-right">
                                <div className="admin__homepage-nav-right-container d-flex">
                                    <div className="admin__homepage-button">
                                        <button className='btn px-3 py-2'>Lọc</button>
                                    </div>
                                    <div className="admin__homepage-button admin-border-left">
                                        <button className='btn px-3 py-2'>Loại doanh nghiệp</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="admin__homepage-body mt-3">
                        <div className="admin__homepage-body-container d-flex">
                            <div className="admin__homepage-body-left admin-body-item admin__w-50 me-4">
                                <Statitical />
                            </div>

                            <div className="admin__homepage-body-right admin__w-50 admin-body-item">
                                <div className="admin-enterprises-wait">
                                    <div className="admin-enterprises-wait-container">
                                        <AdminList title={"Danh sách doanh nghiệp chờ duyệt"} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="admin__statistical-chart mt-3 bg-light">
                            <h3 className='text-center'>Biểu đồ thống kê số lượng ĐẶT PHÒNG trong năm {year}</h3>
                            <div className="year-selection">
                                <input
                                    type="number"
                                    value={year}
                                    onChange={handleYearChange}
                                    min="2020"
                                    max={currentYear}
                                    className="form-control text-center fw-bold text-primary fs-4"
                                />
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={cBookingDetail}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value) =>  value} />
                                    <Legend />
                                    <Bar dataKey="totalDetails" fill="#8884d8" name={'Đơn đặt phòng'}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
