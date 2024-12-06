import "./TicketTransportationCard.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import React from "react";
import { convertToVNDDB } from "../../../utils/FormatMoney";
import ChooseTicket from "../ChooseTicket/ChooseTicket";

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
  rating,
  onClick,
  modalTarget,
  modalToogle,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={fullStars + i + 1} className="star empty">
          ☆
        </span>
      );
    }

    return stars;
  };
  return (
    <div className="ticket-transport-card mb-2">
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
                <div className="rating-badge mb-0">
                  {renderStars(rating)}
                  <span className="company-rating" style={{ fontSize: "15px" }}>
                    {rating}
                  </span>
                </div>
              </p>
            </div>
            <button className="ticket-Voucher-items mt-3">Voucher+</button>
          </div>
        </div>
      </div>
      <div className="ticket-transport-content-2">
        <div className="ticket-transport-price-seat">
          <h5 className="ticket-price-transport">{convertToVNDDB(price)}</h5>
          <p className="ticket-empty-seat" style={{ fontSize: "15px" }}>
            Còn {leftSeat} chổ trống
          </p>
        </div>
        <button
          className="book-ticket-transport"
          {...(onClick && { onClick })}
          {...(modalTarget && { "data-bs-target": modalTarget })}
          {...(modalToogle && { "data-bs-toggle": modalToogle })}
        >
          Đặt vé ngay
        </button>
      </div>
    </div>
  );
};

export default TicketTransportationCard;
