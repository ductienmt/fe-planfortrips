import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./Booking.css";
import { Step, StepLabel, Stepper } from "@mui/material";
import Transportation from "./TransportationCard/Transportation";
import { useParams } from "react-router-dom";
import Accomodation from "./AccomodationCard/Accomodation";
import UserInformation from "./UserInfomation/UserInformation";
import { ScheduleService } from "../../../services/apis/ScheduleService";
import { RouteService } from "../../../services/apis/RouteService";
import { formatDateTimeUtils } from "../../../utils/DateFormat";
import {
  differenceInDays,
  addHours,
  format,
  parse,
  differenceInHours,
} from "date-fns";
import { id } from "date-fns/locale";

const Booking = () => {
  window.scrollTo(0, 0);
  document.title = "Nhập thông tin thanh toán";
  const { type } = useParams();

  const steps = useMemo(() => {
    switch (type) {
      case "plan":
        return [
          "Lên kế hoạch",
          "Xem và chỉnh sửa kế hoạch",
          "Nhập thông tin",
          "Thanh toán",
        ];
      case "hotel":
        return ["Chọn nơi ở", "Chọn phòng", "Nhập thông tin", "Thanh toán"];
      case "transportation":
        return [
          "Chọn tuyến xe",
          "Chọn ghế ngồi",
          "Nhập thông tin",
          "Thanh toán",
        ];
      default:
        return [];
    }
  }, [type]);

  const [transportationData, setTransportationData] = useState(null);
  const [accommodationData, setAccommodationData] = useState(null);
  const [stationData, setStationData] = useState({
    departureStation: "",
    arrivalStation: "",
  });
  const [cityData, setCityData] = useState({
    originalCity: "",
    destination: "",
  });

  const loadStation = async (id) => {
    try {
      setStationData(null);
      const response = await ScheduleService.getStation(id);
      setStationData(response.data.data);
    } catch (error) {
      console.error("Error fetching station data", error);
    }
  };

  const loadCities = async (id) => {
    try {
      setCityData(null);
      const response = await RouteService.getCitiesfromRouteId(id);
      setCityData(response.data);
    } catch (error) {
      console.error("Error fetching city data", error);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDate = date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return { time: formattedTime, date: formattedDate };
  };

  const calculateNights = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const oneDay = 24 * 60 * 60 * 1000;
    const nights = Math.round((checkOut - checkIn) / oneDay);

    return nights;
  };

  const adjustCheckInTime = (departureTime) => {
    const departureDate = new Date(departureTime);
    departureDate.setHours(departureDate.getHours() - 1);
    return departureDate;
  };

  const tripData = JSON.parse(sessionStorage.getItem("tripData"));

  const priceOneNight = tripData.accomodation?.rooms?.reduce(
    (total, room) => total + room.price_per_night,
    0
  );

  const priceDe = tripData?.transportation?.departure?.totalPrice ?? 0;
  const priceRe = tripData?.transportation?.return?.totalPrice ?? 0;
  const totalPriceTransportation = priceDe + priceRe;

  const priceAc = tripData?.accomodation?.total ?? 0;

  const [checkinHours, setCheckinHours] = useState(null);
  const [checkoutHours, setCheckoutHours] = useState(null);
  const [transportationType, setTransportationType] = useState("departure");

  const changeTransportationType = (typeTrans) => {
    setTransportationType(typeTrans);
    loadDataTransAgain(typeTrans);
  };

  const calculateStayDuration = (checkInDate, checkOutDate) => {
    const checkIn = parse(checkInDate, "dd/MM/yyyy", new Date());
    const checkOut = parse(checkOutDate, "dd/MM/yyyy", new Date());

    if (isNaN(checkIn) || isNaN(checkOut)) {
      console.error("Invalid date format");
      return 0;
    }

    const durationInHours = differenceInHours(checkOut, checkIn);

    return durationInHours;
  };

  const processTransportationData = useCallback((data, isDeparture) => {
    const seats = data?.seatBook
      ? data.seatBook.map((seat) => seat.seat_number).join(", ")
      : "Chưa có dữ liệu chỗ ngồi";

    const { time: departureTime, date: departureDate } = formatDateTime(
      data?.departureTime
    );
    const { time: arrivalTime, date: arrivalDate } = formatDateTime(
      data?.arrivalTime
    );

    return {
      name: data?.carName,
      seat: seats,
      numberSeat: data?.seatBook?.length || 0,
      departureTime,
      arrivalTime,
      departureDate,
      arrivalDate,
      scheduleId: data?.scheduleId,
      routeId: data?.routeId,
      isDeparture,
    };
  }, []);

  const loadDataTransAgain = useCallback(
    (typeTrans) => {
      const departureData = tripData.transportation.departure;
      const returnData = tripData.transportation.return;

      const processedData =
        typeTrans === "departure"
          ? processTransportationData(departureData, true)
          : processTransportationData(returnData, false);

      setTransportationData(processedData);
      loadStation(processedData.scheduleId);
      loadCities(processedData.routeId);
    },
    [processTransportationData]
  );

  const loadTripData = useCallback(() => {
    // const seatsDe = tripData?.transportation?.departure?.seatBook
    //   ? tripData.transportation.departure.seatBook
    //       .map((seat) => seat.seat_number)
    //       .join(", ")
    //   : "Chưa có dữ liệu chỗ ngồi";

    // const { time: checkInTime, date: checkInDate } = formatDateTime(
    //   adjustCheckInTime(tripData.transportation?.departure?.arrivalTime)
    // );

    const checkInDateTime = adjustCheckInTime(
      tripData.transportation?.departure?.arrivalTime
    );
    const { time: checkInTime, date: checkInDate } =
      formatDateTime(checkInDateTime);

    setCheckinHours(`${checkInDate}T${checkInTime}`);
    // console.log(formatDateTimeUtils(checkinHours));

    const checkOutDateTime = adjustCheckInTime(
      tripData.transportation?.return?.departureTime
    );
    // console.log("checkoutdatetime" + checkOutDateTime);

    const { time: checkOutTime, date: checkOutDate } =
      formatDateTime(checkOutDateTime);

    const totalHours = calculateStayDuration(checkInDate, checkOutDate);
    // console.log(totalHours);

    const checkoutDateTime = addHours(new Date(checkInDateTime), totalHours);
    const checkoutDate = format(checkoutDateTime, "dd/MM/yyyy'T'HH:mm");
    const checkoutDateDays = new Date(checkoutDateTime);
    // console.log(checkoutDateDays);

    const { time: checkOutTimeNew, date: checkOutDateNew } =
      formatDateTime(checkoutDateDays);

    setCheckoutHours(checkoutDate);

    console.log(`${checkInDate}T${checkInTime}`);
    console.log(checkoutDate);

    // console.log(formatDateTimeUtils(checkoutHours));

    const departureData = tripData.transportation.departure;
    const returnData = tripData.transportation.return;

    const data =
      transportationType === "departure" && departureData
        ? processTransportationData(departureData, true)
        : processTransportationData(returnData, false);

    setTransportationData(data);

    setAccommodationData({
      name: tripData.accomodation?.nameHotel,
      room: tripData.accomodation?.rooms
        .map((room) => room.nameRoom)
        .join(", "),
      checkIn: checkInDate,
      checkInTime: checkInTime,
      checkOutDate: checkOutDateNew,
      checkOutTime: checkOutTimeNew,
      type: "hotel",
    });
  }, [transportationType, processTransportationData, tripData]);

  useEffect(() => {
    if (type === "plan") {
      loadTripData();
    } else if (type === "hotel") {
      setAccommodationData({
        name: "Khách sạn B",
        room: "Phòng A2",
        checkIn: "2024-10-25",
        checkOut: "2024-10-28",
        type: "hotel",
      });
    } else if (type === "transportation") {
      setTransportationData({
        name: "Phương Trang",
        type: "VIP",
        seat: "A1, B1",
        numberSeat: 2,
        departureLocation: "Hồ Chí Minh",
        arrivalLocation: "Vũng Tàu",
        departureTime: "08:00",
        arrivalTime: "09:00",
        departureDate: "2024-10-25",
        arrivalDate: "2024-10-25",
        departureStation: "Bến xe Miền Đông",
        arrivalStation: "Bến xe Vũng Tàu",
        pickupLocation: "Bến xe Miền Đông",
        dropoffLocation: "Bến xe Vũng Tàu",
      });
    }
  }, [type]);

  return (
    <div className="booking-container">
      <div className="booking-header">
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="booking-body">
        <div className="booking-body-left">
          {type === "plan" && transportationData && accommodationData && (
            <>
              <Transportation
                {...transportationData}
                loadStation={loadStation}
                stationData={stationData}
                cityData={cityData}
                loadCities={loadCities}
                changeTransportationType={changeTransportationType}
              />
              <Accomodation {...accommodationData} />
            </>
          )}
          {type === "hotel" && accommodationData && (
            <Accomodation {...accommodationData} />
          )}
          {type === "transportation" && transportationData && (
            <Transportation {...transportationData} />
          )}
        </div>
        <div className="booking-body-right">
          <UserInformation
            totalPrice={totalPriceTransportation + priceAc}
            totalPriceTransportation={totalPriceTransportation}
            priceOneSeatDe={tripData.transportation?.departure?.totalPrice / 2}
            priceOneSeatRe={tripData.transportation?.return?.totalPrice / 2}
            totalSeat={
              tripData.transportation?.departure?.seatBook.length +
              tripData.transportation?.return?.seatBook.length
            }
            priceOneNight={priceOneNight}
            totalPriceAccommodation={priceAc}
            totalRoom={tripData.accomodation?.rooms.length}
            nights={calculateNights(
              tripData.transportation?.departure?.departureTime,
              tripData.transportation?.return?.departureTime
            )}
            checkinHours={formatDateTimeUtils(checkinHours)}
            checkoutHours={formatDateTimeUtils(checkoutHours)}
            // totalPrice={"456"}
            // totalPriceTransportation={"456"}
            // priceOneSeatDe={"456"}
            // priceOneSeatRe={"456"}
            // totalSeat={
            //   "5"
            // }
            // priceOneNight={"7"}
            // totalPriceAccommodation={"8"}
            // totalRoom={"9"}
            // nights={"7"}
            // checkinHours={"6"}
            // checkoutHours={"7"}
            type={type}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
