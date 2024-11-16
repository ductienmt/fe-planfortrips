import React, { useEffect, useState } from "react";
import "./Room.css";
import { Table } from "antd";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { useLocation } from "react-router-dom";
import { RoomService } from "../../../services/apis/RoomService";

const Room = () => {
  const location = useLocation();
  const [roomsData, setRoomsData] = useState([]);
  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Loại phòng",
      dataIndex: "typeOfRoom",
      key: "typeOfRoom",
    },
    {
      title: "Giá phòng/đêm",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số người tối đa",
      dataIndex: "maxSize",
      key: "maxSize",
    },
    {
      title: "Trạng thái",
      dataIndex: "available",
      key: "available",
      render: (available) => (available ? "Đang hoạt động" : "Ngưng hoạt động"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div>
          <button className="button-edit btn">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="button-delete btn">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const getQueryParams = () => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    return id;
  };

  const fetchRoomData = async (id) => {
    try {
      const response = await RoomService.getRoomsByHotelId(id);
      setRoomsData(response);
      console.log("Dữ liệu phòng:", response);
    } catch (error) {
      console.error("L��i khi lấy dữ liệu phòng:", error);
    }
  };

  const [selectedItem, setSelectedItem] = useState("all");

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const id = getQueryParams();
    console.log("ID từ URL:", id);
    fetchRoomData(id);
  }, [location.search]);
  return (
    <>
      <div className="enterprise-room-container">
        <div className="title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Quản lý phòng
          </h1>
        </div>

        <div className="content mt-3">
          <div className="nav-filter">
            <div className="filter-room">
              <button
                onClick={() => handleSelectItem("all")}
                className={selectedItem === "all" ? "isActive" : ""}
              >
                Tất cả
              </button>
              <button
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
              </button>
            </div>

            <div className="nav-add-room">
              <select>
                <option value="">Lọc</option>
                <option value="deluxe">Deluxe</option>
                <option value="standard">Standard</option>
                <option value="superior">Superior</option>
              </select>
              {/* Button trigger modal */}
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addRoomModal"
              >
                Thêm phòng
              </button>
            </div>
          </div>

          <div className="d-flex align-items-stretch">
            {/* Modal */}
            <div
              className="modal fade"
              id="addRoomModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="addRoomLabel"
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
                        THÊM Phòng
                      </h5>

                      <button
                        className="room-close-button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span className="room-close-X"></span>
                        <span className="room-close-Y"></span>
                        <div className="room-close-close">Close</div>
                      </button>
                    </div>

                    {/* Form inputs */}
                    <form>
                      {/* Input dòng 1 */}
                      <div className="form-group mt-3">
                        <InputFlied
                          nameInput={"search"}
                          content={"Tên phòng"}
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
                      <div className="d-flex justify-content-center mt-3 gap-3">
                        <div className="form-group col-md-6">
                          <InputFlied
                            nameInput={"search"}
                            content={"Giá phòng"}
                            typeInput={"text"}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <InputFlied
                            nameInput={"search"}
                            content={"Số lượng người tối đa"}
                            typeInput={"text"}
                          />
                        </div>
                      </div>

                      {/* Input dòng 4 */}
                      <div className="d-flex justify-content-center mt-3 gap-3">
                        <div className="form-group col-md-6">
                          <label htmlFor="roomType">Loại phòng</label>
                          <select className="form-control" id="roomType">
                            <option value="suite">Suite</option>
                            <option value="standard">Standard</option>
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="status">Trạng thái</label>
                          <select className="form-control" id="status">
                            <option value="active">Hoạt động</option>
                            <option value="deactivate">Ngưng hoạt động</option>
                          </select>
                        </div>
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

export default Room;
