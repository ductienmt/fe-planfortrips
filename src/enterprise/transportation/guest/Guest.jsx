import React, { useEffect, useState } from "react";
import "./Guest.css";
import { Table } from "antd";
import { TicketService } from "../../../services/apis/TicketService";
import { convertToVND, convertToVNDDB } from "../../../utils/FormatMoney";
const Guest = () => {
  const [guestData, setGuestData] = useState([]);
  const columns = [
    {
      title: "Mã vé ",
      dataIndex: "ticket_id",
      key: "ticket_id",
    },
    {
      title: "Tên Khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Ghế",
      dataIndex: "seat_numbers",
      key: "seat_numbers",
    },
    {
      title: "SĐT khách",
      dataIndex: "customer_phone",
      key: "customer_phone",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (total_price) => {
        return convertToVND(total_price);
      },
    },
    {
      title: "Xuất phát",
      dataIndex: "departure",
      key: "departure",
    },
    {
      title: "Điểm đến",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "SĐT nhà xe",
      dataIndex: "car_company_phone",
      key: "car_company_phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  const loadGuest = async (status) => {
    try {
      const res = await TicketService.getUsers(status);
      setGuestData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Khách hàng của bạn";
    loadGuest("1");
  }, []);

  const [selectedItem, setSelectedItem] = useState("complete");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    if (item === "complete") {
      loadGuest("1");
    } else if (item === "peding") {
      loadGuest("0");
    } else if (item === "cancel") {
      loadGuest("2");
    }
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
                onClick={() => handleSelectItem("complete")}
                className={selectedItem === "complete" ? "isActive" : ""}
              >
                Hoàn thành
              </button>
              <button
                onClick={() => handleSelectItem("peding")}
                className={selectedItem === "peding" ? "isActive" : ""}
              >
                Đang chờ
              </button>
              <button
                onClick={() => handleSelectItem("cancel")}
                className={selectedItem === "cancel" ? "isActive" : ""}
              >
                Hủy
              </button>
            </div>

            {/* <div className="nav-add-Route">
              <select>
                <option value="">Lọc</option>
                <option value="deluxe">Deluxe</option>
                <option value="standard">Standard</option>
                <option value="superior">Superior</option>
              </select>
            </div> */}
          </div>
          <div className="content-table mt-4">
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
      </div>
    </>
  );
};

export default Guest;
