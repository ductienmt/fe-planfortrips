import React, { useState, useEffect } from 'react';
import AdminList from './AdminList/AdminList';
import './HomePage.css';
import Statitical from './Statistical/Statistical';
import StatisticalChart from './StatisticalChart/StatisticalChart';

function HomePage() {
    const [filter, setFilter] = useState('');
    const [pendingEnterprises, setPendingEnterprises] = useState([]); 

    useEffect(() => {
        const fetchPendingEnterprises = async () => {
            const data = [];
            setPendingEnterprises(data);
        };
        fetchPendingEnterprises();
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div style={{ width: '100%' }}>
            <div className="admin__homepage">
                <div className="admin__homepage-container">

                    {/* Admin HomePage Nav */}
                    <div className="admin__homepage-nav">
                        <div className="admin__homepage-nav-container d-flex justify-content-between">

                            {/* Nav Left */}
                            <div className="admin__homepage-nav-left">
                                <h3 className='text-white fw-bold'>Dashboard</h3>
                            </div>

                            {/* Nav Right */}
                            <div className="admin__homepage-nav-right">
                                <div className="admin__homepage-nav-right-container d-flex">
                                    <div className="admin__homepage-button">
                                        <button className='btn px-3 py-1'>Lọc</button>
                                    </div>

                                        <select className='form-control' value={filter} onChange={handleFilterChange} onClick={alert("")}> 
                                            <option value="">PHƯƠNG TIỆN</option>
                                            <option value="food">ĂN UỐNG</option>
                                            <option value="accommodation">NƠI Ở</option>
                                        </select>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Admin HomePage Body */}
                    <div className="admin__homepage-body mt-3">
                        <div className="admin__homepage-body-container row g-3">

                            <div className="admin__homepage-body-left admin__w-60">
                                <div className="admin-body-item">
                                    {/* Tổng Thống Kê */}
                                    <Statitical />
                                </div>                  
                            </div>

                            <div className="admin__homepage-body-right admin__w-40">
                                {/* Danh sách doanh nghiệp chờ duyệt */}
                                <div className="admin-enterprises-wait admin-body-item">
                                    <div className="admin-enterprises-wait-container">
                                        <AdminList title="Danh sách doanh nghiệp chờ duyệt" data={pendingEnterprises} />
                                    </div>
                                </div>
                            </div>

                            <div className="admin__homepage-body-left admin__w-60">
                                <div className="admin-body-item">
                                    {/* Truy cập và đăng kí */}
                                    <StatisticalChart title="Truy cập và đăng kí" />
                                </div>                  
                            </div>

                            <div className="admin__homepage-body-right admin__w-40">
                                <div className="admin-body-item">
                                    {/* Thống kê kế hoạch */}
                                    <StatisticalChart title="Thống kê kế hoạch" />
                                </div>                  
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
