import React, { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Statitical from '../StatisticalDashBoard/StatisticalDashBoard';
import AdminList from './AdminList/AdminList';
import './HomePage.css';
import { StatisticalService } from '../../../services/apis/StatisticalService';
import { TypeEnterpriseDetailService } from '../../../services/apis/TypeEnterpriseDetailService';
import AccountEtpService from '../../../services/apis/AccountEnterprise';

function HomePage() {
    const currentYear = new Date().getFullYear();
    const [cBookingDetail, setCBookingDetail] = useState([]);
    const [year, setYear] = useState(currentYear);
    const [typeEtpDetail, setTypeEtpDetail] = useState([]);

    // Admin List
    const [enterprises, setEnterprise] = useState([]);
    const [etpDump, setEtpDum] = useState([]);
    const [typeFilter, setTypeFilter] = useState('');
    const [loading, setLoading] = useState(false);  
    const [message, setMessage] = useState('');  


       const fetchEnterprises = async () => {
                setLoading(true);  
                try {
                    const res = await AccountEtpService.getAccountEnterpriseNeedAccept();
                    setEnterprise(res.data);
                    setEtpDum(res.data);
                } catch (error) {
                    console.error('Error fetching enterprises:', error);
                } finally {
                    setLoading(false);  
                }
            };


            const handleAccept = async (id) => {
                try {
                    setLoading(true);  
                    await AccountEtpService.toggleStage(id); 
                    setMessage('Xét duyệt thành công!');  
        
                    setEnterprise(prevEnterprises => 
                        prevEnterprises.filter(etp => etp.accountEnterpriseId !== id)
                    );
                } catch (error) {
                    console.error('Error accepting enterprise:', error);
                    setMessage('Đã có lỗi xảy ra. Vui lòng thử lại!');
                } finally {
                    setLoading(false);  
                }
            };
            const handleFilterChange = (event) => {
                const detailName = event.target.value;
                if (detailName == "-1") {
                    setTypeFilter({});
                    setEnterprise(etpDump);
                    return;
                }
                setTypeFilter(detailName); 
            
                const filterEtp = enterprises.filter((etp) => etp.typeEnterpriseDetailName === detailName); 
                setEnterprise(filterEtp);
            };
            
            

    const fetchData = async () => {
        try {
            await fetchEnterprises();
            const dataBooking = await StatisticalService.BookingHotelDetailByYear(year);
            setCBookingDetail(dataBooking);
            const typeDetail = await TypeEnterpriseDetailService.getAll();            
            setTypeEtpDetail(typeDetail.data);
        } catch (error) {
            console.error('Error fetching booking data:', error);
        }
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
                                <h3 className='text-white fw-bold'>Dashboard</h3>
                            </div>
                            <div className="admin__homepage-nav-right">
                                <div className="admin__homepage-nav-right-container d-flex">
                                    <div className="admin__homepage-button">
                                        <button className='btn px-3 py-2'>Lọc</button>
                                    </div>
                                    <div className="admin__homepage-button admin-border-left">
                                        <select name="" id="" className="form-select px-5" style={{ height: '100%' }}
                                            value={typeFilter}
                                            onChange={handleFilterChange}
                                            defaultValue={"-1"}
                                        >
                                            <option value="-1">Tất cả</option>
                                            {typeEtpDetail?.map((typeDetail) => (
                                                <option key={typeDetail.id} value={typeDetail.name}>
                                                    {typeDetail.name}
                                                </option>
                                            ))}
                                        </select>

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
                                        <AdminList title={"Danh sách doanh nghiệp chờ duyệt"} enterprises={enterprises} loading={loading}
                                            handleAccept={handleAccept} message={message}
                                        />
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
                                    <Tooltip formatter={(value) => value} />
                                    <Legend />
                                    <Bar dataKey="totalDetails" fill="#8884d8" name={'Đơn đặt phòng'} />
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
