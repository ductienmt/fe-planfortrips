import "./Accomodation.css";
import { format, getDay } from "date-fns";

const Accomodation = ({ name, room, checkIn, checkOut, type }) => {
  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    const dayOfWeek = getDay(parsedDate);

    const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    return `${daysOfWeek[dayOfWeek]}, ${format(parsedDate, "dd-MM-yyyy")}`;
  };
  return (
    <>
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
              <p
                className="room"
                style={{ fontWeight: "600", fontSize: "20px" }}
              >
                Phòng số: {room}
              </p>
            )}
          </div>
          <div className="accomodation-body">
            <div className="checkin">
              <p className="text">Check-in</p>
              <p className="time">{formatDate(checkIn)} - 14:00 - 00:00</p>
            </div>
            <div
              className="checkout"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <p className="text">Check-out</p>
              <p className="time">{formatDate(checkOut)} - trước 12:00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accomodation;
