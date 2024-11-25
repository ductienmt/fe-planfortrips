import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./Room.css";
import { Dropdown, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { useLocation } from "react-router-dom";
import { RoomService } from "../../../services/apis/RoomService";
import ButtonDelete from "../../components/ButtonDelete";
import ButtonEdit from "../../components/ButtonEdit";
import Loader from "../../../client/Components/Loading";
import { enqueueSnackbar } from "notistack";
import { ArrowForwardIos } from "@mui/icons-material";
import ButtonDeleteRoom from "../../components/ButtonDeleteRoom";

const Room = () => {
  const location = useLocation();
  const [roomsData, setRoomsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedItem, setSelectedItem] = useState("all");
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [roomDeleteId, setRoomDeleteId] = useState(null);
  const [roomFormData, setRoomFormData] = useState({
    roomName: "",
    typeOfRoom: "Standard",
    price: null,
    maxSize: null,
    isAvailable: "true",
    description: "",
    hotelId: "",
  });

  const items = [
    {
      key: "1",
      label: "Loại phòng",
      children: [
        { key: "Standard", label: "Standard" },
        { key: "Superior", label: "Superior" },
        { key: "Deluxe", label: "Deluxe" },
        { key: "Suite", label: "Suite" },
      ],
    },
    {
      key: "2",
      label: "Trạng thái",
      children: [
        { key: "true", label: "Đang hoạt động" },
        { key: "false", label: "Ngưng hoạt động" },
      ],
    },
  ];

  const columns = useMemo(
    () => [
      {
        title: "Tên phòng",
        dataIndex: "roomName",
        key: "roomName",
        sorter: true,
      },
      {
        title: "Loại phòng",
        dataIndex: "typeOfRoom",
        key: "typeOfRoom",
        sorter: true,
      },
      {
        title: "Giá phòng/đêm",
        dataIndex: "price",
        key: "price",
        sorter: true,
      },
      {
        title: "Số người tối đa",
        dataIndex: "maxSize",
        key: "maxSize",
        sorter: true,
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        render: (text) => {
          const maxLength = 30;
          return text.length > maxLength
            ? `${text.substring(0, maxLength)}...`
            : text;
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "available",
        key: "available",
        render: (available) => (
          <span
            style={{
              color: available ? "green" : "white",
              backgroundColor: available ? "#49dd51" : "#cc1d1d",
              padding: "5px",
              borderRadius: "4px",
            }}
          >
            {available ? "Đang hoạt động" : "Ngưng hoạt động"}
          </span>
        ),
      },
      {
        title: "Hành động",
        key: "actions",
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ButtonEdit
              toogleModal={"modal"}
              tagertModal={"#editInfoRoom"}
              onClick={() => handleEditRoom(record)}
            />
            <ButtonDelete
              toogleModal={"modal"}
              tagertModal={"#deleteRoom"}
              onClick={(e) => {
                e.preventDefault();
                setRoomDeleteId(record.id);
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleReset = () => {
    setRoomFormData({
      roomName: "",
      typeOfRoom: "Standard",
      price: null,
      maxSize: null,
      isAvailable: "true",
      description: "",
      hotelId: getQueryParams(),
    });
    setRoomId(null);
  };

  const validateRoomFormData = () => {
    const { price, maxSize } = roomFormData;
    // console.log(roomFormData.price, maxSize);

    if (isNaN(price) || isNaN(maxSize)) {
      enqueueSnackbar("Giá và số lượng người phải là số hợp lệ", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    return true;
  };

  const handleAddRoom = async () => {
    if (!validateRoomFormData()) {
      enqueueSnackbar("Vui lòng kiểm tra lại thông tin", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
    try {
      await RoomService.addRoom(roomFormData);
      enqueueSnackbar("Thêm phòng thành công", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          handleReset();
        },
      });
      const hotelId = getQueryParams();
      fetchRoomData(hotelId, 0, 10);
    } catch (error) {
      console.error("Error adding room", error);
    }
  };

  const handleUpdateRoom = async () => {
    if (!validateRoomFormData()) {
      enqueueSnackbar("Vui lòng kiểm tra lại thông tin", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
    try {
      await RoomService.updateRoom(roomId, roomFormData);
      enqueueSnackbar("Cập nhật phòng thành công", {
        variant: "success",
        autoHideDuration: 1000,
      });
      const hotelId = getQueryParams();
      fetchRoomData(hotelId, 0, 10);
    } catch (error) {
      console.error("Error editing room", error);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await RoomService.deleteRoom(id);
      enqueueSnackbar("Xóa phòng thành công", {
        variant: "success",
        autoHideDuration: 1000,
      });
      const hotelId = getQueryParams();
      fetchRoomData(hotelId, 0, 10);
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setRoomFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const getQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("id");
  }, [location.search]);

  const fetchRoomData = useCallback(
    async (
      id,
      pageNo = 0,
      pageSize = 10,
      sortField = null,
      sortOrder = null
    ) => {
      try {
        const response = await RoomService.getRoomsByHotelId(
          id,
          pageNo,
          pageSize,
          sortField,
          sortOrder
        );
        setRoomsData(response.content);
        setTotalRecords(response.totalElements);
      } catch (error) {
        console.error("Error fetching room data", error);
      }
    },
    []
  );

  const handleEditRoom = (room) => {
    setRoomFormData({
      roomName: room.roomName,
      typeOfRoom: room.typeOfRoom,
      price: room.price,
      maxSize: room.maxSize,
      isAvailable: room.available ? "true" : "false",
      description: room.description,
      hotelId: room.hotelId,
    });
    setRoomId(room.id);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setSortField(sorter.field);
    setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
  };

  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  useEffect(() => {
    const id = getQueryParams();
    setRoomFormData((prevFormData) => ({ ...prevFormData, hotelId: id }));
    fetchRoomData(id, currentPage - 1, pageSize, sortField, sortOrder, true);
  }, [
    location.search,
    currentPage,
    pageSize,
    sortField,
    sortOrder,
    getQueryParams,
    fetchRoomData,
  ]);

  return (
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
            <Dropdown menu={{ items }}>
              <a
                onClick={(e) => e.preventDefault()}
                style={{
                  padding: "8px 20px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: "#adadad",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                <Space>
                  Lọc
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#addRoomModal"
            >
              Thêm phòng
            </button>
          </div>
        </div>

        <div className="content-table mt-4">
          {/* <Table
            dataSource={roomsData}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalRecords,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
            }}
            onChange={handleTableChange}
          /> */}
          <Table
            dataSource={roomsData.map((room, index) => ({
              ...room,
              key: room.id || index,
            }))}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalRecords,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
            }}
            onChange={handleTableChange}
          />
        </div>
      </div>

      {/* Modal thêm phòng */}
      <div
        className="modal fade"
        id="addRoomModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addRoomLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
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
                  Thêm Phòng
                </h5>
                <button
                  className="room-close-button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="add-room-close"
                >
                  <span className="room-close-X"></span>
                  <span className="room-close-Y"></span>
                  <div className="room-close-close">Close</div>
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddRoom();
                }}
              >
                <div className="form-group mt-3">
                  <InputFlied
                    nameInput={"roomName"}
                    value={roomFormData.roomName}
                    content={"Tên phòng"}
                    typeInput={"text"}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mt-3">
                  <InputFlied
                    nameInput={"description"}
                    value={roomFormData.description}
                    content={"Mô tả"}
                    typeInput={"text"}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="d-flex justify-content-center mt-3 gap-3">
                  <div className="form-group col-md-6">
                    <InputFlied
                      nameInput={"price"}
                      value={roomFormData.price}
                      content={"Giá phòng"}
                      typeInput={"text"}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <InputFlied
                      nameInput={"maxSize"}
                      value={roomFormData.maxSize}
                      content={"Số lượng người tối đa"}
                      typeInput={"text"}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-3 gap-3">
                  <div className="form-group col-md-6">
                    <label htmlFor="roomType">Loại phòng</label>
                    <select
                      className="form-control"
                      id="roomType"
                      value={roomFormData.typeOfRoom}
                      name="typeOfRoom"
                      onChange={handleInputChange}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Superior">Superior</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="status">Trạng thái</label>
                    <select
                      className="form-control"
                      id="status"
                      value={roomFormData.isAvailable}
                      name="isAvailable"
                      onChange={handleInputChange}
                    >
                      <option value="true">Hoạt động</option>
                      <option value="false">Ngưng hoạt động</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary d-flex justify-content-center col-12 mt-3"
                >
                  Xác nhận
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* modal chỉnh thông tin phòng */}
      <div
        className="modal fade"
        id="editInfoRoom"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom modal-edit-info-room">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>
                Chỉnh sửa thông tin phòng
              </h3>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleReset}
              ></button>
            </div>
            <div className="modal-body" style={{ padding: "0" }}>
              <ul>
                <li>
                  <button
                    style={{
                      borderBottom: "1px solid #fff",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#nameRoomAndDescription"
                  >
                    <span>Tên phòng và mô tả</span>
                    <ArrowForwardIos />
                  </button>
                </li>
                <li>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#priceAndQuantity"
                  >
                    <span>Giá và số lượng người</span>
                    <ArrowForwardIos />
                  </button>
                </li>
                <li>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#typeRoomAndStatus"
                    style={{
                      borderRadius: "0 0 8px 8px",
                      borderTop: "1px solid #fff",
                    }}
                  >
                    <span>Loại phòng và trạng thái</span>
                    <ArrowForwardIos />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* modal chỉnh tên phòng và mô tả */}
      <div
        className="modal fade"
        id="nameRoomAndDescription"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>
                Chỉnh sửa tên phòng và mô tả
              </h3>

              <button
                type="button"
                className="btn-close"
                data-bs-toggle="modal"
                data-bs-target="#editInfoRoom"
              ></button>
            </div>
            <div className="modal-body">
              <InputFlied
                value={roomFormData.roomName}
                onChange={handleInputChange}
                content={"Tên phòng"}
                nameInput={"roomName"}
                typeInput={"text"}
              />
              <div className="mt-2">
                <label htmlFor="description" className="form-label">
                  Mô tả phòng
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control "
                  rows="4"
                  value={roomFormData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả phòng..."
                ></textarea>
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                data-bs-toggle="modal"
                data-bs-target="#editInfoRoom"
                type="button"
                className="custome-button-footer"
                onClick={handleUpdateRoom}
                style={{
                  width: "100%",
                  height: "50px",
                  margin: "0",
                  border: "none",
                }}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal chỉnh giá và số lượng*/}
      <div
        className="modal fade"
        id="priceAndQuantity"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>
                Chỉnh sửa giá và số lượng
              </h3>

              <button
                type="button"
                className="btn-close"
                data-bs-toggle="modal"
                data-bs-target="#editInfoRoom"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ display: "flex", gap: "15px" }}
            >
              <InputFlied
                value={roomFormData.price}
                onChange={handleInputChange}
                content={"Giá phòng"}
                nameInput={"price"}
                typeInput={"number"}
                dai={"50%"}
              />
              <InputFlied
                value={roomFormData.maxSize}
                onChange={handleInputChange}
                content={"Số lượng người tối đa"}
                nameInput={"maxSize"}
                typeInput={"number"}
                dai={"50%"}
              />
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                data-bs-toggle="modal"
                data-bs-target="#editInfoRoom"
                type="button"
                className="custome-button-footer"
                onClick={handleUpdateRoom}
                style={{
                  width: "100%",
                  height: "50px",
                  margin: "0",
                  border: "none",
                }}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal chỉnh loại phòng và trạng thái*/}
      <div
        className="modal fade"
        id="typeRoomAndStatus"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>
                Chỉnh sửa loại phòng và trạng thái
              </h3>

              <button
                type="button"
                className="btn-close"
                data-bs-toggle="modal"
                data-bs-target="#editInfoRoom"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ display: "flex", gap: "15px" }}
            >
              <select
                name="typeOfRoom"
                value={roomFormData.typeOfRoom}
                onChange={handleInputChange}
                style={{ width: "50%", height: "40px" }}
              >
                <option value="" disabled>
                  Loại phòng
                </option>
                <option value="Standard">Phòng Standard</option>
                <option value="Superior">Phòng Superior</option>
                <option value="Deluxe">Phòng Deluxe</option>
                <option value="Suite">Phòng Suite</option>
              </select>
              <select
                name="isAvailable"
                value={roomFormData.isAvailable}
                onChange={handleInputChange}
                style={{ width: "50%", height: "40px" }}
              >
                <option value="" disabled>
                  Trạng thái
                </option>
                <option value="true">Hoạt động</option>
                <option value="false">Không hoạt động</option>
              </select>
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                data-bs-toggle="modal"
                data-bs-target="#editInfoRoom"
                type="button"
                className="custome-button-footer"
                onClick={handleUpdateRoom}
                style={{
                  width: "100%",
                  height: "50px",
                  margin: "0",
                  border: "none",
                }}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal xóa phòng */}
      <div
        className="modal fade"
        id="deleteRoom"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom modal-remove-room">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>Xóa phòng</h3>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-center">
                Bạn có chắc chắn muốn xóa phòng này không?
              </p>
              <p>
                <span className="text-danger" style={{ fontWeight: "700" }}>
                  Chú ý:{" "}
                </span>
                Nếu phòng đã được khách hàng đặt thì không thể xóa ra khỏi dữ
                liệu của khách sạn
              </p>
            </div>
            <div
              className="modal-footer"
              style={{
                width: "100%",
                borderTop: "none",
              }}
            >
              <div
                className="w-100 d-flex justify-content-between button-custom"
                style={{ gap: "10px" }}
              >
                <button
                  className="w-50 btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <span className="w-50">
                  <ButtonDeleteRoom
                    onClick={() => {
                      handleDeleteRoom(roomDeleteId);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
