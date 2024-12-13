import { useCallback, useEffect, useState } from "react";
import { ScheduleService } from "../../../services/apis/ScheduleService";
import "./TransportationCard.css";
import "feather-icons/dist/feather";
import { debounce } from "lodash";
import { VehiclesService } from "../../../services/apis/Vehicles";
import nhaxe from "../../../assets/caurong.webp";
import TicketTransportationCard from "../../Components/ticketTransportation/TicketTransportationCard";
import { convertToVND } from "../../../utils/FormatMoney";
import { DateFormatter } from "../../../utils/DateFormat";
import { RouteService } from "../../../services/apis/RouteService";
import ChooseTicket from "../../Components/ChooseTicket/ChooseTicket";
import Loader from "../../Components/Loading";
import { enqueueSnackbar } from "notistack";

const TransportationCard = ({
  className,
  onClick,
  vehicleCode,
  nameVehicle,
  departureDate,
  arrivalDate,
  departureTime,
  arrivalTime,
  timeCommunicate,
  seatCode,
  scheduleId,
  total,
  destination,
  originalLocation,
  re,
  numPeople,
  loadAgain,
}) => {
  // console.log("return", re);
  const [loading, setLoading] = useState(false);
  const [reData, setReData] = useState({
    departureStation: "",
    arrivalStation: "",
    driverPhoneNumber: "",
    type_vehicle: "",
    plateNumber: "",
    img: "",
  });

  const [departureStationData, setDepartureStationData] = useState("");
  const [arrivalStationData, setArrivalStationData] = useState("");
  const [vehicleData, setvehicleData] = useState({});
  const loadStation = async (id) => {
    try {
      const response = await ScheduleService.getStation(id);
      // console.log("station", response.data);

      setDepartureStationData(response.data.data.departureStation);
      setArrivalStationData(response.data.data.arrivalStation);
    } catch (error) {
      console.error("Error fetching accommodation data", error);
    }
  };
  const [img, setImg] = useState("");

  const getImg = async (vehicleCode) => {
    const response = await VehiclesService.getVehicleById(vehicleCode);
    // console.log(response.data);
    setvehicleData(response.data);
    // console.log(vehicleData);

    // console.log("response", response.data.car_company.images[0]);
    setImg(response.data.car_company.images[0].url);
    // console.log("vehicleCode", response.data.car_company.images[0].url);
  };

  const getDataReturn = useCallback(
    debounce(async (vehicleCode, routeId) => {
      try {
        const response = await VehiclesService.getVehicleById(vehicleCode);
        const res = await ScheduleService.getStation(routeId);
        setReData({
          departureStation: res.data.data.departureStation,
          arrivalStation: res.data.data.arrivalStation,
          driverPhoneNumber: response.data.driverPhone,
          type_vehicle: response.data.type_vehicle,
          plateNumber: response.data.plateNumber,
          img: response.data.car_company.images[0].url,
        });
      } catch (error) {
        console.error("Error fetching vehicle or route data", error);
      }
    }, 300),
    []
  );

  const [dataChange, setDataChange] = useState([]);

  const loadScheduleChange = useCallback(
    debounce(async (price, originalLocation, destination, departureDate) => {
      try {
        setLoading(true);
        const response = await ScheduleService.getSamePrice(
          price,
          destination,
          originalLocation,
          departureDate
        );
        setDataChange(response.data.data);
      } catch (error) {
        console.error("Error fetching schedule data", error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const [seatsChange, setSeatsChange] = useState([]);
  const [scheduleIdChange, setScheduleIdChange] = useState("");

  const loadSeatsChange = useCallback(
    debounce(async (scheduleId) => {
      try {
        setScheduleIdChange(scheduleId);
        const response = await ScheduleService.getSeatsByScheduleId(scheduleId);
        // console.log(response.data);
        // console.log(response.data.data.first_floor);
        console.log(response.data.data.seats);

        setSeatsChange(response.data.data.seats);
        // console.log(seatsChangeFirstFloor);
      } catch (error) {
        console.error("Error fetching vehicle or route data", error);
      }
    }, 300),
    []
  );

  const changeSeatsPlanData = async (
    seatBooks,
    scheduleIdOld,
    scheduleIdNew
  ) => {
    let tripData = JSON.parse(sessionStorage.getItem("tripData"));
    // console.log(tripData);
    const budget = tripData.userData?.budget;

    const scheduleResponse = await ScheduleService.getScheduleID(scheduleIdNew);
    console.log(scheduleResponse.data);

    const dataToSetNew = {
      scheduleId: scheduleIdNew,
      departureTime: scheduleResponse.data.departureTime,
      arrivalTime: scheduleResponse.data.arrivalTime,
      routeId: scheduleResponse.data.routeId,
      carName: scheduleResponse.data.carCompanyName,
      totalPrice:
        seatBooks.length * scheduleResponse.data.priceForOneTicket * 1000,
      vehicleCode: scheduleResponse.data.code,
      seatBook: seatBooks,
    };

    let oldTotalPrice = 0;

    if (tripData.transportation.departure.scheduleId === scheduleIdOld) {
      oldTotalPrice = tripData.transportation.departure.totalPrice;
      tripData.transportation.departure = {
        ...tripData.transportation.departure,
        ...dataToSetNew,
      };
    } else if (tripData.transportation.return.scheduleId === scheduleIdOld) {
      oldTotalPrice = tripData.transportation.return.totalPrice;
      tripData.transportation.return = {
        ...tripData.transportation.return,
        ...dataToSetNew,
      };
    } else {
      enqueueSnackbar("Có lỗi trong quá trình cập nhật", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }

    const newEstimatedCost =
      tripData.estimatedCost - oldTotalPrice + dataToSetNew.totalPrice;
    if (newEstimatedCost <= budget) {
      sessionStorage.setItem("tripData", JSON.stringify(tripData));

      enqueueSnackbar("Cập nhật vé xe thành công", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          document.getElementById("closeChooseTicket").click();
          loadAgain();
        },
      });
    } else {
      enqueueSnackbar(
        "Bạn không đủ chí phí để đặt, hãy chọn vé/chuyến khác nè !",
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    }
  };

  useEffect(() => {
    if (scheduleId) {
      loadStation(scheduleId);
    }
    // console.log("vehicleCode", vehicleCode);
    if (vehicleCode) {
      getImg(vehicleCode);
    }
    if (re) {
      getDataReturn(re.vehicleCode, re.scheduleId);
    }
  }, [scheduleId]);
  // console.log(TransportationCard);

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
              <TimeDisplay time={departureTime} />
              <span className="duration" style={{ fontSize: "14px" }}>
                {timeCommunicate}
              </span>
              <TimeDisplay time={arrivalTime} />
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
              onClick={() => {
                loadScheduleChange(
                  total / 1000 / 2,
                  destination,
                  originalLocation,
                  departureDate
                );
              }}
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
                  {nameVehicle}
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
                  <img src={img} />
                </div>

                <h5>Thông tin chuyến đi</h5>
                <div className="tripTicket-info mb-3">
                  <div className="tripTicket-item">
                    <p>Tuyến:</p>
                    <h6>
                      {originalLocation} - {destination}
                    </h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Xuất phát:</p>
                    <h6>{departureStationData}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Điểm đến:</p>
                    <h6>{arrivalStationData}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Khởi hành:</p>
                    <h6>
                      {departureTime} - {departureDate}
                    </h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Liên hệ:</p>
                    <h6>{vehicleData.driverPhone}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Loại xe:</p>
                    <h6>{vehicleData.type_vehicle}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Chỗ đã đặt:</p>
                    <h6>{seatCode}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Biển số xe:</p>
                    <h6>{vehicleData.plateNumber}</h6>
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
                      {convertToVND(total)}
                    </h5>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#detailModalReturn"
                  >
                    Xem chuyến về
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="detailModalReturn"
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
                  {re.carName}
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
                  <img src={reData.img} />
                </div>

                <h5>Thông tin chuyến về</h5>
                <div className="tripTicket-info mb-3">
                  <div className="tripTicket-item">
                    <p>Tuyến:</p>
                    <h6>
                      {destination} - {originalLocation}
                    </h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Xuất phát:</p>
                    <h6>{reData.departureStation}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Điểm đến:</p>
                    <h6>{reData.arrivalStation}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Khởi hành:</p>
                    <h6>
                      {re.departureTime?.split("T")[1].slice(0, 5)} -{" "}
                      {re.departureTime?.split("T")[0]}{" "}
                    </h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Liên hệ:</p>
                    <h6>{reData.driverPhoneNumber}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Loại xe:</p>
                    <h6>{reData.type_vehicle}</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Chỗ đã đặt:</p>
                    <h6>
                      {re.seatBook.map((seat) => seat.seat_number).join(", ")}
                    </h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Biển số xe:</p>
                    <h6>{reData.plateNumber}</h6>
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
                      {convertToVND(re.totalPrice)}
                    </h5>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#detailModal"
                  >
                    Quay lại
                  </button>
                  <button className="btn btn-warning" data-bs-dismiss="modal">
                    Xác nhận
                  </button>
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
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            width: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          role="document"
        >
          <div
            className="modal-content"
            style={{
              width: "800px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="modal-body change-ticket-color2"
              style={{
                width: "800px",
              }}
            >
              <div className="d-flex justify-content-lg-between mb-3">
                <h5
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    color: "darkblue",
                  }}
                  id="changeLabel"
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
              {loading ? (
                <Loader rong={"30vh"} />
              ) : (
                <>
                  {dataChange?.map((data) => (
                    <TicketTransportationCard
                      key={data.scheduleId}
                      start={data.departureLocation}
                      destination={data.arrivalLocation}
                      departTime={data.departureTime.split(" ")[1]}
                      arrivalTime={data.arrivalTime.split(" ")[1]}
                      // totalTime={calu}
                      companyName={data.vehicleName}
                      typeSeat={data.vehicleType}
                      price={data.priceForOneSeat}
                      leftSeat={data.totalSeat}
                      rating={data.rating}
                      modalTarget={"#chooseTicket"}
                      modalToogle="modal"
                      onClick={() => {
                        loadSeatsChange(data.scheduleId);
                      }}
                    />
                  ))}
                </>
              )}

              {/* <TicketTransportationCard
                start="Hồ Chí Minh"
                destination="Vũng Tàu"
                departTime="12h00"
                arrivalTime="15h00"
                totalTime="03h00"
                companyName="Phương Trang"
                typeSeat="Standard"
                price="180.000 VND"
                leftSeat="Còn lại 10"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <ChooseTicket
        numPeople={numPeople}
        seatsProp={seatsChange}
        preModalTarget={"#changeModal"}
        preModalToogle={"modal"}
        scheduleIdOld={scheduleId}
        scheduleIdNew={scheduleIdChange}
        nextClick={changeSeatsPlanData}
      />
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
