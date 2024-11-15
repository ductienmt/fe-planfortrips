import { useMemo } from "react";
import "./Accomodation.css";
import { parse, format as formatDateFns, isValid, getDay } from "date-fns";

const Accomodation = ({
  name,
  room,
  checkIn,
  checkOutDate,
  checkInTime,
  checkOutTime,
  type,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Không xác định";
    }

    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());

    if (!isValid(parsedDate)) {
      return "Ngày không hợp lệ";
    }

    const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const dayOfWeek = getDay(parsedDate);

    return `${daysOfWeek[dayOfWeek]}, ${formatDateFns(parsedDate, "dd-MM-yyyy")}`;
  };

  const formattedCheckIn = useMemo(() => formatDate(checkIn), [checkIn]);
  const formattedCheckOut = useMemo(
    () => formatDate(checkOutDate),
    [checkOutDate]
  );

  return (
    <div className="accomodation-container">
      <div className="infomation-card">
        <h4
          className="text-white"
          style={{ fontSize: "18px", margin: "auto 0" }}
        >
          Thông tin nơi ở
        </h4>
      </div>
      <div style={{ padding: "10px 20px" }}>
        <div className="accomodation-header">
          <h2 style={{ fontWeight: "700" }}>{name}</h2>
          {type !== "homestay" && (
            <p className="room" style={{ fontWeight: "600", fontSize: "20px" }}>
              Phòng số: {room}
            </p>
          )}
        </div>
        <div className="accomodation-body">
          <div className="checkin">
            <p className="text">Check-in</p>
            <p className="time">
              {formattedCheckIn} - {checkInTime}
            </p>
          </div>
          <div
            className="checkout"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <p className="text">Check-out</p>
            <p className="time">
              {formattedCheckOut} - {checkOutTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accomodation;
