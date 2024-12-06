import React, { useEffect, useState } from "react";
import "./Schedules.css";
import { Table } from "antd";
import { ScheduleService } from "../../../services/apis/ScheduleService";
import { DateFormatter } from "../../../utils/DateFormat";
import { convertToVNDDB } from "../../../utils/FormatMoney";
const schedules = () => {
  const [schedulesData, setScheduleData] = useState([]);
  const columns = [
    {
      title: "Mã lịch Trình",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã Tuyến",
      dataIndex: "routeId",
      key: "routeId",
    },
    {
      title: "Mã Xe",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Ngày/Giờ Xuất Phát",
      dataIndex: "departureTime",
      key: "departureTime",
      render: (text) => DateFormatter(text),
    },
    {
      title: "Ngày/Giờ Đến",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
      render: (text) => DateFormatter(text),
    },
    {
      title: "Giá Vé",
      dataIndex: "priceForOneTicket",
      key: "priceForOneTicket",
      render: (text) => convertToVNDDB(text),
    },
    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
    },
  ];

  const loadScheduleData = async () => {
    try {
      const res = await ScheduleService.getScheduleByEnterpriseId();
      setScheduleData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedItem, setSelectedItem] = useState("all");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    loadScheduleData();
  }, []);

  return (
    <>
      <div className="enterprise-schedules-container">
        <div className="title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Lịch Trình
          </h1>
        </div>

        <div className="content mt-3">
          <div className="nav-filter">
            <div className="filter-schedules">
              <button
                onClick={() => handleSelectItem("all")}
                className={selectedItem === "all" ? "isActive" : ""}
              >
                Tất cả
              </button>
              {/* <button
                onClick={() => handleSelectItem("available")}
                className={selectedItem === "available" ? "isActive" : ""}
              >
                Còn phòng
              </button>
              <button
                onClick={() => handleSelectItem("unavailable")}
                className={selectedItem === "unavailable" ? "isActive" : ""}
              >
                Đã đặt
              </button> */}
            </div>

            <div className="nav-add-schedules">
              <select>
                <option value="">Lọc</option>
                <option value="deluxe">Deluxe</option>
                <option value="standard">Standard</option>
                <option value="superior">Superior</option>
              </select>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#contactModal"
              >
                Thêm Lịch Trình
              </button>
            </div>

            {/* Contact Info Modal */}
            <div
              className="modal fade"
              id="contactModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="contactModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Thêm Lịch Trình</h3>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-nav">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label htmlFor="routeCode" className="form-label">
                          Mã Tuyến
                        </label>
                        <select
                          className="form-control"
                          id="routeCode"
                          name="routeCode"
                        >
                          <option value="">Chọn Mã Tuyến</option>
                          <option value="route1">Tuyến 1</option>
                          <option value="route2">Tuyến 2</option>
                          <option value="route3">Tuyến 3</option>
                          <option value="route4">Tuyến 4</option>
                          {/* Thêm các lựa chọn khác nếu cần */}
                        </select>
                      </div>

                      <div className="col-6 mb-3">
                        <label htmlFor="busCode" className="form-label">
                          Mã Xe
                        </label>
                        <select
                          className="form-control"
                          id="busCode"
                          name="busCode"
                        >
                          <option value="">Chọn Mã Xe</option>
                          <option value="bus1">Xe 1</option>
                          <option value="bus2">Xe 2</option>
                          <option value="bus3">Xe 3</option>
                          <option value="bus4">Xe 4</option>
                          {/* Thêm các lựa chọn khác nếu cần */}
                        </select>
                      </div>

                      <div className="col-6 mb-3">
                        <label htmlFor="Price" className="form-label">
                          Giá Vé (VNĐ)
                        </label>
                        <input
                          className="form-control"
                          placeholder="Nhập giá vé"
                        />
                      </div>

                      <div className="col-6 mb-3">
                        <label htmlFor="departureTime" className="form-label">
                          Ngày/Giờ Xuất Phát
                        </label>
                        <input
                          type="datetime-local"
                          id="departureTime"
                          className="form-control"
                        />
                      </div>

                      <div className="col-6 mb-3">
                        <label htmlFor="arrivalTime" className="form-label">
                          Ngày/Giờ Đến
                        </label>
                        <input
                          type="datetime-local"
                          id=""
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal3-footer">
                    <button className="btn footer-btn" type="button">
                      Xác Nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-table mt-4">
            <Table
              dataSource={schedulesData}
              columns={columns}
              // pagination={{
              //   current: currentPage,
              //   pageSize: pageSize,
              //   total: dataSource.length,
              //   onChange: (page, pageSize) => {
              //     setCurrentPage(page);
              //     setPageSize(pageSize);
              //   },
              // }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default schedules;
