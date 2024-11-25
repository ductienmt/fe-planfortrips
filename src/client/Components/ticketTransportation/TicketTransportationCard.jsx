import "./TicketTransportationCard.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import React from "react";

const TicketTransportationCard = ({
  departTime,
  arrivalTime,
  totalTime,
  start,
  destination,
  companyName,
  typeSeat,
  price,
  leftSeat,
}) => {
  return (
    <div className="ticket-transport-card ">
      <div className="ticket-transport-content-1">
        <div className="ticket-transport-items">
          <div className="ticket-transport-time-destination ">
            <div>
              <h5 className="depart-time mb-0 d-flex justify-content-center">
                {departTime}
              </h5>
              <p className="depart-start">{start}</p>
            </div>
            <div className="arrow-control justify-content-center">
              <p className="total-ticket-time mb-0 d-flex justify-content-center">
                {totalTime}
              </p>
              <div className="arrow-item d-flex justify-content-center">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
            <div>
              <h5 className="arrival-time mb-0">{arrivalTime}</h5>
              <p className="arrival-des">{destination}</p>
            </div>
          </div>
          <div className="ticket-transport-company">
            <div className="d-flex gap-2">
              <div className="d-block">
                <h5 className="ticket-company-name mb-0">{companyName}</h5>
                <p className="ticket-type-seat mb-0">{typeSeat}</p>
              </div>
              <p className="company-star-rate">
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                5/5
              </p>
            </div>
            <button className="ticket-Voucher-items mt-3">
              Voucher+
            </button>
          </div>
        </div>
      </div>
      <div className="ticket-transport-content-2">
        <div className="ticket-transport-price-seat">
          <h5 className="ticket-price-transport">{price}</h5>
          <p className="ticket-empty-seat">{leftSeat}</p>
        </div>
        <button className="book-ticket-transport">Đặt vé ngay</button>
      </div>
    </div>
  );
};

export default TicketTransportationCard;
