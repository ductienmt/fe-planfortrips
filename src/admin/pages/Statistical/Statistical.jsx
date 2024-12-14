import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatisticalService } from '../../../services/apis/StatisticalService';

function Statistical() {
    const [dataEtp, setDataEtp] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataPlan, setDataPlan] = useState([]);
    const [dataVehicle, setDataVehicle] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(null);  
    const [years, setYears] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy dữ liệu thống kê cho các đối tượng
                const [responseEtp, responseUser, responsePlan, responseVehicle] = await Promise.all([
                    StatisticalService.CountEtpByYear(year),
                    StatisticalService.CountUserByYear(year),
                    StatisticalService.CountPlanByYear(year),
                    StatisticalService.CountVehicleByYear(year)
                ]);

                setDataEtp(responseEtp.data);
                setDataUser(responseUser.data);
                setDataPlan(responsePlan.data);
                setDataVehicle(responseVehicle.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [year]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
        setSelectedMonth(null);  
    };

    const handleEtpChangeMonth = async (data) => {        
        const res = await StatisticalService.CountEtpByMonth(year, data.date);
        setDataEtp(res.data);
        setSelectedMonth(data.date);  
    };

    const resetToYear = async () => {
        const res = await StatisticalService.CountEtpByYear(year); 
        setDataEtp(res.data);
        setSelectedMonth(null); 
    };

    return (
        <div className="p-4">
            <h2 className="text-center">Trang thống kê</h2>
                                
                {/* Nút Reset về năm */}
                {selectedMonth && (
                    <div className="col-12 mt-3 text-center">
                        <button onClick={resetToYear} className="btn btn-secondary">
                            Reset về năm
                        </button>
                    </div>
                )}
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

            <div className="row">
                <div className="col-6">
                    <h3>Số lượng doanh nghiệp tham gia trong năm {year}</h3>

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
                </div>

                <div className="col-6">
                    <h3>Số lượng người dùng tham gia trong năm {year}</h3>
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
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="col-6">
                    <h3>Số lượng kế hoạch được tạo trong năm {year}</h3>
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
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="col-12">
                    <h3>Phương tiện có lịch trình nhiều nhất trong tháng/{year}</h3>
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
                </div>

            </div>
        </div>
    );
}

export default Statistical;
