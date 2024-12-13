import "./ChooseTicket.css";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const ChooseTicket = ({ numPeople }) => {
  // Dữ liệu đặt xe mẫu
  const booking = {
    code: "A004",
    name: "Phương Trang",
    rating: 5,
    ariveltime: "2:00",
    Departur: "5:00",
    ariveladdres: "Cao Lãnh",
    Departuraddres: "Hồ Chí Minh",
    price: "140.000",
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
  const { enqueueSnackbar } = useSnackbar();

  // Tính số ghế đã chọn
  const selectedSeatsCount = seats.filter(
    (seat) => seat.status === "selected"
  ).length;

  // Hàm xử lý chọn/hủy ghế
  const handleSeatClick = (seatId) => {
    const updateSeats = seats.map((seat) =>
      seat.id === seatId && seat.status !== "booked"
        ? {
            ...seat,
            status:
              seat.status === "selected" && selectedSeatsCount <= numPeople
                ? "available"
                : selectedSeatsCount < numPeople
                  ? "selected"
                  : seat.status,
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

  // Hàm xử lý khi nhấn "Tiếp tục"
  const handleContinue = () => {
    if (selectedSeatsCount < numPeople) {
      enqueueSnackbar(`Bạn cần chọn đủ ${numPeople} ghế trước khi tiếp tục!`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Bạn đã chọn đủ ghế. Tiếp tục!", { variant: "success" });
    }
  };

  return (
    <>
      {/* choose Modal */}
      <div
        className="modal fade"
        id="chooseTicket"
        tabIndex="-1"
        aria-labelledby="chooseTicketLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            width: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          role="document"
        >
          <div
            className="modal-content"
            style={{
              width: "700px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="modal-body change-ticket-color2"
              style={{
                width: "700px",
              }}
            >
              <div className="d-flex justify-content-lg-between mb-3">
                <h5
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    color: "darkblue",
                  }}
                  id="chooseTicketLabel"
                >
                  Thay đổi vé xe
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

              <div className="vehiclebooking-body">
                <div className="vehicle-container">
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
                  <div className="price-bus">
                    <div className="item-1">
                      <b>{booking.code}</b>
                    </div>
                    <div className="item-2">
                      <b style={{ fontSize: "25px", color: "red" }}>
                        {booking.price}
                      </b>
                    </div>
                  </div>

                  <div className="validation-info d-flex gap-3">
                    <p className="mb-0">
                      Bạn đã chọn: <strong>{selectedSeatsCount}</strong>/
                      {numPeople} ghế.
                    </p>
                    <div className="">
                      {selectedSeatsCount > numPeople && (
                        <p className="error mb-0">
                          Bạn không thể chọn nhiều hơn {numPeople} ghế!
                        </p>
                      )}
                      {selectedSeatsCount < numPeople && (
                        <p
                          className="error mb-0"
                          style={{ color: "red", fontWeight: "bold" }}
                        >
                          Vui lòng chọn đủ {numPeople} ghế!
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="item-button">
                      <button
                        className="continue-button1"
                        data-bs-toggle="modal"
                        data-bs-target="#changeModal"
                      >
                        Quay lại
                      </button>
                    </div>
                    <div className="item-button">
                      <button
                        className="continue-button"
                        onClick={handleContinue}
                      >
                        Tiếp tục
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseTicket;
