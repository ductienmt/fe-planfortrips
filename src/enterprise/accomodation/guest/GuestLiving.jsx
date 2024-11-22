import { useState } from "react";
import "./GuestLiving.css";
import { Table } from "antd";
import { InputFlied } from "../../../client/Components/Input/InputFlied";

const GuestLiving = () => {
  const [guestData, setGuestData] = useState([]);
  const columns = [
    {
      title: "Mã đặt",
      dataIndex: "",
      key: "",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Số phòng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Tổng tiền",
      dataIndex: "",
      key: "",
    },
    {
      title: "Loại phòng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Nhận phòng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Trả phòng",
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

  const [selectedItem, setSelectedItem] = useState("all");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <div className="enterprise-guest-container">
        <div className="guest-title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Khách hàng
          </h1>
        </div>
        <div className="guest-content mt-3">
          <div className="nav-filter-guest">
            <div className="filter-guest">
              <button
                onClick={() => handleSelectItem("all")}
                className={selectedItem === "all" ? "isActive" : ""}
              >
                Tất cả
              </button>

              <button
                onClick={() => handleSelectItem("comingSoon")}
                className={selectedItem === "comingSoon" ? "isActive" : ""}
              >
                Sắp sử dụng
              </button>

              <button
                onClick={() => handleSelectItem("using")}
                className={selectedItem === "using" ? "isActive" : ""}
              >
                Đang sử dụng
              </button>

              <button
                onClick={() => handleSelectItem("used")}
                className={selectedItem === "used" ? "isActive" : ""}
              >
                Đã sử dụng
              </button>
            </div>

            <div className="nav-filterCombobox-guest">
              <select>
                <option value="">Lọc</option>
                <option value="status">Trạng thái</option>
                <option value="roomType">Loại phòng</option>
              </select>
              <InputFlied
                nameInput={"search"}
                content={"Tìm kiếm"}
                typeInput={"text"}
              />
            </div>
          </div>
        </div>
        <div className="guest-content-table">
          <Table
            dataSource={guestData}
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
export default GuestLiving;
