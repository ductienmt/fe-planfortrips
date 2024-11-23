import { useEffect, useState } from "react";
import { ScheduleService } from "../../../services/apis/ScheduleService";
import "./TransportationCard.css";
import "feather-icons/dist/feather";
import { VehiclesService } from "../../../services/apis/Vehicles";
import nhaxe from "../../../assets/caurong.webp";
import TicketTransportationCard from "../../Components/ticketTransportation/TicketTransportationCard";

const TransportationCard = ({
  className,
  onClick,
  // onNext,
  vehicleCode,
  nameVehicle,
  departureDate,
  arrivalDate,
  departureTime,
  arrivalTime,
  timeCommunicate,
  seatCode,
  scheduleId,
}) => {
  const [departureStationData, setDepartureStationData] = useState("");
  const [arrivalStationData, setArrivalStationData] = useState("");
  const loadStation = async (id) => {
    try {
      const response = await ScheduleService.getStation(id);
      console.log("station", response.data);

      setDepartureStationData(response.data.data.departureStation);
      setArrivalStationData(response.data.data.arrivalStation);
    } catch (error) {
      console.error("Error fetching accommodation data", error);
    }
  };
  const [img, setImg] = useState("");

  const getImg = async (vehicleCode) => {
    const response = await VehiclesService.getVehicleById(vehicleCode);
    // console.log("response", response.data.car_company.images[0]);
    setImg(response.data.car_company.images[0].url);
    console.log("vehicleCode", response.data.car_company.images[0].url);
  };

  useEffect(() => {
    if (scheduleId) {
      loadStation(scheduleId);
    }
    // console.log("vehicleCode", vehicleCode);
    if (vehicleCode) {
      getImg(vehicleCode);
    }
  }, [scheduleId]);
  return (
    <>
      <article className={`transportation-card ${className}`} onClick={onClick}>
        <img src={img} alt="Transportation image" className="transport-image" />
        <div className="transport-details">
          <div className="transport-header">
            <div className="company-info">
              <img
                src="https://th.bing.com/th/id/OIP.mbhwZiG8FDeZiqvqdFVwSQHaHa?rs=1&pid=ImgDetMain"
                alt="Logo"
                className="logo"
              />

              <div className="company-name">
                <span className="name" style={{ fontSize: "18px" }}>
                  {nameVehicle}
                </span>
                <span className="code" style={{ fontSize: "14px" }}>
                  {seatCode}
                </span>
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d3c33d736aad4abccd8a47609cc0bf5d6d61ec0ca67ffba42062bcd29757826?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
              alt="Company logo"
              className="company-logo"
            />
          </div>
          <div className="journey-info">
            <div className="time-info">
              <TimeDisplay time={departureTime} date={departureDate} />
              <span className="duration" style={{ fontSize: "14px" }}>
                {timeCommunicate}
              </span>
              <TimeDisplay time={arrivalTime} date={arrivalDate} />
            </div>
            <div className="location-info">
              <LocationDisplay
                place="Xuất phát"
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/385a865a60db67b2221563c86645d1ba2bb924639ea59ef346b2b709c6b210d2?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
                // city="Hồ Chí Minh"
                station={departureStationData}
                extraInfo="Đón tại Bến"
              />
              <div className="route-icons">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5ef82b883104a091b64fc1dad3cdbac04bc4adbcccc77e41af236f5f85d0f8c?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
                  alt="Route start"
                  className="route-icon"
                />
              </div>
              <LocationDisplay
                place="Đích đến"
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2f2cda72d26f1c67915563e9cacfcc3716d8d5d11d87c08952c0484a418a3102?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
                // city="Vũng Tàu"
                station={arrivalStationData}
                extraInfo="Trả tại bến"
              />
            </div>
          </div>
          <div className="action-buttons">
            {/* Bắt đầu xem chi tiết vé */}
            <button
              className="action-button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#detailModal"
              // onClick={onNext()}
            >
              Chi tiết vé xe
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            {/* Kết thúc xem chi tiết vé */}

            {/* Bắt đầu thay đổi vé */}
            <button
              className="action-button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#changeModal"
            >
              Thay đổi vé xe
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            {/* Kết thúc thay đổi vé */}
          </div>
        </div>
      </article>

      {/* Detail Modal */}
      <div
        className="modal fade"
        id="detailModal"
        tabIndex="-1"
        aria-labelledby="detailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body detail-ticket-color">
              <div className="d-flex justify-content-lg-between">
                <h5
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                  id="detailLabel"
                >
                  ABC Bus
                </h5>

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

              {/* Form chi tiết vé */}
              <div className="ticket-detail">
                {/* Ảnh nhà xe */}
                <div className="ticket-detail-image mt-4">
                  <img src={nhaxe} />
                </div>

                {/* Tên nhà xe */}
                {/* <h5 className="ticket-bus-name mb-3">Tên nhà xe: ABC Bus</h5> */}

                {/* Thông tin chuyến đi */}

                <h5>Thông tin chuyến đi</h5>
                <div className="tripTicket-info mb-3">
                  <div className="tripTicket-item">
                    <p>Tuyến:</p>
                    <h6>Hà Nội - Sài Gòn</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Khởi hành:</p>
                    <h6>07:30, 22/11/2024</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Liên hệ:</p>
                    <h6>0123 456 789</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Loại xe:</p>
                    <h6>Giường nằm</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Chỗ đã đặt:</p>
                    <h6>A01, A02, A03</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Biển số xe:</p>
                    <h6>29A-12345</h6>
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="totalTicket-container d-flex justify-content-md-between">
                  <h3
                    style={{
                      fontWeight: 450,
                    }}
                  >
                    Tổng tiền:
                  </h3>
                  <div className="totalTicket-amount">
                    <h5
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "red",
                      }}
                    >
                      1,500,000 VND
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Modal */}
      <div
        className="modal fade"
        id="changeModal"
        tabIndex="-1"
        aria-labelledby="changeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body change-ticket-color">
              <div className="d-flex justify-content-lg-between">
                <h5
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                  id="changeLabel"
                >
                  ABC Bus
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
              <TicketTransportationCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TimeDisplay = ({ time, date }) => {
  return (
    <div className="time-display">
      <span className="time" style={{ fontSize: "20px" }}>
        {time}
      </span>
      <span className="date" style={{ fontSize: "14px" }}>
        {date}
      </span>
    </div>
  );
};

const LocationDisplay = ({ place, icon, city, station, extraInfo }) => {
  return (
    <div className="location-display">
      <img src={icon} alt="Location icon" className="location-icon" />
      <div className="location-text">
        <span className="place">{place}</span>
        <span className="station" style={{ fontSize: "17px" }}>
          {city} · {station}
        </span>
        {extraInfo && (
          <span className="extra-info" style={{ fontSize: "13px" }}>
            {extraInfo}
          </span>
        )}
      </div>
    </div>
  );
};

export default TransportationCard;
