import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatisticalService } from '../../../services/apis/StatisticalService';
import { Spin } from 'antd'; // Import Spin từ Ant Design

function Statistical() {
    const [dataEtp, setDataEtp] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataPlan, setDataPlan] = useState([]);
    const [dataVehicle, setDataVehicle] = useState([]);
    const [dataHotel, setDataHotel] = useState([]); // Data cho Hotel
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedMonthEtp, setSelectedMonthEtp] = useState(null);  
    const [selectedMonthUser, setSelectedMonthUser] = useState(null);
    const [selectedMonthVehicle, setSelectedMonthVehicle] = useState(null);
    const [selectedMonthHotel, setSelectedMonthHotel] = useState(null); // selectedMonth riêng cho Hotel
    const [selectedMonthPlan, setSelectedMonthPlan] = useState(null);  
    const [loading, setLoading] = useState(false); 
    const [loadingEtp, setLoadingEtp] = useState(false); 
    const [loadingUser, setLoadingUser] = useState(false); 
    const [loadingVehicle, setLoadingVehicle] = useState(false); 
    const [loadingHotel, setLoadingHotel] = useState(false); // Loading cho chart Hotel
    const [loadingPlan, setLoadingPlan] = useState(false);  

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 

            try {
                const [responseEtp, responseUser, responsePlan, responseVehicle, responseHotel] = await Promise.all([
                    StatisticalService.CountEtpByYear(year),
                    StatisticalService.CountUserByYear(year),
                    StatisticalService.CountPlanByYear(year),
                    StatisticalService.CountVehicleByYear(year),
                    StatisticalService.CountHotelByYear(year)  // Thêm API cho Hotel
                ]);

                setDataEtp(responseEtp.data);
                setDataUser(responseUser.data);
                setDataPlan(responsePlan.data);
                setDataVehicle(responseVehicle.data);
                setDataHotel(responseHotel.data);  // Lưu dữ liệu cho Hotel
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [year]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
        setSelectedMonthEtp(null);
        setSelectedMonthUser(null);
        setSelectedMonthVehicle(null);
        setSelectedMonthHotel(null); // Reset selected month cho Hotel
    };

    const handleEtpChangeMonth = async (data) => {
        setLoadingEtp(true); 
        const res = await StatisticalService.CountEtpByMonth(year, data.date);
        setDataEtp(res.data);
        setSelectedMonthEtp(data.date);
        setLoadingEtp(false); 
    };

    const handleUserChangeMonth = async (data) => {
        setLoadingUser(true); 
        const res = await StatisticalService.CountUserByMonth(year, data.date);
        setDataUser(res.data);
        setSelectedMonthUser(data.date);
        setLoadingUser(false); 
    };

    const handleVehicleChangeMonth = async (data) => {
        setLoadingVehicle(true); 
        const res = await StatisticalService.CountVehicleByMonth(year, data.date);
        setDataVehicle(res.data);
        setSelectedMonthVehicle(data.date);
        setLoadingVehicle(false); 
    };

    const handleHotelChangeMonth = async (data) => {
        setLoadingHotel(true); 
        const res = await StatisticalService.CountHotelByMonth(year, data.date);  // API cho Hotel
        setDataHotel(res.data);
        setSelectedMonthHotel(data.date); // Set selected month cho Hotel
        setLoadingHotel(false); 
    };

    const handlePlanChangeMonth = async (data) => {
        setLoadingPlan(true); 
        const res = await StatisticalService.CountPlanByMonth(year, data.date); 
        setDataPlan(res.data);
        setSelectedMonthPlan(data.date);  
        setLoadingPlan(false); 
    };

    const getChartTitle = (type) => {
        let selectedMonth;
        if (type === "doanh nghiệp") selectedMonth = selectedMonthEtp;
        else if (type === "người dùng") selectedMonth = selectedMonthUser;
        else if (type === "phương tiện") selectedMonth = selectedMonthVehicle;
        else if (type === "kế hoạch") selectedMonth = selectedMonthPlan;  
        else if (type === "khách sạn") selectedMonth = selectedMonthHotel;  // Handle "khách sạn"
    
        if (selectedMonth) {
            return `Thống kê tháng ${selectedMonth} / ${year} của ${type}`;
        }
        return `Thống kê năm ${year} của ${type}`;
    };

    const [indexResource, setIndexResource] = useState(0);

    return (
        <div className="p-4">
            <h2 className="text-center">TRANG THỐNG KÊ</h2>

            <div>
                <label htmlFor="yearInput">Chọn năm: </label>
                <input
                    type='number'
                    id="yearInput"
                    value={year}
                    onChange={handleYearChange}
                    className="ps-2"
                />
            </div>

            {loading ? (
                <div className="text-center">
                    <Spin size="large" />
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="row">
                    <div className="col-6">
                        <h3>{loadingEtp ? `Đang tải dữ liệu doanh nghiệp...` : getChartTitle("doanh nghiệp")}</h3>
                        {loadingEtp ? (
                            <div className="text-center">
                                <Spin size="small" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dataEtp}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="count"
                                        fill="#8884d8"
                                        name="Số lượng doanh nghiệp"
                                        onClick={handleEtpChangeMonth}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    <div className="col-6">
                        <h3>{loadingUser ? `Đang tải dữ liệu người dùng...` : getChartTitle("người dùng")}</h3>
                        {loadingUser ? (
                            <div className="text-center">
                                <Spin size="small" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dataUser}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="count"
                                        fill="#82ca9d"
                                        name="Số lượng người dùng"
                                        onClick={handleUserChangeMonth}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    <div className="col-12" style={{height: '48vh'}}>
                        <h3>{loadingPlan ? `Đang tải số liệu kế hoạch...` : getChartTitle("kế hoạch")}</h3>
                        {loadingPlan ? (
                            <div className="text-center">
                                <Spin size="small" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dataPlan}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="count"
                                        fill="#ff7300"
                                        name="Số lượng kế hoạch"
                                        onClick={handlePlanChangeMonth}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    <div className="nav-resrouce w-100 text-center">
                            <h2>Thống kê tài nguyên</h2>
                            <div className="statistical-resource-container" style={{alignItems: 'center', justifyContent: 'center'}}>
                            <button className='btn btn-outline-primary px-2 text-uppercase fw-bold' style={{borderRadius : 0}}
                                onClick={() => setIndexResource(0)}
                            >Vehicle</button>
                            <button className='btn btn-outline-success px-2 text-uppercase fw-bold' style={{borderRadius : 0}}
                                onClick={() => setIndexResource(1)}
                            >Hotel</button>
                            </div>   
                        </div>

                        {indexResource == 0 &&    <div className="col-12">
                        <h3>{loadingVehicle ? `Đang tải dữ liệu phương tiện...` : `Phương tiện được đặt nhiều nhất trong năm ${year}`}</h3>
                        {loadingVehicle ? (
                            <div className="text-center">
                                <Spin size="small" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dataVehicle}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name, props) => {
                                            return [`ID xe: ${props.payload.resource_id}`, `Count: ${value}`];
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="count"
                                        fill="#8884d8"
                                        name="Số lượng lịch trình"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>}

                    {indexResource == 1 &&    <div className="col-12">
                        <h3>{loadingHotel ? `Đang tải dữ liệu khách sạn...` : `Khách sạn được đặt nhiều nhất trong năm ${year}`}</h3>
                        {loadingHotel ? (
                            <div className="text-center">
                                <Spin size="small" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dataHotel}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name, props) => {
                                            return [`ID khách sạn: ${props.payload.resource_id}`, `Count: ${value}`];
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="count"
                                        fill="#82ca9d"
                                        name="Số lượng đặt phòng"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>}

                 

                 
                </div>
            )}
        </div>
    );
}

export default Statistical;
