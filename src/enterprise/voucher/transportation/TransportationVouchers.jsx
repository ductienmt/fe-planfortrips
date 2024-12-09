import React, { useState } from "react";
import { Table } from "antd";
import "./Transportavoucher.css";
const TransportationVouchers = () => {
  const [roomsData, setRoomsData] = useState([]);
  const columns = [
    {
      title: "Giảm Giá",
      dataIndex: "",
      key: "",
    },
    {
      title: "Mã Voucher",
      dataIndex: "",
      key: "",
    },
    {
      title: "Số Lượng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Còn Lại",
      dataIndex: "",
      key: "",
    },
    {
      title: "Loại Xe",
      dataIndex: "",
      key: "",
    },
    {
      title: "Hết Hạn",
      dataIndex: "",
      key: "",
    },
    {
      title: "Trạng Thái",
      dataIndex: "",
      key: "",
    },
  ];

  const [selectedItem, setSelectedItem] = useState("all");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <div className="enterprise-TransportationVouchers-container">
        <div className="title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Mã Giảm Giá
          </h1>
        </div>

        <div className="content mt-3">
          <div className="nav-filter">
            <div className="filter-TransportationVouchers">
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

            <div className="nav-add-TransportationVouchers">
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
                data-bs-target="#addvouchersModal"
              >
                Thêm Voucher
              </button>
            </div>


            {/* Contact Info Modal */}
            <div className="modal fade" id="addvouchersModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addvouchersModal  " aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                  <div className="modal-header">
                    <h3>Thêm Mã Giảm Giá</h3>
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
                        <label htmlFor="Price" className="form-label">
                          Mã  phòng áp dụng
                        </label>
                        <input className="form-control" placeholder="  Mã  phòng áp dụng" />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="Price" className="form-label">
                          Mã  giảm giá
                        </label>
                        <input className="form-control" placeholder="  Mã  giảm giá" />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="Price" className="form-label">
                          Giới hạn sử dụng
                        </label>
                        <input className="form-control" placeholder="  Giới hạn sử dụng" />
                      </div>

                      <div className="col-6 mb-3">
                        <label htmlFor="Price" className="form-label">
                          Loại giảm giá
                        </label>
                        <input className="form-control" placeholder=" Loại giảm giá" />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="Price" className="form-label">
                          Giảm giá
                        </label>
                        <input className="form-control" placeholder=" Giảm giá" />
                      </div>







                      <div className="col-6 mb-3">
                        <label htmlFor="departureTime" className="form-label">
                          Ngày/Giờ bắt đầu
                        </label>
                        <input
                          type="datetime-local"
                          id="departureTime"
                          className="form-control"
                        />
                      </div>

                      <div className="col-6 mb-3">
                        <label htmlFor="arrivalTime" className="form-label">
                          Ngày/Giờ kết thúc
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
    </>
  );
};

export default TransportationVouchers;
