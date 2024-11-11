import React, { useEffect, useState } from "react";
import "./Booking.css";
import { Step, StepLabel, Stepper } from "@mui/material";
import Transportation from "./TransportationCard/Transportation";
import { useParams } from "react-router-dom";
import Accomodation from "./AccomodationCard/Accomodation";
import UserInformation from "./UserInfomation/UserInformation";

const Booking = () => {
  window.scrollTo(0, 0);
  const { type } = useParams();
  const stepsPlan = [
    "Lên kế hoạch",
    "Xem và chỉnh sửa kế hoạch",
    "Nhập thông tin",
    "Thanh toán",
  ];
  const stepsHotel = [
    "Chọn nơi ở",
    "Chọn phòng",
    "Nhập thông tin",
    "Thanh toán",
  ];
  const stepsTransportation = [
    "Chọn tuyến xe",
    "Chọn ghế ngồi",
    "Nhập thông tin",
    "Thanh toán",
  ];

  let steps = [];
  if (type === "plan") {
    steps = stepsPlan;
  } else if (type === "hotel") {
    steps = stepsHotel;
  } else if (type === "transportation") {
    steps = stepsTransportation;
  }

  const [transportationData, setTransportationData] = useState(null);
  const [accommodationData, setAccommodationData] = useState(null);

  useEffect(() => {
    if (type === "plan") {
      setTransportationData({
        name: "Phương Trang",
        type: "VIP",
        seat: "A1",
        numberSeat: 1,
        departureLocation: "Hà Nội",
        arrivalLocation: "Hải Phòng",
        departureTime: "10:00",
        arrivalTime: "12:00",
        departureDate: "2024-10-22",
        arrivalDate: "2024-10-22",
        departureStation: "Bến xe Hà Nội",
        arrivalStation: "Bến xe Hải Phòng",
        pickupLocation: "Bến xe Hà Nội",
        dropoffLocation: "Bến xe Hải Phòng",
      });

      setAccommodationData({
        name: "The Grand Haiphong",
        room: "101",
        checkIn: "2024-10-22",
        checkOut: "2024-12-22",
        type: "hotel",
      });
    } else if (type === "hotel") {
      setAccommodationData({
        name: "The Grand Haiphong",
        room: "101",
        checkIn: "2024-10-22",
        checkOut: "2024-12-22",
        type: "hotel",
      });
    } else if (type === "transportation") {
      setTransportationData({
        name: "Phương Trang",
        type: "VIP",
        seat: "A1",
        numberSeat: 1,
        departureLocation: "Hà Nội",
        arrivalLocation: "Hải Phòng",
        departureTime: "10:00",
        arrivalTime: "12:00",
        departureDate: "2024-10-22",
        arrivalDate: "2024-10-22",
        departureStation: "Bến xe Hà Nội",
        arrivalStation: "Bến xe Hải Phòng",
        pickupLocation: "Bến xe Hà Nội",
        dropoffLocation: "Bến xe Hải Phòng",
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
              <Transportation {...transportationData} />
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
          <UserInformation totalPrice={100000} type={type} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
