import { useEffect, useState } from "react";
import "./GuestLiving.css";
import { Table } from "antd";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { BookingHotelService } from "../../../services/apis/BookingHotelService";

const GuestLiving = () => {
  const [guestData, setGuestData] = useState([]);
  const columns = [
    {
      title: "Mã đặt",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Sđt khách hàng",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Số phòng",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Loại phòng",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "Nhận phòng",
      dataIndex: "checkInDate",
      key: "checkInDate",
    },
    {
      title: "Trả phòng",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
    },
    // {
    //   title: "Hành động",
    //   dataIndex: "",
    //   key: "",
    // },
  ];

  const [selectedItem, setSelectedItem] = useState("all");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    fetchGuestData(item);
  };

  const fetchGuestData = async (item) => {
    try {
      const res = await BookingHotelService.getGuest(item);
      setGuestData(res);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGuestData("all");
  }, []);
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
                onClick={() => handleSelectItem("not_used")}
                className={selectedItem === "not_used" ? "isActive" : ""}
              >
                Sắp sử dụng
              </button>

              <button
                onClick={() => handleSelectItem("in_use")}
                className={selectedItem === "in_use" ? "isActive" : ""}
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
