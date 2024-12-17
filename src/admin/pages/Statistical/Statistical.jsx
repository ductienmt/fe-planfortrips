import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StatisticalService } from '../../../services/apis/StatisticalService';
import { Spin } from 'antd'; // Import Spin từ Ant Desig
// 
import * as XLSX from "xlsx";

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
                    StatisticalService.CountHotelByYear(year)
                ]);

                setDataEtp(responseEtp.data);
                setDataUser(responseUser.data);
                setDataPlan(responsePlan.data);
                setDataVehicle(responseVehicle.data);
                setDataHotel(responseHotel.data);
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
        else if (type === "khách sạn") selectedMonth = selectedMonthHotel;

        if (selectedMonth) {
            return `Thống kê tháng ${selectedMonth} / ${year} của ${type}`;
        }
        return `Thống kê năm ${year} của ${type}`;
    };

    const [indexResource, setIndexResource] = useState(0);

    const [typeResource, setTypeResouce] = useState();

    const [time, setTime] = useState({
        startTime: "",
        endTime: ""
    });




    const handleOnChangeResource = (event) => {
        const value = event.target.value;
        setTypeResouce(value);
    }
    const exportExcel = async () => {
        if (typeResource == 'vehicle') {
            alert("Xuất file Vehicle");
            const vehicleExcel = await StatisticalService.aboutTimeTicket(time.startTime, time.endTime);
            
            const formattedTicket = vehicleExcel.data.map(data => ({
                "ID Vé": data.ticket_id,
                "Khởi hành": data.schedule.route.originStation.name,
                "Điểm đến" : data.schedule.route.destinationStation.name,
                "Id User": data.user_id,
                "Tổng giá": data.total_price,
                "Phương thức thanh toán": data.payment.paymentMethod ,
                "Mã giảm giá" : data.code,
                "Trạng thái": data.status,
                "Thời gian tạo": data.create_at,
            }));
            toExcel(formattedTicket);

            return;
        }
        if (typeResource == 'hotel') {
            if (!time.startTime || !time.endTime) {
                alert("Vui lòng chọn thời gian");
                return;
            }
            alert("Xuất file Hotel");
            const bookingHotelDetailExcel = await StatisticalService.aboutTimeBookingHotelDetail(time.startTime, time.endTime);
 
            const formatBhd = bookingHotelDetailExcel.data.map(data => ({
                "ID Chi tiết đặt phòng": data.bookingHotelDetailId,
                "Thời gian CheckIn": data.checkInTime,
                "Thời gian CheckOut": data.checkOutTime,
                "Trạng thái": data.status,
                "Giá": data.price ,
                "ID User": data.userId,
                "Id Room": data.roomId,
                "Phương thức thanh toán" : data.paymentName
            }));
            toExcel(formatBhd);
            return;
        }
    }

    const toExcel = (format) => {
        const ws = XLSX.utils.json_to_sheet(format);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const startDate = formatDate(time.startDay);
        const endDate = formatDate(time.endDay);
        const fileName = `PTTrip_${typeResource}_${time.startTime}_${time.endTime}.xlsx`;

        XLSX.writeFile(wb, fileName);
    }

    return (
        <div className="p-4">
            <h2 className="text-center">TRANG THỐNG KÊ</h2>


            <div className="export-excel mb-3 row">
                <div className="col-6">
                    <label htmlFor="" className="form-label">Chọn loại tài nguyên</label>
                    <select name="" id="" className='form-select' onChange={($event) => handleOnChangeResource($event)}>
                        <option value="vehicle">Vé xe</option>
                        <option value="hotel">Vé đặt phòng</option>
                    </select>
                    <button className='btn btn-secondary mt-2' onClick={() => exportExcel()}>Xuất File</button>
                </div>

                <div className="col-6">
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="" className="form-label">Bắt đầu</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                onChange={(e) => setTime({
                                    ...time,
                                    startTime: e.target.value
                                })}
                            />
                        </div>

                        <div className="form-group col-6">
                            <label htmlFor="" className="form-label">Kết thúc</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                onChange={(e) => setTime({
                                    ...time,
                                    endTime: e.target.value
                                })}
                            />
                        </div>
                    </div>
                </div>


            </div>

            <div>
                <label htmlFor="yearInput">Năm </label>
                <input
                    type='number'
                    id="yearInput"
                    value={year}
                    onChange={handleYearChange}
                    className="ps-2 ms-2"
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

                    <div className="col-12" style={{ height: '48vh' }}>
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
                        <div className="statistical-resource-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <button className='btn btn-outline-primary px-2 text-uppercase fw-bold' style={{ borderRadius: 0 }}
                                onClick={() => setIndexResource(0)}
                            >Vehicle</button>
                            <button className='btn btn-outline-success px-2 text-uppercase fw-bold' style={{ borderRadius: 0 }}
                                onClick={() => setIndexResource(1)}
                            >Hotel</button>
                        </div>
                    </div>

                    {indexResource == 0 && <div className="col-12">
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

                    {indexResource == 1 && <div className="col-12">
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
