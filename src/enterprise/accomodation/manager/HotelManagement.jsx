import React, { useState } from "react";
import "./HotelManagement.css";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { Table } from "antd";

const HotelManagement = () => {
  const [hotelmData, sethotelmData] = useState([]);
  const columns = [
    {
      title: "Mã khách sạn",
      dataIndex: "",
      key: "",
    },
    {
      title: "Tên khách sạn",
      dataIndex: "",
      key: "",
    },
    {
      title: "Địa chỉ",
      dataIndex: "",
      key: "",
    },
    {
      title: "Mô tả",
      dataIndex: "",
      key: "",
    },
    {
      title: "Hotline",
      dataIndex: "",
      key: "",
    },
    {
      title: "Đánh giá",
      dataIndex: "",
      key: "",
    },
    {
      title: "Trạng thái",
      dataIndex: "",
      key: "",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "",
    },
  ];
  return (
    <>
      <div className="enterprise-hotelm-container">
        <div className="hotelm-title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Quản Lý Khách sạn
          </h1>
        </div>
        <div className="hotelm-content mt-3">
          <div className="nav-filterCombobox-hotelm">
            <InputFlied
              nameInput={"search"}
              content={"Tìm kiếm"}
              typeInput={"text"}
            />
            {/* Button trigger modal */}
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addHotelModal"
            >
              Thêm phòng
            </button>
          </div>

          <div className="d-flex align-items-stretch">
            {/* Modal */}
            <div
              className="modal fade"
              id="addHotelModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="addHotelLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="d-flex justify-content-lg-between">
                      <h5
                        style={{
                          fontSize: "25px",
                          textTransform: "uppercase",
                          color: "#ADADAD",
                        }}
                        id="addDiscountLabel"
                      >
                        THÊM khách sạn
                      </h5>

                      <button
                        className="hotel-close-button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span className="hotel-close-X"></span>
                        <span className="hotel-close-Y"></span>
                        <div className="hotel-close-close">Close</div>
                      </button>
                    </div>

                    {/* Form inputs */}
                    <form>
                      {/* Input dòng 1 */}
                      <div className="form-group mt-3">
                        <InputFlied
                          nameInput={"search"}
                          content={"Tên khách sạn"}
                          typeInput={"text"}
                        />
                      </div>

                      {/* Input dòng 2 */}
                      <div className="form-group mt-3">
                        <InputFlied
                          nameInput={"search"}
                          content={"Mô tả"}
                          typeInput={"text"}
                        />
                      </div>

                      {/* Input dòng 3 */}
                      <div className="form-group mt-3">
                        <InputFlied
                          nameInput={"search"}
                          content={"Địa chỉ"}
                          typeInput={"text"}
                        />
                      </div>

                      {/* Input dòng 4 */}
                      <div className="form-group mt-3">
                        <InputFlied
                          nameInput={"search"}
                          content={"Hotline"}
                          typeInput={"text"}
                        />
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-primary d-flex justify-content-center col-12 mt-3"
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-table mt-4">
          <Table
            dataSource={hotelmData}
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
    </>
  );
};

export default HotelManagement;
