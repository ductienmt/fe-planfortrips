import React from "react";
import "./RoomStatusCard-t.css";

const RoomStatusCardt = ({ color, icon, title, status, count }) => {
  return (
    <>
      <article className={`room-status-card room-status-card--${color}`}>
        <center>
          <div className="room-status-card__header">
            <div
              className={`room-status-card__icon room-status-card__icon--${color}`}
            >
              <i className={icon}></i>
            </div>
            <h3 className="room-status-card__title">{title}</h3>
          </div>
          <p className="room-status-card__status">{status}</p>
          <p className="room-status-card__count">{count}</p>
        </center>
      </article>
    </>
  );
};

export default RoomStatusCardt;
