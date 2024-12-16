import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./RoomVoucher.css";
import { Dropdown, Space, Table } from "antd";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { RoomService } from "../../../services/apis/RoomService";
import { VoucherService } from "../../../services/apis/VoucherService";
import { render } from "react-dom";
import ButtonEdit from "../../components/ButtonEdit";
import ButtonDelete from "../../components/ButtonDelete";
import ButtonDeleteRoom from "../../components/ButtonDeleteRoom";
import { useAuth } from "../../../context/AuthContext/AuthProvider";
import { enqueueSnackbar } from "notistack";
import { DownOutlined } from "@ant-design/icons";

const RoomVoucher = () => {
  const { username } = useAuth();
  const [voucherData, setVoucherData] = useState([]);
  const [roomDeleteId, setRoomDeleteId] = useState(null);
  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Loại giảm giá",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Giá trị",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Số lượng",
      dataIndex: "useLimit",
      key: "useLimit",
    },
    {
      title: "Đã sử dụng",
      dataIndex: "usedCount",
      key: "usedCount",
    },
    {
      title: "Mã phòng",
      dataIndex: "roomCode",
      key: "roomCode",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span
          style={{
            color: isActive ? "green" : "white",
            backgroundColor: isActive ? "#49dd51" : "#cc1d1d",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          {isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ButtonEdit
          // toogleModal={"modal"}
          // tagertModal={"#editInfoRoom"}
          // onClick={() => handleEditRoom(record)}
          />
          <ButtonDelete
            toogleModal={"modal"}
            tagertModal={"#deleteVoucher"}
            onClick={() => {
              setRoomDeleteId(record.id);
            }}
          />
        </div>
      ),
    },
  ];

  const [roomData, setRoomData] = useState([]);
  const [formVoucherData, setFormVoucherData] = useState({
    code: "",
    discount_type: "FIXED_AMOUNT",
    discount_value: "",
    start_date: "",
    end_date: "",
    use_limit: "",
    enterprise_username: username,
    is_active: "true",
    room_id: "",
  });
  const [filters, setFilters] = useState({
    discountType: null,
    status: null,
  });
  const [selectedFilter, setSelectedFilter] = useState("Lọc");
  const handleFilterChangeType = (label) => {
    // console.log("Filter Type:", type, "Value:", value);
    setSelectedFilter(label);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    fetchFilteredVoucherData({ ...filters, [key]: value });
  };

  const fetchFilteredVoucherData = async (filterParams) => {
    try {
      const response = await VoucherService.searchEnterprise(
        null,
        filterParams.status,
        filterParams.discountType
      );
      // setRoomsData(response.content || []);
      setVoucherData(response.content);
      // setTotalRecords(response.totalElements || 0);
      setFilters({
        discountType: null,
        status: null,
      });
    } catch (error) {
      console.error("Error fetching filtered room data", error);
    }
  };

  const items = [
    {
      key: "0",
      label: "Tất cả",
      onClick: () => {
        // fetchRoomData(
        //   getQueryParams(),
        //   currentPage - 1,
        //   pageSize,
        //   sortField,
        //   sortOrder
        // ),
        handleFilterChangeType("Tất cả");
      },
    },
    {
      key: "1",
      label: "Loại giảm giá",
      children: [
        {
          key: "percent",
          label: "Phần trăm",
          onClick: () => {
            handleFilterChangeType("Phần trăm"),
              handleFilterChange("discountType", "PERCENT");
          },
        },
        {
          key: "fix",
          label: "Giảm tiền",
          onClick: () => {
            handleFilterChangeType("Giảm tiền"),
              handleFilterChange("discountType", "FIXED_AMOUNT");
          },
        },
      ],
    },
    {
      key: "2",
      label: "Trạng thái",
      children: [
        {
          key: "true",
          label: "Đang hoạt động",
          onClick: () => {
            handleFilterChangeType("Đang hoạt động"),
              handleFilterChange("status", "true");
          },
        },
        {
          key: "false",
          label: "Ngưng hoạt động",
          onClick: () => {
            handleFilterChangeType("Ngưng hoạt động"),
              handleFilterChange("status", "false");
          },
        },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVoucherData({
      ...formVoucherData,
      [name]: value,
    });
  };

  const loadRooms = async () => {
    try {
      const res = await RoomService.getRoomsByEnterpriseId();
      setRoomData(res);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const fetchVoucherData = async () => {
    try {
      const res = await VoucherService.getVoucherByEnterpriseId();
      // console.log("Voucher data: ", res);

      setVoucherData(res.content);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { room_id, ...dataToSend } = formVoucherData;
      // console.log("Data to send: ", dataToSend);

      const res = await VoucherService.createRoomVoucher(
        dataToSend,
        formVoucherData.room_id
      );
      document.getElementById("closeVoucher").click();
      enqueueSnackbar("Thêm voucher thành công", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          setFormVoucherData({
            code: "",
            discount_type: "FIXED_AMOUNT",
            discount_value: "",
            start_date: "",
            end_date: "",
            use_limit: "",
            enterprise_username: username,
            is_active: "true",
            room_id: "",
          });
          fetchVoucherData();
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSearchVoucher = async (e) => {
    const { name, value } = e.target;
    console.log("Search value: ", value);
    try {
      const res = await VoucherService.searchEnterprise(value);
      setVoucherData(res.content);
      // console.log("Search voucher: ", res.content);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDeleteVoucher = async (id) => {
    try {
      const res = await VoucherService.deleteVoucher(id);
      // console.log("Delete voucher: ", res);
      document.getElementById("closeDeleteVoucher").click();
      enqueueSnackbar("Xóa voucher thành công", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          fetchVoucherData();
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    document.title = "Quản lý voucher";
    fetchVoucherData();
  }, []);

  return (
    <>
      <div className="enterprise-voucher-container">
        <div className="voucher-title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Quản lý voucher
          </h1>
        </div>

        <div className="voucher-content mt-3">
          <div className="nav-filter-voucher">
            <div className="voucher-search">
              <InputFlied
                nameInput={"search"}
                content={"Tìm kiếm"}
                typeInput={"text"}
                onChange={(e) => handleSearchVoucher(e)}
              />
            </div>
            <div className="nav-filterCombobox-voucher">
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
                    {selectedFilter} <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              {/* Button trigger modal */}
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addDiscountModal"
                onClick={() => {
                  loadRooms();
                }}
              >
                Thêm mã giảm
              </button>
            </div>
          </div>

          <div className="content-table mt-4">
            <Table
              dataSource={voucherData}
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

      <div className="d-flex align-items-stretch">
        {/* Modal */}
        <div
          className="modal fade"
          id="addDiscountModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="addDiscountLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="d-flex justify-content-between">
                  <h5
                    style={{
                      fontSize: "25px",
                      textTransform: "uppercase",
                      color: "#ADADAD",
                    }}
                    id="addDiscountLabel"
                  >
                    THÊM MÃ GIẢM GIÁ
                  </h5>

                  <button
                    className="voucher-close-button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="closeVoucher"
                  >
                    <span className="voucher-close-X"></span>
                    <span className="voucher-close-Y"></span>

                    <div className="voucher-close-close">Close</div>
                  </button>
                </div>

                {/* Form inputs */}
                <form>
                  {/* Input dòng 1 */}
                  <div className="form-group mt-3">
                    <label htmlFor="discountType">Mã phòng áp dụng</label>
                    <select
                      className="form-control"
                      id="discountType"
                      name="room_id"
                      onChange={handleChange}
                      value={formVoucherData.room_id}
                    >
                      {roomData.map((room) => (
                        <option key={room.roomId} value={room.roomId}>
                          {room.roomName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Input dòng 2 */}
                  <div className="d-flex justify-content-center mt-3 gap-3">
                    <div className="form-group col-md-6">
                      <InputFlied
                        nameInput={"code"}
                        content={"Mã giảm giá"}
                        typeInput={"text"}
                        onChange={handleChange}
                        value={formVoucherData.code}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <InputFlied
                        nameInput={"use_limit"}
                        content={"Giới hạn sử dụng"}
                        typeInput={"number"}
                        onChange={handleChange}
                        value={formVoucherData.use_limit}
                      />
                    </div>
                  </div>

                  {/* Input dòng 3 */}
                  <div className="d-flex justify-content-center mt-3 gap-3">
                    <div className="form-group col-md-6">
                      <label htmlFor="discountType">Loại giảm giá</label>
                      <select
                        className="form-control"
                        id="discountType"
                        name="discount_type"
                        onChange={handleChange}
                        value={formVoucherData.discount_type}
                      >
                        <option value="PERCENT">Phần trăm (%)</option>
                        <option value="FIXED_AMOUNT">Số tiền (VND)</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="input3_2">Giá trị giảm</label>
                      <input
                        type="text"
                        className="form-control"
                        id="input3_2"
                        name="discount_value"
                        onChange={handleChange}
                        value={formVoucherData.discount_value}
                      />
                    </div>
                  </div>

                  {/* Input dòng 4 */}
                  <div className="d-flex justify-content-center mt-3 gap-3">
                    <div className="form-group col-md-6">
                      <label htmlFor="input4_1">Ngày áp dụng</label>
                      <input
                        type="date"
                        className="form-control"
                        id="input4_1"
                        name="start_date"
                        onChange={handleChange}
                        value={formVoucherData.start_date}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="input4_2">Ngày hết hạn</label>
                      <input
                        type="date"
                        className="form-control"
                        id="input4_2"
                        name="end_date"
                        onChange={handleChange}
                        value={formVoucherData.end_date}
                      />
                    </div>
                  </div>
                </form>
                <button
                  type="button"
                  className="btn btn-primary d-flex justify-content-center col-12 mt-3"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="deleteVoucher"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom modal-remove-room">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>Xóa voucher</h3>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="closeDeleteVoucher"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-center">
                Bạn có chắc chắn muốn xóa voucher này không?
              </p>
              <p>
                <span className="text-danger" style={{ fontWeight: "700" }}>
                  Chú ý:{" "}
                </span>
                Nếu voucher đã được khách hàng dùng thì không thể xóa ra khỏi dữ
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
                      handleDeleteVoucher(roomDeleteId);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RoomVoucher;
