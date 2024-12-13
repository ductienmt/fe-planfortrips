import React, { useState } from "react";
import "./Seats.css";
import SeatsCard from "../seatscard/Seatscard";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { useNavigate } from "react-router-dom";
import VehicleBooking from "../../../client/pages/Vehicle/VehicleBooking/VehicleBooking";

const Seats = () => {
  const navigate = useNavigate();

  const hotelmData = {
    hotelCode: "001",
    name: "City Center Hotel",
    status: "Đang hoạt động",
    licensePlate: "79A-123.45",
    capacity: "4 người",
    driverName: "Nguyễn Văn A",

    phone: "0456123789",
    image: "/src/assets/beach.jpg",
  };

  const handleClick = () => {
    navigate("/enterprise/accomodation/room-management");
  };

   // Dữ liệu ghế cố định
   const initialSeats = [
    { id: "A1" },
    { id: "A2" },
    { id: "A3" },
    { id: "A4" },
    { id: "A5" },
    { id: "A6" },
    { id: "A7" },
    { id: "A8" },
    { id: "A9" },
    { id: "A10" },
    { id: "A11" },
    { id: "A12" },
    { id: "A13" },
    { id: "A14" },
    { id: "A15" },
    { id: "A16" },
    { id: "A17" },
    { id: "B1" },
    { id: "B2" },
    { id: "B3" },
    { id: "B4" },
    { id: "B5" },
    { id: "B6" },
    { id: "B7" },
    { id: "B8" },
    { id: "B9" },
    { id: "B10" },
    { id: "B11" },
    { id: "B12" },
    { id: "B13" },
    { id: "B14" },
    { id: "B15" },
  ];

  const [seats] = useState(initialSeats);

  // Hàm phân loại ghế theo tầng
  const getSeatsByFloor = (floor) => {
    return seats.filter((seat) => seat.id.charAt(0) === floor);
  };

  // Hàm render ghế
  const renderSeats = (seats) => {
    return seats.map((seat) => (
      <button
        key={seat.id}
        className="seat-button"
        disabled
      >
        {seat.id}
      </button>
    ));
  };


  return (
    <>
      <div className="enterprise-Seats-container">
        {/* Tiêu đề */}
        <div className="Seats-title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Quản lý ghế
          </h1>
        </div>

        {/* Lựa chọn khách sạn */}
        <div className="Seats-selection">
          <div className="Seats-container">
            <SeatsCard {...hotelmData} />
            <button
              type="button"
              className="btn select-Seats-btn"
              data-bs-toggle="modal"
              data-bs-target="#seatModal"
            >
              Chọn xe
            </button>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="seatModal"
          // data-bs-backdrop="static"
          // data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="seatModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="transport-topBar-items mb-3">
                <div className="right-close-add-seat d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn seats-button"
                    data-bs-toggle="modal"
                    data-bs-target="#addrouteModal"
                  >
                    Thêm ghế
                  </button>
                  {/* Sử dụng css của RoomVoucher   */}
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
              </div>

              {/* Chọn ghế */}
              <div className="seats-container">
                <div className="floor-section">
                  <h4>Tầng 1</h4>
                  <div className="seat-grid">
                    {renderSeats(getSeatsByFloor("A"))}
                  </div>
                </div>
                <div className="floor-section">
                  <h4>Tầng 2</h4>
                  <div className="seat-grid">
                    {renderSeats(getSeatsByFloor("B"))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="addrouteModal"
          tabIndex="-1"
          aria-labelledby="addrouteModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Thông Tin Ghế
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <div className="row">
                  {/* Cột 1 */}
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="start-seat1">
                      Tầng 1
                    </label>
                    <div className="mb-3 seat-input-wrapper">
                      <div className="mb-3 ">
                        <label htmlFor="start-seat1" className="form-label">
                          Ghế Bắt Đầu
                        </label>
                        <input
                          type="text"
                          className="form-control seat-input"
                          id="start-seat1"
                          placeholder="Nhập ghế bắt đầu"
                        />
                      </div>
                      <div className="mb-3 ">
                        <label htmlFor="end-seat1" className="form-label">
                          Ghế Kết Thúc
                        </label>
                        <input
                          type="text"
                          className="form-control seat-input"
                          id="end-seat1"
                          placeholder="Nhập ghế kết thúc"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cột 2 */}

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="start-seat1">
                      Tầng 2
                    </label>
                    <div className="mb-3 seat-input-wrapper">
                      <div className="mb-3 ">
                        <label htmlFor="start-seat1" className="form-label">
                          Ghế Bắt Đầu
                        </label>
                        <input
                          type="text"
                          className="form-control seat-input"
                          id="start-seat1"
                          placeholder="Nhập ghế bắt đầu"
                        />
                      </div>
                      <div className="mb-3 ">
                        <label htmlFor="end-seat1" className="form-label">
                          Ghế Kết Thúc
                        </label>
                        <input
                          type="text"
                          className="form-control seat-input"
                          id="end-seat1"
                          placeholder="Nhập ghế kết thúc"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#seatModal"
                >
                  Quay lại
                </button>
                <button type="button" className="btn btn-primary">
                  Xác Nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seats;
