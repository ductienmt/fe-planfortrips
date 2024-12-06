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

  // Dữ liệu ghế cố định (gộp cả tầng 1 và tầng 2 vào một mảng duy nhất)
  const initialSeats = [
    { id: "A1", status: "available" },
    { id: "A2", status: "booked" },
    { id: "A3", status: "available" },
    { id: "A4", status: "available" },
    { id: "A5", status: "booked" },
    { id: "A6", status: "available" },
    { id: "A7", status: "available" },
    { id: "A8", status: "booked" },
    { id: "A9", status: "available" },
    { id: "A10", status: "available" },
    { id: "A11", status: "available" },
    { id: "A12", status: "booked" },
    { id: "A13", status: "available" },
    { id: "A14", status: "available" },
    { id: "A15", status: "booked" },
    { id: "A16", status: "available" },
    { id: "A17", status: "available" },
    { id: "B1", status: "available" },
    { id: "B2", status: "booked" },
    { id: "B3", status: "available" },
    { id: "B4", status: "available" },
    { id: "B5", status: "available" },
    { id: "B6", status: "booked" },
    { id: "B7", status: "available" },
    { id: "B8", status: "available" },
    { id: "B9", status: "booked" },
    { id: "B10", status: "available" },
    { id: "B11", status: "available" },
    { id: "B12", status: "available" },
    { id: "B13", status: "booked" },
    { id: "B14", status: "available" },
    { id: "B15", status: "available" },
  ];

  const [seats, setSeats] = useState(initialSeats);

  // Hàm xử lý chọn hoặc hủy chọn ghế
  const handleSeatClick = (seatId) => {
    const updateSeats = seats.map((seat) =>
      seat.id === seatId && seat.status !== "booked"
        ? {
            ...seat,
            status: seat.status === "selected" ? "available" : "selected",
          }
        : seat
    );
    setSeats(updateSeats);
  };

  // Hàm phân loại ghế theo tầng
  const getSeatsByFloor = (floor) => {
    return seats.filter((seat) => seat.id.charAt(0) === floor);
  };

  // Hàm render ghế
  const renderSeats = (seats) => {
    return seats.map((seat) => (
      <button
        key={seat.id}
        className={`seat-button ${seat.status}`}
        onClick={() => handleSeatClick(seat.id)}
        disabled={seat.status === "booked"}
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
          ></h1>
        </div>

        {/* Nội dung tìm kiếm */}
        <div className="Seats-content mt-3"></div>

        {/* Lựa chọn khách sạn */}
        <div className="Seats-selection">
          <div className="Seats-container">
            <SeatsCard {...hotelmData} />
            <button
              type="button"
              className="btn select-Seats-btn"
              data-bs-toggle="modal"
              data-bs-target="#contactModal"
            >
              Chọn xe
            </button>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="contactModal"
          // data-bs-backdrop="static"
          // data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="contactModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="transport-topBar-items mb-3">
                <div className="nav-filter">
                  <InputFlied
                    className="seact-search"
                    nameInput="search"
                    content="Tìm kiếm"
                    typeInput="text"
                  />
                </div>
                <div className="right-close-add-seat">
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
                  data-bs-dismiss="modal"
                >
                  Đóng
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
