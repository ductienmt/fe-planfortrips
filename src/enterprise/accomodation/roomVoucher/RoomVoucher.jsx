import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./RoomVoucher.css";
import { Table } from "antd";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { RoomService } from "../../../services/apis/RoomService";
import { VoucherService } from "../../../services/apis/VoucherService";
import { render } from "react-dom";
import ButtonEdit from "../../components/ButtonEdit";
import ButtonDelete from "../../components/ButtonDelete";
import ButtonDeleteRoom from "../../components/ButtonDeleteRoom";

const RoomVoucher = () => {
  const [voucherData, setVoucherData] = useState([]);
  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Loại giảm giá",
      dataIndex: "discount_type",
      key: "discount_type",
    },
    {
      title: "Giá trị",
      dataIndex: "discount_value",
      key: "discount_value",
    },
    {
      title: "Số lượng",
      dataIndex: "use_limit",
      key: "use_limit",
    },
    {
      title: "Đã sử dụng",
      dataIndex: "use_count",
      key: "use_count",
    },
    {
      title: "Mã phòng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active) => (
        <span
          style={{
            color: is_active ? "green" : "white",
            backgroundColor: is_active ? "#49dd51" : "#cc1d1d",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          {is_active ? "Đang hoạt động" : "Ngưng hoạt động"}
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
            // onClick={() => {
            //   setRoomDeleteId(record.id);
            // }}
          />
        </div>
      ),
    },
  ];

  const fetchVoucherData = async () => {
    try {
      const res = await VoucherService.getVoucherByEnterpriseId();
      // console.log("Voucher data: ", res);

      setVoucherData(res.content);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
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
              />
            </div>
            <div className="nav-filterCombobox-voucher">
              <select>
                <option value="">Lọc</option>
                <option value="status">Trạng thái</option>
                <option value="roomType">Loại giảm giá</option>
              </select>
              {/* Button trigger modal */}
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addDiscountModal"
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
                <div className="d-flex justify-content-lg-between">
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
                    <select className="form-control" id="discountType">
                      <option value="hotel-id">001</option>
                    </select>
                  </div>

                  {/* Input dòng 2 */}
                  <div className="d-flex justify-content-center mt-3 gap-3">
                    <div className="form-group col-md-6">
                      <InputFlied
                        nameInput={"search"}
                        content={"Mã giảm giá"}
                        typeInput={"text"}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <InputFlied
                        nameInput={"search"}
                        content={"Giới hạn sử dụng"}
                        typeInput={"number"}
                      />
                    </div>
                  </div>

                  {/* Input dòng 3 */}
                  <div className="d-flex justify-content-center mt-3 gap-3">
                    <div className="form-group col-md-6">
                      <label htmlFor="discountType">Loại giảm giá</label>
                      <select className="form-control" id="discountType">
                        <option value="PERCENT">Phần trăm (%)</option>
                        <option value="FIXED_AMOUNT">Số tiền (VND)</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="input3_2">Giảm giá</label>
                      <input
                        type="text"
                        className="form-control"
                        id="input3_2"
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
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="input4_2">Ngày hết hạn</label>
                      <input
                        type="date"
                        className="form-control"
                        id="input4_2"
                      />
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
              <h3 style={{ fontWeight: "600", margin: "0" }}>Xóa phòng</h3>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
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
                  // onClick={() => {
                  //   handleDeleteRoom(roomDeleteId);
                  // }}
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
