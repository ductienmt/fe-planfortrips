import "./TicketTransportationCard.css";

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
              <h5 className="depart-time">02:00</h5>
              <p className="depart-start">Hồ Chí Minh</p>
            </div>
            <p className="total-ticket-time">3h00</p>
            <div>
              <h5 className="arrival-time">05:00</h5>
              <p className="arrival-des">Vũng Tàu</p>
            </div>
          </div>
          <div className="ticket-transport-company">
            <div className="d-flex gap-2">
              <h5 className="ticket-company-name">Phương Trang</h5>
              <p className="company-star-rate">
                <i className="fa-solid fa-star" style={{ color: "yellow" }}></i>
                5/5
              </p>
            </div>
            <p className="ticket-type-seat">Limousine</p>
          </div>
        </div>
      </div>
      <div className="ticket-transport-content-2">
        <div className="ticket-transport-price-seat mb-5">
          <h5 className="ticket-price-transport">240.000 VND</h5>
          <p className="ticket-empty-seat">Còn 10 chỗ</p>
        </div>
        <button className="book-ticket-transport">Đặt vé ngay</button>
      </div>
    </div>
  );
};

export default TicketTransportationCard;
