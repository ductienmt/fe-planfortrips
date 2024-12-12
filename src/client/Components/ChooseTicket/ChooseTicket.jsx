import "./ChooseTicket.css";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ChooseTicket = ({
  numPeople,
  preModalTarget,
  preModalToogle,
  nextModalTarget,
  nextModalToogle,
  preClick,
  nextClick,
  seatsProp,
  scheduleIdOld,
  scheduleIdNew,
}) => {
  const [seats, setSeats] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (seatsProp) {
      setSeats(seatsProp);
    }
  }, [seatsProp]);

  const handlePreClick = () => {
    setSeats(null);
    if (preClick) {
      preClick();
    }
  };

  // Tính số ghế đã chọn
  const selectedSeatsCount = seats?.filter(
    (seat) => seat.status === "selected"
  ).length;

  // Hàm xử lý chọn/hủy ghế
  const handleSeatClick = (seatId) => {
    const updateSeats = seats?.map((seat) =>
      seat.seat_id === seatId && seat.status !== "Full"
        ? {
            ...seat,
            status:
              seat.status === "selected" && selectedSeatsCount <= numPeople
                ? "Empty"
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
    return seats?.filter((seat) => seat.seat_number.charAt(0) === floor);
  };

  // Hàm render ghế
  const renderSeats = (seats) => {
    return seats?.map((seat) => (
      <button
        key={seat.seat_id}
        className={`seat-button ${seat.status}`}
        onClick={() => handleSeatClick(seat.seat_id)}
        disabled={seat.status === "Full"}
      >
        {seat.seat_number}
      </button>
    ));
  };

  // Hàm xử lý khi nhấn "Tiếp tục"
  const handleContinue = () => {
    if (selectedSeatsCount < numPeople) {
      enqueueSnackbar(`Bạn cần chọn đủ ${numPeople} ghế trước khi tiếp tục!`, {
        variant: "error",
        autoHideDuration: 1000,
      });
    } else {
      const selectedSeats = seats
        ?.filter((seat) => seat.status === "selected")
        .map((seat) => ({
          seat_id: seat.seat_id,
          seat_number: seat.seat_number,
        }));
      nextClick(selectedSeats, scheduleIdOld, scheduleIdNew);
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
                  id="closeChooseTicket"
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
                    <div className="item-1">{/* <b>{booking.code}</b> */}</div>
                    <div className="item-2">
                      <b style={{ fontSize: "25px", color: "red" }}>
                        {/* {booking.price} */}
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
                  <div
                    className="d-flex justify-content-end"
                    style={{ gap: "10px" }}
                  >
                    <div className="item-button">
                      <button
                        className="continue-button1"
                        // data-bs-toggle="modal"
                        // data-bs-target="#changeModal"
                        onClick={handlePreClick}
                        {...(preModalTarget && {
                          "data-bs-target": preModalTarget,
                        })}
                        {...(preModalToogle && {
                          "data-bs-toggle": preModalToogle,
                        })}
                      >
                        Quay lại
                      </button>
                    </div>
                    <div className="item-button">
                      <button
                        className="continue-button"
                        {...(nextModalTarget && {
                          "data-bs-target": nextModalTarget,
                        })}
                        {...(nextModalToogle && {
                          "data-bs-toggle": nextModalToogle,
                        })}
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
