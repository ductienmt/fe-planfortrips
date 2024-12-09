import React, { useState } from "react";
import "./Routehotel.css";
import { Table } from "antd";
const Routehotel = () => {
  const [roomsData, setRoomsData] = useState([]);
  const columns = [
    {
      title: "Mã Tuyến",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Tên Tuyến",
      dataIndex: "typeOfRoom",
      key: "typeOfRoom",
    },
    {
      title: "Xuất Phát",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Điểm Đến",
      dataIndex: "maxSize",
      key: "maxSize",
    },
    {
      title: "Bến Xe Xuất phát",
      dataIndex: "isAvailable",
      key: "isAvailable",
    },
    {
      title: "Bến Xe Đến",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Trạng thái",
      dataIndex: "action",
      key: "action",
    },
  ];

  const [selectedItem, setSelectedItem] = useState("all");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <div className="enterprise-Route-container">
        <div className="title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Doanh Sách Tuyến
          </h1>
        </div>

        <div className="content mt-3">
          <div className="nav-filter">
            <div className="filter-Route">
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

            <div className="nav-add-Route">
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
                data-bs-target="#addrouteModal"
              >
                Thêm Tuyến
              </button>
            </div>
          </div>
          <div className="content-table mt-4">
            <Table
              dataSource={roomsData}
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

      {/* Contact Info Modal */}
      <div
        className="modal fade"
        id="addrouteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="addrouteModal  "
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Thêm Tuyến</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-nav">
              <div className="row">
                <div className="col-12 mb-3 ">
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
                  <label htmlFor="Price" className="form-label">
                    bến xe xuất phát
                  </label>
                  <input
                    className="form-control"
                    placeholder="bến xe xuất phát"
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="Price" className="form-label">
                    Bến xe đến
                  </label>
                  <input className="form-control" placeholder="Bến xe đến" />
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
    </>
  );
};

export default Routehotel;
