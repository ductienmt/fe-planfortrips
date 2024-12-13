import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatisticalService } from '../../../services/apis/StatisticalService';

function Statistical() {
    const [dataEtp, setDataEtp] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataPlan, setDataPlan] = useState([]);
    const [dataVehicle, setDataVehicle] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);

    useEffect(() => {
        const availableYears = [];
        for (let i = 2000; i <= new Date().getFullYear(); i++) {
            availableYears.push(i);
        }
        setYears(availableYears);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy dữ liệu thống kê doanh nghiệp theo năm
                const responseEtp = await StatisticalService.CountEtpByYear(year);
                setDataEtp(responseEtp.data);

                // Lấy dữ liệu thống kê người dùng theo năm
                const responseUser = await StatisticalService.CountUserByYear(year);
                setDataUser(responseUser.data);

                // Lấy dữ liệu thống kê kế hoạch theo năm
                const responsePlan = await StatisticalService.CountPlanByYear(year);
                setDataPlan(responsePlan.data);

                // Lấy dữ liệu thống kê phương tiện theo năm
                const responseVehicle = await StatisticalService.CountVehicleByYear(year);
                setDataVehicle(responseVehicle.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [year]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <div className="p-4">
            <h2 className="text-center">Trang thống kê</h2>
            <div>
                <label htmlFor="yearInput">Chọn năm: </label>
                <select
                    id="yearInput"
                    value={year}
                    onChange={handleYearChange}
                    className="ps-2"
                >
                    {years.map((yearItem) => (
                        <option key={yearItem} value={yearItem}>
                            {yearItem}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row">
                <div className="col-6">
                    <h3>Số lượng doanh nghiệp tham gia trong năm {year}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dataEtp}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => value} />
                            <Legend />
                            <Line type="monotone" dataKey="account_count" stroke="#8884d8" name="Số lượng doanh nghiệp" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="col-6">
                    <h3>Số lượng người dùng tham gia trong năm {year}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dataUser}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => value} />
                            <Legend />
                            <Line type="monotone" dataKey="account_count" stroke="#82ca9d" name="Số lượng người dùng" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="col-6">
                    <h3>Số lượng kế hoạch được tạo trong năm {year}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dataPlan}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => value} />
                            <Legend />
                            <Line type="monotone" dataKey="account_count" stroke="#ff7300" name="Số lượng kế hoạch" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="col-6">
                    <h3>Phương tiện có Lịch trình nhiều nhất trong tháng / {year}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dataVehicle}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip
                                formatter={(value, name, props) => {
                                    // Hiển thị thêm resource_id trong tooltip
                                    if (props.payload) {
                                        return [`${value} (${props.payload.resource_id || 'N/A'})`, name];
                                    }
                                    return value;
                                }}
                                labelFormatter={(label) => `Tháng: ${label}`}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" name="Số lượng phương tiện" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Statistical;
