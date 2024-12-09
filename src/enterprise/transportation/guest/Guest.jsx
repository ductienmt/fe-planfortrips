import React, { useState } from "react";
import "./Guest.css";
import { Table } from "antd";
const Guest = () => {
  const [roomsData, setRoomsData] = useState([]);
  const columns = [
    {
      title: "Mã vé ",
      dataIndex: "",
      key: "",
    },
    {
      title: "Tên Khách hàng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Ghế",
      dataIndex: "",
      key: "",
    },
    {
      title: "SĐT khách",
      dataIndex: "",
      key: "mxize",
    },
    {
      title: "Tổng tiền",
      dataIndex: "",
      key: "",
    },
    {
      title: "Bến Xe Đến",
      dataIndex: "",
      key: "",
    },
    {
      title: "Xuất phát",
      dataIndex: "",
      key: "",
    },
    {
      title: "Điểm đến",
      dataIndex: "",
      key: "",
    },
    {
      title: "SĐT nhà xe",
      dataIndex: "",
      key: "",
    },
    {
      title: "Trạng thái",
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
      <div className="enterprise-Route-container">
        <div className="title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Khách Hàng
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

export default Guest;
