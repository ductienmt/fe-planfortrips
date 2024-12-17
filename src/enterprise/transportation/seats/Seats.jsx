import React, { useCallback, useEffect, useState } from "react";
import "./Seats.css";
import SeatsCard from "../seatscard/Seatscard";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import memoize from "lodash.memoize";
import { VehiclesService } from "../../../services/apis/Vehicles";
import { enqueueSnackbar } from "notistack";
import { SeatService } from "../../../services/apis/SeatService";

const Seats = () => {
  const navigate = useNavigate();
  const [startSeat1, setStartSeat1] = useState("");
  const [endSeat1, setEndSeat1] = useState("");
  const [startSeat2, setStartSeat2] = useState("");
  const [endSeat2, setEndSeat2] = useState("");

  const [vehicleData, setVehicleData] = useState([]);
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const loadVehicleData = useCallback(
    debounce(async () => {
      try {
        const res = await VehiclesService.getVehicleByEnterpriseId("all");
        setVehicleData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }, 300),
    []
  );

  const [seats, setSeats] = useState([]);

  const handleConfirmSeats = useCallback(() => {
    const newSeats = [];

    if (startSeat1 && endSeat1) {
      const start = parseInt(startSeat1);
      const end = parseInt(endSeat1);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) {
          newSeats.push(`A${i < 10 ? `0${i}` : i}`);
        }
      }
    }

    if (startSeat2 && endSeat2) {
      const start = parseInt(startSeat2);
      const end = parseInt(endSeat2);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) {
          newSeats.push(`B${i < 10 ? `0${i}` : i}`);
        }
      }
    }

    if (newSeats.length + seats.length > vehicleCapacity) {
      enqueueSnackbar("Số lượng ghế vượt quá sức chứa của xe", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

    setSeats((prevSeats) => [...prevSeats, ...newSeats]);
    console.log("Ghế đã xác nhận:", newSeats);
    createSeatsForVehicle(newSeats);
  }, [startSeat1, endSeat1, startSeat2, endSeat2, seats, vehicleCapacity]);

  const getSeatsByFloor = useCallback(
    memoize((floor) =>
      seats.filter((seat) => seat?.seatNumber.charAt(0) === floor)
    ),
    [seats]
  );

  const renderSeats = useCallback(
    (seats) =>
      seats.map((seat) => (
        <button key={seat.id} className="seat-button" disabled>
          {seat.seatNumber}
        </button>
      )),
    []
  );

  const loadSeats = useCallback(async (id) => {
    try {
      const res = await VehiclesService.getSeatByVehicleId(id);
      setSeats(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createSeats = useCallback(
    async (code) => {
      try {
        await SeatService.create(vehicleId, code);
      } catch (error) {
        console.log(error);
      }
    },
    [vehicleId]
  );

  const createSeatsForVehicle = useCallback(
    async (newSeats) => {
      try {
        await Promise.all(newSeats.map((seatCode) => createSeats(seatCode)));

        enqueueSnackbar("Tạo ghế thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        document.getElementById("closeSeatModal").click();
      } catch (error) {
        console.error("Lỗi khi tạo ghế:", error);
        enqueueSnackbar("Có lỗi xảy ra khi tạo ghế", {
          variant: "error",
          autoHideDuration: 2000,
        });
        document.getElementById("closeSeatModal").click();
      }
    },
    [createSeats]
  );

  useEffect(() => {
    loadVehicleData();
  }, [loadVehicleData]);

  useEffect(() => {
    const floor1Seats = getSeatsByFloor("A");
    const floor2Seats = getSeatsByFloor("B");

    setStartSeat1(floor1Seats.length > 0 ? floor1Seats.length + 1 : 1);
    setStartSeat2(floor2Seats.length > 0 ? floor2Seats.length + 1 : 1);
  }, [seats, getSeatsByFloor]);

  return (
    <div className="enterprise-Seats-container">
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

      <div className="Seats-selection" style={{ width: "100%" }}>
        {vehicleData.map((vehicle, index) => (
          <div key={index} style={{ width: "100%" }}>
            <div className="Seats-container" style={{ width: "100%" }}>
              <SeatsCard {...vehicle} />
              <button
                type="button"
                className="btn select-Seats-btn"
                data-bs-toggle="modal"
                data-bs-target="#seatModal"
                onClick={() => {
                  loadSeats(vehicle.code);
                  setVehicleCapacity(vehicle.capacity);
                  setVehicleId(vehicle.code);
                }}
              >
                Chọn xe
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="seatModal"
        tabIndex="-1"
        aria-labelledby="seatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="transport-topBar-items mb-3">
              <div className="right-close-add-seat d-flex justify-content-between align-items-center">
                <h3 className="m-0">Ghế của xe</h3>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn seats-button"
                    data-bs-toggle="modal"
                    data-bs-target="#addSeatForVehicle"
                  >
                    Thêm ghế
                  </button>
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
            </div>

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
        id="addSeatForVehicle"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ color: "black" }}
              >
                Thông Tin Ghế
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeSeatModal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
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
                        type="number"
                        className="form-control seat-input"
                        id="start-seat1"
                        value={startSeat1}
                        readOnly
                        placeholder="Nhập ghế bắt đầu"
                      />
                    </div>
                    <div className="mb-3 ">
                      <label htmlFor="end-seat1" className="form-label">
                        Ghế Kết Thúc
                      </label>
                      <input
                        type="number"
                        className="form-control seat-input"
                        id="end-seat1"
                        value={endSeat1}
                        onChange={(e) => setEndSeat1(e.target.value)}
                        placeholder="Nhập ghế kết thúc"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="start-seat2">
                    Tầng 2
                  </label>
                  <div className="mb-3 seat-input-wrapper">
                    <div className="mb-3 ">
                      <label htmlFor="start-seat2" className="form-label">
                        Ghế Bắt Đầu
                      </label>
                      <input
                        type="number"
                        className="form-control seat-input"
                        id="start-seat2"
                        value={startSeat2}
                        readOnly
                        placeholder="Nhập ghế bắt đầu"
                      />
                    </div>
                    <div className="mb-3 ">
                      <label htmlFor="end-seat2" className="form-label">
                        Ghế Kết Thúc
                      </label>
                      <input
                        type="number"
                        className="form-control seat-input"
                        id="end-seat2"
                        value={endSeat2}
                        onChange={(e) => setEndSeat2(e.target.value)}
                        placeholder="Nhập ghế kết thúc"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#seatModal"
              >
                Quay lại
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmSeats}
              >
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
