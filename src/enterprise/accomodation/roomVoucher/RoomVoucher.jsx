import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./RoomVoucher.css";
import { Table } from "antd";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { RoomService } from "../../../services/apis/RoomService";
import { VoucherService } from "../../../services/apis/VoucherService";

const RoomVoucher = () => {
  const [voucherData, setVoucherData] = useState([]);
  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "",
      key: "",
    },
    {
      title: "Loại giảm giá",
      dataIndex: "",
      key: "",
    },
    {
      title: "Giảm giá",
      dataIndex: "",
      key: "",
    },
    {
      title: "Số lượng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Còn lại",
      dataIndex: "",
      key: "",
    },
    {
      title: "Mã phòng",
      dataIndex: "",
      key: "",
    },
    {
      title: "Ngày bắt đầu",
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

  const fetchVoucherData = async () => {
    try {
      const res = await VoucherService.getVoucherByEnterpriseId(0, 10, "");
      console.log("Voucher data: ", res);

      setVoucherData(res);
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
                        THÊM MÃ GIẢM GIÁ
                      </h5>

                      <button
                        className="voucher-close-button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span className="voucher-close-X"></span>
                        <span className="voucher-close-Y"></span>

                        {/* <span aria-hidden="true">&times;</span> */}
                        <div className="voucher-close-close">Close</div>
                      </button>

                      {/* <button
                        type="button"
                        className="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button> */}
                    </div>

                    {/* Form inputs */}
                    <form>
                      {/* Input dòng 1 */}
                      <div className="form-group mt-3">
                        {/* <label htmlFor="input1">Mã phòng áp dụng</label> */}
                        {/* <input
                          type="text"
                          className="form-control d-flex justify-content-center col-12"
                          id="input1"
                          placeholder="Nhập mã phòng áp dụng"
                        /> */}
                        {/* <InputFlied
                          nameInput={"search"}
                          content={"Tìm kiếm"}
                          typeInput={"text"}
                        /> */}
                        <label htmlFor="discountType">Mã phòng áp dụng</label>
                        <select className="form-control" id="discountType">
                          <option value="hotel-id">001</option>
                        </select>
                      </div>

                      {/* Input dòng 2 */}
                      <div className="d-flex justify-content-center mt-3 gap-3">
                        <div className="form-group col-md-6">
                          {/* <label htmlFor="input2_1">Mã giảm giá</label> */}
                          {/* <input
                            type="text"
                            className="form-control"
                            id="input2_1"
                            placeholder="Nhập mã giảm giá"
                          /> */}
                          <InputFlied
                            nameInput={"search"}
                            content={"Mã giảm giá"}
                            typeInput={"text"}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          {/* <label htmlFor="input2_1">Giới hạn sử dụng</label> */}
                          {/* <input
                            type="number"
                            className="form-control"
                            id="input2_1"
                          /> */}
                          <InputFlied
                            nameInput={"search"}
                            content={"Giới hạn sử dụng"}
                            typeInput={"text"}
                          />
                        </div>
                      </div>

                      {/* Input dòng 3 */}
                      <div className="d-flex justify-content-center mt-3 gap-3">
                        <div className="form-group col-md-6">
                          <label htmlFor="discountType">Loại giảm giá</label>
                          <select className="form-control" id="discountType">
                            <option value="PERCENT">Phần trăm (%)</option>
                            <option value="AMOUNT">Số tiền (VND)</option>
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="input3_2">Giảm giá</label>
                          <input
                            type="text"
                            className="form-control"
                            id="input3_2"
                          />
                          {/* <InputFlied
                            className="form-control"
                            nameInput={"search"}
                            content={"Giảm giá"}
                            typeInput={"text"}
                          /> */}
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
    </>
  );
};
export default RoomVoucher;
