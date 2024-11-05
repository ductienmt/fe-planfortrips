import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Card,
} from "@mui/material";
import "./OrderCarDetail.css";
export default function OrderCarDetail({ open, setOpen, selectedTicket }) {
  const handleClose = () => {
    setOpen(false);
  };
  console.log(selectedTicket);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thông tin vé xe</DialogTitle>
      <DialogContent>
        <div className="timeline-containerTicket row">
          <h1>
            Thông tin chi tiết vé{" "}
            {selectedTicket && selectedTicket.ticket_id
              ? selectedTicket.ticket_id
              : ""}
          </h1>
          <div className="col-6">
            <p></p>
          </div>
          <div className="col-6">
            <div className="timeline-itemTicket" data-align="left">
              <div className="bulletTicket active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M12 3l0 6" />
                  <path d="M12 15l0 6" />
                </svg>
              </div>
              <div className="timeline-contentTicket">
                <span className="titleTicket">
                  {selectedTicket &&
                  selectedTicket.schedule.route.destinationStation.name
                    ? selectedTicket.schedule.route.destinationStation.name
                    : ""}
                </span>
                <p className="userTicket">
                  {selectedTicket &&
                  selectedTicket.schedule.route.destinationStation.city
                    ? selectedTicket.schedule.route.destinationStation.city
                    : ""}
                </p>
                <p className="descriptionTicket">
                  {selectedTicket && selectedTicket.seats ? (
                    selectedTicket.seats.map((seat) => (
                      <span key={seat.seatNumber} className="seat-number">
                        Số ghế: {seat.seatNumber}
                      </span>
                    ))
                  ) : (
                    <span>No seats selected.</span>
                  )}
                </p>

                <div className="timestampTicket">
                  <time>
                    Từ{" "}
                    {selectedTicket && selectedTicket.schedule.arrivalTime
                      ? selectedTicket.schedule.arrivalTime
                      : ""}
                  </time>
                </div>
              </div>
            </div>
            <div className="timeline-itemTicket">
              <div className="bulletTicket">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M7 8l0 8" />
                  <path d="M9 18h6a2 2 0 0 0 2 -2v-5" />
                  <path d="M14 14l3 -3l3 3" />
                </svg>
              </div>
              <div className="timeline-contentTicket">
                <span className="titleTicket">
                  {selectedTicket &&
                  selectedTicket.schedule.route.originStation.name
                    ? selectedTicket.schedule.route.originStation.name
                    : ""}
                </span>
                <p className="userTicket">
                  {selectedTicket &&
                  selectedTicket.schedule.route.originStation.city
                    ? selectedTicket.schedule.route.originStation.city
                    : ""}
                </p>
                <p className="descriptionTicket">handcrafted with &lt;3</p>
                <div className="timestampTicket">
                  <time>
                    Từ{" "}
                    {selectedTicket && selectedTicket.schedule.departureTime
                      ? selectedTicket.schedule.departureTime
                      : ""}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
}